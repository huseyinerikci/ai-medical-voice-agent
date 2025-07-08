"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, Loader, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
};
type messagesType = {
  role: string;
  text: string;
};
function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>(null);
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [liveTranscript, setLiveTranscript] = useState<string>("");
  const [messages, setMessages] = useState<messagesType[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  //yeni eklendi
  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    const result = await axios.get(`/api/session-chat?sessionId=${sessionId}`);
    setSessionDetail(result.data);
  };

  const StartCall = async () => {
    if (!sessionDetail) return;
    setLoading(true);
    const vapi = new Vapi(process.env.NEXT_PUBLIC_API_KEY!);
    setVapiInstance(vapi);

    const VapiAgentCongfig = {
      name: "AI Medical Doctor Voice Agent",
      firstMessage:
        "Hi there! I'm your AI Medical Assistant. I'm here to help you with any health questions you might have today. How are you feeling?",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "vapi",
        voiceId: sessionDetail?.selectedDoctor?.voiceId || "Harry",
      },
      model: {
        provider: "openai",
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              sessionDetail?.selectedDoctor?.agentPrompt ||
              "You are a helpful and friendly medical assistant. Answer user questions clearly and empathetically.",
          },
        ],
      },
    };
    console.log(VapiAgentCongfig);
    try {
      //@ts-ignore
      await vapi.start(VapiAgentCongfig);
      vapi.on("call-start", () => {
        setCallStarted(true);
        setLoading(false);
      });
      vapi.on("call-end", () => {
        setCallStarted(false);
        setLoading(false);
      });
      vapi.on("message", (message) => {
        if (message.type === "transcript") {
          const { role, transcriptType, transcript } = message;
          if (transcriptType == "partial") {
            setLiveTranscript(transcript);
            setCurrentRole(role);
          } else if (transcriptType == "final") {
            setMessages((prev: any) => [
              ...prev,
              { role: role, text: transcript },
            ]);
            setLiveTranscript("");
            setCurrentRole(null);
          }
        }
      });
      vapi.on("speech-start", () => {
        setCurrentRole("assistant");
      });
      vapi.on("speech-end", () => {
        setCurrentRole("user");
      });
    } catch (e: any) {
      if (e?.response?.data?.error) {
        toast.error(
          "AI servislerinde bir hata oluştu: " + e.response.data.error
        );
      } else {
        toast.error(
          "AI servislerinde bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        );
      }
      setLoading(false);
    }
  };
  const endCall = async () => {
    if (!vapiInstance) return;

    await GenerateReport();

    vapiInstance.stop();

    setCallStarted(false);
    setVapiInstance(null);
    setLoading(false);
    toast.success("Your report is generated!");
    router.replace("/dashboard");
  };

  const GenerateReport = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/medical-report", {
        messages: messages,
        sessionDetail: sessionDetail,
        sessionId: sessionId,
      });
      setLoading(false);
      await GetSessionDetails();
      return result.data;
    } catch (err: any) {
      if (err?.response?.data?.error) {
        toast.error(
          "AI servislerinde bir hata oluştu: " + err.response.data.error
        );
      } else {
        toast.error(
          "AI servislerinde bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        );
      }
      setLoading(false);
    }
  };
  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex items-center justify-between">
        <h2 className="p-1 px-2 border rounded-md flex items-center gap-2">
          <Circle
            className={`size-4 rounded-full ${
              callStarted ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected" : "Not Connected"}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>
      {sessionDetail && (
        <div className="flex items-center flex-col mt-10">
          <Image
            src={sessionDetail?.selectedDoctor?.image}
            alt={sessionDetail?.selectedDoctor?.name}
            width={120}
            height={120}
            className="size-[100px] object-cover rounded-full"
          />
          <h2 className="mt-2 text-lg">
            {sessionDetail?.selectedDoctor?.specialist}
          </h2>
          <h3 className="text-md">Dr. {sessionDetail?.selectedDoctor?.name}</h3>
          <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

          <div className="mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52">
            {messages?.slice(-4).map((msg: messagesType, i) => (
              <h2 className="text-gray-400 p-2" key={i}>
                {msg.role} : {msg.text}
              </h2>
            ))}

            {liveTranscript && liveTranscript?.length > 0 && (
              <h2 className="text-lg">
                {currentRole} : {liveTranscript}
              </h2>
            )}
          </div>

          {!callStarted ? (
            <Button className="mt-20" onClick={StartCall} disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : <PhoneCall />}
              Start Call
            </Button>
          ) : (
            <Button
              variant={"destructive"}
              onClick={endCall}
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : <PhoneOff />}{" "}
              Disconnect
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;

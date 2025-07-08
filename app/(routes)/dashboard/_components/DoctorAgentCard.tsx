"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { IconArrowRight } from "@tabler/icons-react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export type doctorAgent = {
  id: number;
  name: string;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId?: string;
  subscriptionRequired: boolean;
};
type props = {
  doctor: doctorAgent;
};

function DoctorAgentCard({ doctor }: props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { has } = useAuth();
  //@ts-ignore
  const paidUser = has && has({ plan: "pro" });

  const onStartConsultation = async () => {
    setLoading(true);
    try {
      await axios.post("/api/users");
      const result = await axios.post("/api/session-chat", {
        notes: "New Query",
        selectedDoctor: doctor,
      });
      if (result.data?.sessionId) {
        router.push("/dashboard/medical-agent/" + result.data.sessionId);
      }
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {doctor.subscriptionRequired && (
        <Badge className="absolute m-2 right-0">Premium</Badge>
      )}
      <Image
        src={doctor.image}
        alt={doctor.specialist}
        width={200}
        height={300}
        className="w-full h-[250px] object-cover rounded-xl"
      />
      <h2 className="font-bold mt-1">{doctor.specialist}</h2>
      <h3 className="font-semibold">{doctor.name}</h3>
      <p className="line-clamp-2 text-sm text-gray-500">{doctor.description}</p>
      <Button
        onClick={onStartConsultation}
        className="w-full mt-2 cursor-pointer"
        disabled={!paidUser && doctor.subscriptionRequired}
      >
        Start Consultation
        {loading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <IconArrowRight />
        )}
      </Button>
    </div>
  );
}

export default DoctorAgentCard;

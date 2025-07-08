"use client";

import { motion } from "motion/react";
import { FeatureBentoGrid } from "./_components/FeatureBentoGrid";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="flex w-full items-center justify-between border-b border-blue-100 dark:border-blue-900  py-4 bg-white/80 dark:bg-slate-900/80 shadow-sm sticky top-0 z-50 backdrop-blur px-10 md:px-20 lg:px-40">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={150}
          className="rounded-full"
        />
      </div>
      {!user ? (
        <Link href="/sign-in">
          <Button className="w-24 bg-blue-600 text-white hover:bg-blue-700">
            Login
          </Button>
        </Link>
      ) : (
        <div className="flex gap-5 items-center">
          <UserButton />
          <Button
            asChild
            variant="outline"
            className="border-blue-500 text-blue-600 dark:text-blue-300 dark:border-blue-400"
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default function Home() {
  const { user } = useUser();
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155]">
      <Navbar />
      <section className="w-full flex flex-col items-center justify-center py-16 px-4">
        <div className="max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#1e90ff] via-[#7f56d9] to-[#00e6e6] bg-clip-text text-transparent mb-6"
          >
            Revolutionize Healthcare with{" "}
            <span className="bg-gradient-to-r from-[#1e90ff] via-[#7f56d9] to-[#00e6e6] bg-clip-text text-transparent">
              AI Medical Voice Agents
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-8"
          >
            Instantly connect patients and doctors with natural, secure, and
            intelligent voice conversations. 24/7 medical triage, appointment
            automation, and personalized care—powered by AI.
          </motion.p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            {!user ? (
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                >
                  Get Started Free
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                >
                  Go to Dashboard
                </Button>
              </Link>
            )}
            <Link href="#features">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-blue-500 text-blue-600 dark:text-blue-300 dark:border-blue-400"
              >
                See Features
              </Button>
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative w-full max-w-md mt-8 rounded-2xl overflow-hidden shadow-lg border border-blue-200 dark:border-blue-900 bg-white dark:bg-slate-900"
        >
          <Image
            src="/medical-assistance.png"
            alt="AI Medical Voice Agent Demo"
            width={500}
            height={300}
            className="w-full h-auto object-contain p-4"
            priority
          />
        </motion.div>
      </section>
      <section id="features" className="w-full max-w-5xl mx-auto py-16 px-4">
        <FeatureBentoGrid />
      </section>
      <section className="w-full max-w-4xl mx-auto py-12 px-4 flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-8 bg-gradient-to-r from-[#1e90ff] via-[#7f56d9] to-[#00e6e6] bg-clip-text text-transparent">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
          <div className="flex flex-col items-center bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 shadow-sm">
            <svg
              className="w-10 h-10 text-blue-500 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm0 0c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z" />
            </svg>
            <h3 className="font-bold text-blue-700 dark:text-blue-200 text-lg mb-1">
              Sign Up
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              Create your account and choose your medical specialist.
            </p>
          </div>
          <div className="flex flex-col items-center bg-cyan-50 dark:bg-cyan-900/30 rounded-xl p-6 shadow-sm">
            <svg
              className="w-10 h-10 text-cyan-500 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 4v16m8-8H4" />
            </svg>
            <h3 className="font-bold text-cyan-700 dark:text-cyan-200 text-lg mb-1">
              Start Call
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              Begin a secure, natural voice conversation with our AI agent.
            </p>
          </div>
          <div className="flex flex-col items-center bg-green-50 dark:bg-green-900/30 rounded-xl p-6 shadow-sm">
            <svg
              className="w-10 h-10 text-green-500 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 12l2 2 4-4" />
            </svg>
            <h3 className="font-bold text-green-700 dark:text-green-200 text-lg text-nowrap mb-1">
              Get Instant Report
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              Receive a structured medical report and recommendations instantly.
            </p>
          </div>
          <div className="flex flex-col items-center bg-pink-50 dark:bg-pink-900/30 rounded-xl p-6 shadow-sm">
            <svg
              className="w-10 h-10 text-pink-500 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 8v4l3 3" />
            </svg>
            <h3 className="font-bold text-pink-700 dark:text-pink-200 text-lg mb-1">
              Access History
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
              View all your past consultations and reports anytime.
            </p>
          </div>
        </div>
      </section>
      <footer className="w-full py-6 text-center text-gray-400 text-sm border-t border-blue-100 dark:border-blue-900 mt-8">
        &copy; {new Date().getFullYear()} AI Medical Voice Agent. All rights
        reserved.
      </footer>
    </div>
  );
}

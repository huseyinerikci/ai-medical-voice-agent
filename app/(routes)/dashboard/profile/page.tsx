"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Profile() {
  const { user, isLoaded } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.fullName || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1200); // Demo için
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-start py-12 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155]">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-[#1e90ff] via-[#7f56d9] to-[#00e6e6] bg-clip-text text-transparent">
          Profile
        </h1>
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-800 shadow-md mb-3">
            {user && user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="/logo.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="text-xl font-bold text-blue-700 dark:text-blue-200">
            {name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {email}
          </div>
        </div>
        <form className="w-full space-y-6" onSubmit={handleSave}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 text-gray-800 dark:text-gray-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 text-gray-800 dark:text-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-700 text-gray-800 dark:text-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button
            type="submit"
            className="w-full text-lg mt-2 bg-gradient-to-r from-[#1e90ff] via-[#7f56d9] to-[#00e6e6] text-white shadow-md"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}

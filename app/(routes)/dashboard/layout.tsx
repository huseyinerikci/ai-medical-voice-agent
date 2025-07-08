import React from "react";
import AppHeader from "./_components/AppHeader";
import { Toaster } from "@/components/ui/sonner";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AppHeader />
      <div className="px-10 md:px-20 lg:px-40 py-10">
        {children}
        <Toaster />
      </div>
    </div>
  );
}

export default DashboardLayout;

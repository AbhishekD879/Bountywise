"use client"
import BountyWiseSidebar from "./_components/BountywiseDashboardSidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
  analytics,
  messages,
  myBounties,
  payments,
}: Readonly<{
  children: React.ReactNode;
  analytics: React.ReactNode;
  messages: React.ReactNode;
  myBounties: React.ReactNode;
  payments: React.ReactNode;
}>) {
  const [userType, setUserType] = useState<"poster" | "hunter">("poster");
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-[calc(100%_-_76px)]">
      <div className="h-full">
        <BountyWiseSidebar
          userType={userType}
          setUserType={setUserType}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div className="flex-1 bg-[#ffffff]">
        {activeTab === 'dashboard' && children}
        {activeTab === 'analytics' && analytics}
        {activeTab === 'messages' && messages}
        {activeTab === 'myBounties' && myBounties}
        {activeTab === 'payments' && payments}
      </div>
    </div>
  );
}

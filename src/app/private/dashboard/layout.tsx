"use client";
import BountyWiseSidebar from "./_components/BountywiseDashboardSidebar";
import { useState, cloneElement, isValidElement } from "react";

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

  // Ensure that `children` is treated as ReactElement with specific props
  const childrenWithProps = isValidElement(children)
    ? cloneElement(children as React.ReactElement<{ userType: string }>, {
        userType,
      })
    : children;
    
  // Ensure that `myBounties` is treated as ReactElement with specific props  
  const myBountiesWithProps = isValidElement(myBounties)
    ? cloneElement(myBounties as React.ReactElement<{ userType: string }>, {
        userType,
      })
    : myBounties;

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
      <div className="flex-1 bg-[#ffffff] p-6 ">
        {activeTab === "dashboard" && isValidElement(children) && childrenWithProps}
        {activeTab === "analytics" && analytics}
        {activeTab === "messages" && messages}
        {activeTab === "mybounties" && isValidElement(myBounties) && myBountiesWithProps}
        {activeTab === "payments" && payments}
      </div>
    </div>
  );
}

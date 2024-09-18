// components/BountyWiseSidebar.tsx (Client Component)
"use client";
import {
  User,
  MessageSquare,
  DollarSign,
  Zap,
  BarChart2,
  Home,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sidebarItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "myBounties", icon: Briefcase, path: "/myBounties" },
  { name: "Messages", icon: MessageSquare, path: "/messages" },
  { name: "Payments", icon: DollarSign, path: "/payments" },
  { name: "Analytics", icon: BarChart2, path: "/analytics" },
];

export default function BountyWiseSidebar({
  activeTab,
  userType,
  setActiveTab,
  setUserType,
}: any) {
  return (
    // hover:w-64
    <aside className="w-16 bg-[#303841] flex flex-col items-center py-8 transition-all duration-300 hover:w-64 group h-screen">
      <div className="mb-8 flex items-center justify-center">
        <Zap className="w-10 h-10 text-[#ff5722]" />
        <span className="ml-4 text-[#ffffff] font-bold text-xl hidden group-hover:inline">
          BountyWise
        </span>
      </div>
      <nav className="flex-1 w-full">
        <ul className="space-y-4">
          {sidebarItems.map((item) => (
            <li key={item.name} className="group/item">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveTab(item.name.toLowerCase())}
                      className={`flex items-center w-full py-3 px-4 transition-colors ${
                        activeTab === item.name.toLowerCase()
                          ? "bg-[#ff5722] text-[#ffffff]"
                          : "text-[#d4d4d4] hover:bg-[#46515e] hover:text-[#ffffff]"
                      }`}
                    >
                      <item.icon className="w-6 h-6" />
                      <span className="ml-4 hidden group-hover:inline whitespace-nowrap overflow-hidden">
                        {item.name}
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-[#303841] text-[#ffffff]"
                  >
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto w-full px-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-[#d4d4d4] hover:bg-[#46515e] hover:text-[#ffffff]"
                onClick={() =>
                  setUserType(userType === "poster" ? "hunter" : "poster")
                }
              >
                <User className="w-6 h-6" />
                <span className="ml-4 hidden group-hover:inline">
                  Switch View
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-[#303841] text-[#ffffff]"
            >
              Switch to {userType === "poster" ? "Hunter" : "Poster"} View
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
}

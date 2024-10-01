"use client";
import React, { useState } from "react";
import {
  Bell,
  LogOut,
  Settings,
  User,
  Video,
  Phone,
  MessageSquare,
  DollarSign,
  Clock,
  Star,
  Search,
  Plus,
  Zap,
  Award,
  TrendingUp,
  BarChart2,
  Home,
  Briefcase,
  PieChart,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function BountyWiseDashboard() {
  const [userType, setUserType] = useState<"poster" | "hunter">("poster");
  const [activeTab, setActiveTab] = useState("dashboard");

  const sidebarItems = [
    { name: "Dashboard", icon: Home },
    { name: "Bounties", icon: Briefcase },
    { name: "Messages", icon: MessageSquare },
    { name: "Payments", icon: DollarSign },
    { name: "Analytics", icon: BarChart2 },
  ];

  return (
    <div className="flex h-screen bg-[#eeeeee]">
      {/* Sidebar */}
      <aside className="w-16 bg-[#303841] flex flex-col items-center py-8 transition-all duration-300 hover:w-64 group">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navigation Bar */}
        <header className="bg-[#ffffff] text-[#303841] p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#ff5722] hover:bg-[#eeeeee]"
            >
              <Bell />
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#46515e]" />
              <Input
                type="search"
                placeholder="Search bounties or hunters..."
                className="pl-10 pr-4 py-2 w-64 bg-[#eeeeee] border-none text-[#303841] placeholder-[#46515e] focus:ring-2 focus:ring-[#ff5722]"
              />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10 border-2 border-[#ff5722]">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-[#ff5722] text-[#ffffff]">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "dashboard" && (
            <OverviewDashboard userType={userType} />
          )}
          {activeTab === "bounties" && (
            <ActiveBountiesDashboard userType={userType} />
          )}
          {activeTab === "messages" && <MessagesDashboard />}
          {activeTab === "payments" && <PaymentsDashboard />}
          {activeTab === "analytics" && <AnalyticsDashboard />}
        </main>
      </div>
    </div>
  );
}

function OverviewDashboard({ userType }: { userType: "poster" | "hunter" }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#303841]">Dashboard Overview</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#ffffff] border-none shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-[#ff5722] to-[#ff7f50] text-[#ffffff]">
            <CardTitle className="flex items-center">
              <Briefcase className="w-6 h-6 mr-2" />
              {userType === "poster" ? "Active Bounties" : "Available Bounties"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-[#303841]">
              {userType === "poster" ? "3" : "12"}
            </div>
            <p className="text-[#46515e]">
              {userType === "poster"
                ? "Posted by you"
                : "Matching your expertise"}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#ffffff] border-none shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-[#46515e] to-[#303841] text-[#ffffff]">
            <CardTitle className="flex items-center">
              <DollarSign className="w-6 h-6 mr-2" />
              {userType === "poster" ? "Total Spent" : "Earnings This Month"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-[#303841]">
              ${userType === "poster" ? "2,500" : "1,250"}
            </div>
            <p className="text-[#46515e]">
              {userType === "poster" ? "This month" : "From 8 consultations"}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#ffffff] border-none shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-[#ff5722] to-[#ff7f50] text-[#ffffff]">
            <CardTitle className="flex items-center">
              <Star className="w-6 h-6 mr-2" />
              {userType === "poster" ? "Average Rating" : "Your Rating"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-[#303841]">4.8</div>
            <div className="flex text-[#ff5722]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-[#ffffff] border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-[#303841]">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "New bounty posted",
                description: "Web Development Project",
                icon: Plus,
              },
              {
                title: "Consultation completed",
                description: "Legal Advice Session",
                icon: Video,
              },
              {
                title: "Payment received",
                description: "$150 for UI/UX Design",
                icon: DollarSign,
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-[#eeeeee] rounded-lg hover:bg-[#d4d4d4] transition-colors"
              >
                <div className="bg-[#ff5722] p-2 rounded-full">
                  <activity.icon className="w-6 h-6 text-[#ffffff]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#303841]">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-[#46515e]">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActiveBountiesDashboard({
  userType,
}: {
  userType: "poster" | "hunter";
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#303841]">
          {userType === "poster" ? "My Bounties" : "Available Bounties"}
        </h2>
        {userType === "poster" && (
          <Button className="bg-[#ff5722] hover:bg-[#ff5722]/90 text-[#ffffff]">
            <Plus className="mr-2 h-5 w-5" /> Post New Bounty
          </Button>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {["Web Development", "Legal Consultation", "Financial Analysis"].map(
          (title, index) => (
            <Card
              key={title}
              className="bg-[#ffffff] border-none shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader className="bg-gradient-to-r from-[#ff5722] to-[#ff7f50] text-[#ffffff] rounded-t-lg">
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                  <Badge
                    variant="secondary"
                    className="bg-[#ffffff] text-[#ff5722]"
                  >
                    Active
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-[#303841]">
                  ${150 + index * 50}
                </p>
                <p className="text-sm text-[#46515e]">Posted 2 hours ago</p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Badge variant="outline" className="text-[#46515e]">
                      <Video className="h-4 w-4" />
                    </Badge>
                    <Badge variant="outline" className="text-[#46515e]">
                      <Phone className="h-4 w-4" />
                    </Badge>
                    <Badge variant="outline" className="text-[#46515e]">
                      <MessageSquare className="h-4 w-4" />
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#ff5722] text-[#ff5722] hover:bg-[#ff5722] hover:text-[#ffffff]"
                  >
                    {userType === "poster" ? "Edit" : "Apply"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </div>
  );
}

function MessagesDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#303841]">Messages</h2>
      <Card className="bg-[#ffffff] border-none shadow-lg">
        <CardContent className="p-6">
          <div className="space-y-4">
            {["John Doe", "Jane Smith", "Alice Johnson"].map((name, index) => (
              <div
                key={name}
                className="flex items-center space-x-4 p-4 bg-[#eeeeee] rounded-lg hover:bg-[#d4d4d4] transition-colors"
              >
                <Avatar className="h-12 w-12 border-2 border-[#ff5722]">
                  <AvatarImage src="/placeholder.svg" alt={name} />
                  <AvatarFallback className="bg-[#ff5722] text-[#ffffff]">
                    {name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#303841]">{name}</h4>
                  <p className="text-sm text-[#46515e]">
                    Latest message preview...
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-[#ffffff] text-[#ff5722] border-[#ff5722]"
                >
                  {index === 0 ? "2 new" : ""}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PaymentsDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#303841]">Payments</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#ffffff] border-none shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-[#ff5722] to-[#ff7f50] text-[#ffffff]">
            <CardTitle className="flex items-center">
              <DollarSign className="w-6 h-6 mr-2" />
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-[#303841]">$5,280</div>
            <p className="text-[#46515e]">Lifetime earnings</p>
          </CardContent>
        </Card>
        <Card className="bg-[#ffffff] border-none shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-[#46515e] to-[#303841] text-[#ffffff]">
            <CardTitle className="flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-[#303841]">$750</div>
            <p className="text-[#46515e]">From 3 consultations</p>
          </CardContent>
        </Card>
        <Card className="bg-[#ffffff] border-none shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-[#ff5722] to-[#ff7f50] text-[#ffffff]">
            <CardTitle className="flex items-center">
              <TrendingUp className="w-6 h-6 mr-2" />
              Next Payout
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-[#303841]">$1,200</div>
            <p className="text-[#46515e]">Scheduled for June 1, 2023</p>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-[#ffffff] border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-[#303841]">
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Legal Consultation",
                amount: 200,
                date: "May 20, 2023",
              },
              {
                title: "Financial Planning Session",
                amount: 150,
                date: "May 18, 2023",
              },
              { title: "Technical Support", amount: 100, date: "May 15, 2023" },
            ].map((transaction, index) => (
              <div
                key={transaction.title}
                className="flex items-center justify-between p-4 bg-[#eeeeee] rounded-lg hover:bg-[#d4d4d4] transition-colors"
              >
                <div>
                  <h4 className="font-semibold text-[#303841]">
                    {transaction.title}
                  </h4>
                  <p className="text-sm text-[#46515e]">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#303841]">
                    ${transaction.amount}
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-[#ffffff] text-[#ff5722] border-[#ff5722]"
                  >
                    Completed
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#303841]">Analytics</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[#ffffff] border-none shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-[#ff5722] to-[#ff7f50] text-[#ffffff]">
            <CardTitle className="flex items-center">
              <Video className="w-6 h-6 mr-2" />
              Total Consultations
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-[#303841]">47</div>
            <p className="text-[#46515e]">This month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#ffffff] border-none shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-[#46515e] to-[#303841] text-[#ffffff]">
            <CardTitle className="flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              Average Session Duration
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-[#303841]">38 min</div>
            <p className="text-[#46515e]">Across all consultations</p>
          </CardContent>
        </Card>
        <Card className="bg-[#ffffff] border-none shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-[#ff5722] to-[#ff7f50] text-[#ffffff]">
            <CardTitle className="flex items-center">
              <Star className="w-6 h-6 mr-2" />
              Client Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-[#303841]">4.8/5</div>
            <div className="flex text-[#ff5722]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-[#ffffff] border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-[#303841]">
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] bg-[#eeeeee] rounded-md flex items-center justify-center">
            <BarChart2 className="w-16 h-16 text-[#46515e]" />
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-[#ffffff] border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-[#303841]">
              Top Performing Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Legal Advice", "Financial Planning", "Technical Support"].map(
                (category, index) => (
                  <div
                    key={category}
                    className="flex items-center justify-between"
                  >
                    <span className="text-[#303841]">{category}</span>
                    <div className="w-1/2 bg-[#eeeeee] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[#ff5722] to-[#ff7f50] h-2 rounded-full"
                        style={{ width: `${100 - index * 20}%` }}
                      ></div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#ffffff] border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-[#303841]">
              Client Demographics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] bg-[#eeeeee] rounded-md flex items-center justify-center">
              <PieChart className="w-16 h-16 text-[#46515e]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

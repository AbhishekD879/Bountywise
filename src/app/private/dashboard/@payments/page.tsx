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

export default function Page() {
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

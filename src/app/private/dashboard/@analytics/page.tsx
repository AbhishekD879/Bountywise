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
                )
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

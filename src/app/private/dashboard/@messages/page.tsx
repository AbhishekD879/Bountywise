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
                  <AvatarImage src="/placeholder.svg" />
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

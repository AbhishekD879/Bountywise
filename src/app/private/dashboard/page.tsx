"use client";
import React from "react";
import { Video, DollarSign, Star, Plus, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BountyWiseDashboard({
  userType,
}: {
  userType: "poster" | "hunter";
}) {
  console.log(userType);

  return (
    <div className="flex-1 overflow-auto">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-[#303841]">
          Dashboard Overview
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-[#ffffff] border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-[#ff5722] to-[#ff7f50] text-[#ffffff]">
              <CardTitle className="flex items-center">
                <Briefcase className="w-6 h-6 mr-2" />
                {userType === "poster"
                  ? "Active Bounties"
                  : "Available Bounties"}
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
    </div>
  );
}

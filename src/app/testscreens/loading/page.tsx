import { Loader2, Award, Briefcase, Users, DollarSign } from "lucide-react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#303841] bg-opacity-90 backdrop-blur-sm z-50">
      <div className="bg-[#ffffff] p-8 rounded-lg shadow-lg flex flex-col items-center max-w-sm w-full">
        <div className="relative w-24 h-24 mb-6">
          <Loader2 className="w-24 h-24 text-[#ff5722] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              className="animate-scale"
              src="/logo.svg"
              alt="BountyWise"
              width={35}
              height={35}
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[#303841] mb-4">
          Loading BountyWise
        </h2>
        <p className="text-[#46515e] text-center mb-6">
          Preparing your content...
        </p>
        <div className="flex justify-center space-x-8 mb-6">
          <div
            className="flex flex-col items-center animate-bounce"
            style={{ animationDelay: "0ms" }}
          >
            <Award className="w-8 h-8 text-[#ff5722]" />
            <span className="text-[#303841] text-xs mt-1">Quality</span>
          </div>
          <div
            className="flex flex-col items-center animate-bounce"
            style={{ animationDelay: "200ms" }}
          >
            <Briefcase className="w-8 h-8 text-[#ff5722]" />
            <span className="text-[#303841] text-xs mt-1">Opportunities</span>
          </div>
          <div
            className="flex flex-col items-center animate-bounce"
            style={{ animationDelay: "400ms" }}
          >
            <Users className="w-8 h-8 text-[#ff5722]" />
            <span className="text-[#303841] text-xs mt-1">Community</span>
          </div>
          <div
            className="flex flex-col items-center animate-bounce"
            style={{ animationDelay: "600ms" }}
          >
            <DollarSign className="w-8 h-8 text-[#ff5722]" />
            <span className="text-[#303841] text-xs mt-1">Rewards</span>
          </div>
        </div>
        <div className="w-full bg-[#eeeeee] rounded-full h-2 mb-4">
          <div
            className="bg-[#ff5722] h-2 rounded-full animate-pulse"
            style={{ width: "75%" }}
          ></div>
        </div>
        <p className="text-[#46515e] text-sm">This may take a few moments...</p>
      </div>
    </div>
  );
}

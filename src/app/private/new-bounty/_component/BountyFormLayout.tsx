// components/BountyFormLayout.tsx (Server Component)
import { ReactNode } from "react";

export default function BountyFormLayout({
  children,
  step,
}: {
  children: ReactNode;
  step: number;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff5722] to-[#ff9800] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full transition-all duration-500 ease-in-out transform">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-[#46515e]">
            Create New Bounty
          </h2>
          <div className="flex justify-center items-center mt-4">
            <div
              className={`w-16 h-2 rounded-full transition-colors duration-300 ${step === 1 ? "bg-[#ff5722]" : "bg-[#d4d4d4]"}`}
            />
            <div
              className={`w-16 h-2 rounded-full ml-2 transition-colors duration-300 ${step === 2 ? "bg-[#ff5722]" : "bg-[#d4d4d4]"}`}
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

// components/BountyStepNavigation.tsx (Client Component)
"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BountyStepNavigation({
  step,
  setStep,
  handleNext,
  handleSubmit,
}: any) {
  return (
    <div className="flex justify-between mt-8">
      {step === 2 && (
        <Button
          onClick={() => setStep(1)}
          variant="outline"
          className="border-[#ff5722] text-[#ff5722] hover:bg-[#ff57221a] transition-all duration-300"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      )}
      {step === 1 ? (
        <Button
          onClick={handleNext}
          className="bg-[#ff5722] text-white hover:bg-[#ff784e] ml-auto transition-all duration-300"
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button
          onClick={handleSubmit}
          className="bg-[#ff5722] text-white hover:bg-[#ff784e] ml-auto transition-all duration-300"
        >
          Post Bounty
        </Button>
      )}
    </div>
  );
}

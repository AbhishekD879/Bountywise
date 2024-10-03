"use client";
import { useRef, useState } from "react";
import BountyAttachments from "./_component/BountyAttachments";
import BountyCommunicationMethod from "./_component/BountyCommunicationMethod";
import BountyDeadline from "./_component/BountyDeadline";
import BountyDescription from "./_component/BountyDescription";
import BountyTags from "./_component/BountyTags";
import BountyTitle from "./_component/BountyTitle";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFormState } from "react-dom";
import { createBounty } from "@/app/actions";
import CommingSoon from "@/components/ui/CommingSoon";
export default function NewBountyPage() {
  const [state, createBountyAction] = useFormState(createBounty, null);
  const [titleForAi, setTitleForAi] = useState("");
  const [step, setStep] = useState(1);
  const titleRef = useRef("");
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <form
      action={createBountyAction}
      encType="multipart/form-data"
      className="w-full h-full"
    >
      <div className="relative">
        {/* Step 1 */}
        <div
          className="w-full h-full top-0 flex flex-col justify-between"
          style={{
            position: "absolute",
            visibility: step === 1 ? "visible" : "hidden",
            opacity: step === 1 ? 1 : 0,
            pointerEvents: step === 1 ? "auto" : "none",
          }}
        >
          <BountyTitle titleSetter={setTitleForAi} error={state?.title} />
          <BountyDescription
            error={state?.description}
            bountyTitle={titleForAi}
          />
          <BountyTags error={state?.tags} />
          <Button
            type="button"
            onClick={handleNextStep}
            className="bg-[#ff5722] text-white hover:bg-[#ff784e] ml-auto transition-all duration-300"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Step 2 */}
        <div
          className="w-full h-full top-0 space-y-10 flex flex-col justify-between"
          style={{
            position: "absolute",
            visibility: step === 2 ? "visible" : "hidden",
            opacity: step === 2 ? 1 : 0,
            pointerEvents: step === 2 ? "auto" : "none",
          }}
        >
          <BountyCommunicationMethod error={state?.communicationMethod} />
          <BountyDeadline />
          <CommingSoon>
            <BountyAttachments />
          </CommingSoon>
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              onClick={() => setStep(1)}
              variant="outline"
              className="border-[#ff5722] text-[#ff5722] hover:bg-[#ff57221a] transition-all duration-300"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              type="submit"
              className="bg-[#ff5722] text-white hover:bg-[#ff784e] ml-auto transition-all duration-300"
            >
              Post Bounty
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

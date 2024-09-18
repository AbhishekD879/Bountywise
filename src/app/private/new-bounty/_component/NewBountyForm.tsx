// components/NewBountyForm.tsx (Client Component)
"use client";
import { useState, useRef } from "react";
import BountyFormLayout from "./BountyFormLayout";
import BountyTitle from "./BountyTitle";
import BountyDescription from "./BountyDescription";
import BountyTags from "./BountyTags";
import BountyCommunicationMethod from "./BountyCommunicationMethod";
import BountyStepNavigation from "./BountyStepNavigation";

export default function NewBountyForm() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [communicationMethod, setCommunicationMethod] = useState("chat");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (description.length < 50)
      newErrors.description = "Description must be at least 50 characters";
    if (tags.length === 0) newErrors.tags = "Please select at least one tag";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!communicationMethod)
      newErrors.communicationMethod = "Please select a communication method";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      console.log("Form submitted:", {
        title,
        description,
        tags,
        communicationMethod,
      });
    }
  };

  return (
    <BountyFormLayout step={step}>
      <div
        className={`transition-opacity duration-300 ${step === 1 ? "opacity-100" : "opacity-0 hidden"}`}
      >
        <BountyTitle title={title} setTitle={setTitle} error={errors.title} />
        <BountyDescription
          description={description}
          setDescription={setDescription}
          error={errors.description}
        />
        <BountyTags tags={tags} setTags={setTags} error={errors.tags} />
      </div>

      <div
        className={`transition-opacity duration-300 ${step === 2 ? "opacity-100" : "opacity-0 hidden"}`}
      >
        <BountyCommunicationMethod
          communicationMethod={communicationMethod}
          setCommunicationMethod={setCommunicationMethod}
          error={errors.communicationMethod}
        />
        {/* Other step 2 components */}
      </div>

      <BountyStepNavigation
        step={step}
        setStep={setStep}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
      />
    </BountyFormLayout>
  );
}

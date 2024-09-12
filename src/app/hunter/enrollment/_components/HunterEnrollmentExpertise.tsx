// components/HunterEnrollmentExpertise.tsx (Client Component)
"use client";
import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const predefinedExpertise = ["Law", "Finance", "Tech", "Marketing", "Design"];

export default function HunterEnrollmentExpertise({
  expertise,
  setExpertise,
}: {
  expertise: string[];
  setExpertise: any;
}) {
  const [newExpertise, setNewExpertise] = useState("");
  const newExpertiseInputRef = useRef<HTMLInputElement>(null);

  const handleExpertiseChange = (value: string) => {
    if (expertise.includes(value)) {
      setExpertise(expertise.filter((e) => e !== value));
    } else {
      setExpertise([...expertise, value]);
    }
  };

  const handleAddNewExpertise = () => {
    if (newExpertise && !expertise.includes(newExpertise)) {
      setExpertise([...expertise, newExpertise]);
      setNewExpertise("");
      if (newExpertiseInputRef.current) {
        newExpertiseInputRef.current.focus();
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label>Fields of Expertise (up to 5)</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {predefinedExpertise.map((field) => (
          <Badge
            key={field}
            variant={expertise.includes(field) ? "default" : "outline"}
            className={`cursor-pointer ${
              expertise.includes(field) ? "bg-orange-500" : ""
            }`}
            onClick={() => handleExpertiseChange(field)}
          >
            {field}
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          ref={newExpertiseInputRef}
          placeholder="Add custom expertise"
          value={newExpertise}
          onChange={(e) => setNewExpertise(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddNewExpertise();
            }
          }}
          className="border-gray-300"
        />
        <Button
          type="button"
          onClick={handleAddNewExpertise}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {expertise.map((field) => (
          <Badge
            key={field}
            variant="default"
            className="bg-orange-500 cursor-pointer"
            onClick={() => handleExpertiseChange(field)}
          >
            {field} ✕
          </Badge>
        ))}
      </div>
    </div>
  );
}

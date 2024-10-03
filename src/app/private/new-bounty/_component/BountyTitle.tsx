// components/BountyTitle.tsx (Client Component)
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

export default function BountyTitle({ error, titleSetter }: any) {
  return (
    <div className="mb-6">
      <Label htmlFor="title" className="mb-2 text-[#46515e] flex items-center">
        <FileText className="mr-2" />
        Bounty Title
      </Label>
      <div>
        <Input
          id="title"
          name="title"
          onChange={(e) => {
            titleSetter(e.target.value);
          }}
          placeholder="e.g., Quick Legal Advice Needed"
          className="w-full border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300"
        />
      </div>
      {error && <p className="text-[#d9534f] text-sm mt-1">{error}</p>}
    </div>
  );
}

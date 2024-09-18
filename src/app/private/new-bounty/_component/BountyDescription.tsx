// components/BountyDescription.tsx (Client Component)
"use client";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

export default function BountyDescription({
  description,
  setDescription,
  error,
}: any) {
  return (
    <div className="mb-6">
      <Label
        htmlFor="description"
        className="mb-2 text-[#46515e] flex items-center"
      >
        <FileText className="mr-2" />
        Description
      </Label>
      <Textarea
        id="description"
        placeholder="Provide a detailed description of your problem..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border-[#d4d4d4] min-h-[150px] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300"
      />
      <p className="text-sm text-[#46515e] mt-1">
        {description.length}/500 characters
      </p>
      {error && <p className="text-[#d9534f] text-sm mt-1">{error}</p>}
    </div>
  );
}

// components/BountyCommunicationMethod.tsx (Client Component)
"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MessageSquare, Video, Mic } from "lucide-react";

export default function BountyCommunicationMethod({
  communicationMethod,
  setCommunicationMethod,
  error,
}: any) {
  return (
    <div className="mb-6">
      <Label className="mb-2 text-[#46515e] flex items-center">
        <MessageSquare className="mr-2" />
        Preferred Communication Method
      </Label>
      <RadioGroup
        value={communicationMethod}
        onValueChange={setCommunicationMethod}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="video" id="video" />
          <Label htmlFor="video" className="flex items-center cursor-pointer">
            <Video className="mr-2" />
            Video
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="audio" id="audio" />
          <Label htmlFor="audio" className="flex items-center cursor-pointer">
            <Mic className="mr-2" />
            Audio
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="chat" id="chat" />
          <Label htmlFor="chat" className="flex items-center cursor-pointer">
            <MessageSquare className="mr-2" />
            Chat
          </Label>
        </div>
      </RadioGroup>
      {error && <p className="text-[#d9534f] text-sm mt-1">{error}</p>}
    </div>
  );
}

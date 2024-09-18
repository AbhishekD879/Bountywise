// components/BountyDeadline.tsx (Client Component)
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Clock, CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function BountyDeadline({
  deadline,
  setDeadline,
}: {
  deadline: Date | undefined;
  setDeadline: any;
}) {
  return (
    <div className="mb-6">
      <Label
        htmlFor="deadline"
        className="block mb-2 text-[#46515e] flex items-center"
      >
        <Clock className="mr-2" />
        Deadline (Optional)
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={`w-full justify-start text-left font-normal border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300 ${!deadline && "text-muted-foreground"}`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={deadline}
            onSelect={setDeadline}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

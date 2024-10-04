"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  FileText,
  Tag,
  MessageSquare,
  Clock,
  X,
  Sparkles,
  Video,
  Mic,
  MessageCircle,
  Eye,
  Compass,
  PlusCircle,
} from "lucide-react";

// Assume this action is defined elsewhere and imported here
import { createBounty } from "@/app/actions";
import BountyAttachments from "../new-bounty/_component/BountyAttachments";
import CommingSoon from "@/components/ui/CommingSoon";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const tagOptions = [
  { value: "legal", label: "Legal", icon: "⚖️" },
  { value: "finance", label: "Finance", icon: "💰" },
  { value: "technology", label: "Technology", icon: "💻" },
  { value: "design", label: "Design", icon: "🎨" },
  { value: "writing", label: "Writing", icon: "✍️" },
  { value: "marketing", label: "Marketing", icon: "📢" },
];

export default function NewBountyForm() {
  const [state, formAction] = useFormState(createBounty, null);
  const [description, setDescription] = useState(""); // The current text in the editor
  const [isTyping, setIsTyping] = useState(false); // To track if typing animation is happening
  const [typingText, setTypingText] = useState(""); // The full text that will be typed out
  const [customTag, setCustomTag] = useState("");
  const [bountyTitle, setBountyTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);

  // Refs
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  // Typing animation states for title
  const [isTypingTitle, setIsTypingTitle] = useState(false);
  const [typingTextTitle, setTypingTextTitle] = useState("");
  const typingSpeed = 20; // Typing speed in milliseconds
  // Typing effect for AI-generated text
  useEffect(() => {
    if (isTyping && typingText.length > 0) {
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < typingText.length) {
          setDescription((prev) => prev + typingText[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, typingSpeed);

      return () => clearInterval(typeInterval);
    }
  }, [isTyping, typingText]);

  // Typing effect for AI-generated title
  useEffect(() => {
    if (isTypingTitle && typingTextTitle.length > 0) {
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex < typingTextTitle.length) {
          setBountyTitle((prev) => prev + typingTextTitle[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTypingTitle(false);
        }
      }, typingSpeed);

      return () => clearInterval(typeInterval);
    }
  }, [isTypingTitle, typingTextTitle]);

  // Handle AI button click
  const handleAiDescriptionClick = async () => {
    console.log("Inside Ai Click");
    if (!bountyTitle) {
      alert("Please enter a bounty title before generating a description.");
      return;
    }
    if (descriptionRef.current) {
      descriptionRef.current.disabled = true;
    }
    const data = await fetch("/api/private/ms/ai/generateBountyDescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: bountyTitle, description }),
    });
    const aiGeneratedText = (await data.json()).description;
    if (descriptionRef.current) {
      descriptionRef.current.disabled = false;
    }
    setDescription(""); // Reset description before starting typing
    setTypingText(aiGeneratedText); // Set the full text for typing
    setIsTyping(true); // Start the typing animation
  };

  // Handle AI title button click
  const handleAiTitleClick = async () => {
    if (!bountyTitle) {
      alert("Please enter a bounty title before generating a title.");
      return;
    }
    if (titleRef.current) {
      titleRef.current.disabled = true;
    }
    const data = await fetch("/api/private/ms/ai/rewriteBountyTitle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: bountyTitle }),
    });
    const aiGeneratedTitle = (await data.json()).title;
    if (titleRef.current) {
      titleRef.current.disabled = false;
    }
    setBountyTitle(""); // Reset title before starting typing
    setTypingTextTitle(aiGeneratedTitle); // Set the full title text for typing
    setIsTypingTitle(true); // Start the typing animation
  };

  const handleAddTag = (value: string) => {
    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddCustomTag = () => {
    if (customTag && !tags.includes(customTag)) {
      setTags([...tags, customTag]);
      setCustomTag("");
    }
  };

  if (state?.success) return <SuccessModel isOpen={state?.success} />;

  return (
    <form
      action={formAction}
      className="w-full h-full flex flex-col space-y-2 py-3"
    >
      <div className="flex-grow space-y-3">
        <div className="transition-all duration-300  p-1 rounded-lg">
          <Label
            htmlFor="title"
            className="text-lg font-semibold text-[#46515e] flex items-center"
          >
            <FileText className="mr-2 h-5 w-5 text-[#ff5722]" />
            Bounty Title
          </Label>
          <div className="relative">
            <Input
              id="title"
              name="title"
              className="mt-1 w-full border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300"
              placeholder="e.g., Quick Legal Advice Needed"
              value={bountyTitle}
              onChange={(e) => setBountyTitle(e.target.value)}
              ref={titleRef}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    onClick={handleAiTitleClick}
                    className="absolute top-0 right-2 p-1 bg-transparent hover:bg-[#ff57221a] text-[#ff5722] rounded-full transition-all duration-300"
                  >
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>AI-powered title generation</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {state?.title && (
            <p className="text-[#d9534f] text-sm mt-1">{state.title}</p>
          )}
        </div>

        <div className="transition-all duration-300  p-1 rounded-lg">
          <Label
            htmlFor="description"
            className="text-lg font-semibold text-[#46515e] flex items-center"
          >
            <FileText className="mr-2 h-5 w-5 text-[#ff5722]" />
            Description
          </Label>
          <div className="mt-1 relative">
            <Textarea
              id="description"
              name="description"
              className="w-full min-h-[200px] border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300"
              placeholder="Provide a detailed description of your bounty..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              ref={descriptionRef}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    onClick={handleAiDescriptionClick}
                    className="absolute top-2 right-2 p-1 bg-transparent hover:bg-[#ff57221a] text-[#ff5722] rounded-full transition-all duration-300"
                  >
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  AI-powered Bounty Description generation
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {state?.description && (
            <p className="text-[#d9534f] text-sm mt-1">{state.description}</p>
          )}
        </div>

        <div className="transition-all duration-300  p-1 rounded-lg">
          <Label
            htmlFor="tags"
            className="text-lg font-semibold text-[#46515e] flex items-center"
          >
            <Tag className="mr-2 h-5 w-5 text-[#ff5722]" />
            Tags
          </Label>
          <div className="mt-1 flex flex-wrap gap-2">
            <Select onValueChange={handleAddTag}>
              <SelectTrigger className="w-full md:w-auto border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300">
                <SelectValue placeholder="Select tags" />
              </SelectTrigger>
              <SelectContent>
                {tagOptions.map((tag) => (
                  <SelectItem key={tag.value} value={tag.value}>
                    <span className="flex items-center">
                      <span className="mr-2">{tag.icon}</span>
                      {tag.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Custom tag"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                className="flex-1 border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300"
              />
              <Button
                type="button"
                onClick={handleAddCustomTag}
                className="bg-[#ff5722] text-white hover:bg-[#ff784e] transition-all duration-300"
              >
                Add
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-[#ff57221a] text-[#ff5722] rounded-full text-sm flex items-center animate-fadeIn"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-[#ff5722] hover:text-[#d9534f] transition-colors duration-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <input type="hidden" name="tags" value={JSON.stringify(tags)} />
          {state?.tags && (
            <p className="text-[#d9534f] text-sm mt-1">{state.tags}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 align-middle gap-6">
          <div className="transition-all duration-300  p-2 rounded-lg">
            <Label className="text-lg font-semibold text-[#46515e] flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-[#ff5722]" />
              Preferred Communication Method
            </Label>
            <RadioGroup
              name="communicationMethod"
              className="flex space-x-4 mt-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video" className="flex items-center">
                  <Video className="mr-1 h-4 w-4" />
                  Video
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="audio" id="audio" />
                <Label htmlFor="audio" className="flex items-center">
                  <Mic className="mr-1 h-4 w-4" />
                  Audio
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="chat" id="chat" />
                <Label htmlFor="chat" className="flex items-center">
                  <MessageCircle className="mr-1 h-4 w-4" />
                  Chat
                </Label>
              </div>
            </RadioGroup>
            {state?.communicationMethod && (
              <p className="text-[#d9534f] text-sm mt-1">
                {state.communicationMethod}
              </p>
            )}
          </div>

          <div className="transition-all duration-300  p-2 rounded-lg">
            <Label
              htmlFor="deadline"
              className="text-lg font-semibold text-[#46515e] flex items-center"
            >
              <Clock className="mr-2 h-5 w-5 text-[#ff5722]" />
              Deadline (Optional)
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1",
                    !deadline && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? (
                    format(deadline, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
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
            <input
              type="hidden"
              name="deadline"
              value={deadline ? deadline.toISOString() : ""}
            />
          </div>
        </div>

        {/* <div className="transition-all duration-300  p-1 rounded-lg">
          <Label htmlFor="budget" className="text-lg font-semibold text-[#46515e] flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-[#ff5722]" />
            Budget
          </Label>
          <div className="mt-1 relative">
            <Input
              id="budget"
              name="budget"
              type="number"
              min="0"
              step="0.01"
              className="pl-8 w-full border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300"
              placeholder="Enter your budget"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
          </div>
          {state?.budget && <p className="text-[#d9534f] text-sm mt-1">{state.budget}</p>}
        </div> */}

        <CommingSoon>
          <BountyAttachments />
        </CommingSoon>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#ff5722] text-white hover:bg-[#ff784e] transition-all duration-300 mt-6 group"
      >
        Create Bounty
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          →
        </span>
      </Button>
    </form>
  );
}

interface SuccessModelProps {
  isOpen: boolean;
}

function SuccessModel({ isOpen }: SuccessModelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#303841] bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={() => setIsVisible(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`bg-[#eeeeee] rounded-2xl p-10 max-w-2xl w-full shadow-2xl transition-all duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="modal-title"
          className="text-3xl font-bold text-center mb-8 text-[#303841] tracking-tight"
        >
          Bounty Successfully Created!
        </h2>
        <div className="space-y-6">
          <Link
            href="/new-bounty-v2"
            className="w-full py-4 px-6 bg-[#ff5722] text-[#ffffff] rounded-lg hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center group shadow-md hover:shadow-lg"
          >
            <PlusCircle className="mr-3 h-6 w-6" />
            <span className="text-lg font-semibold">Create New Bounty</span>
            <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="testscreens/bountylisting"
            className="w-full py-4 px-6 bg-[#46515e] text-[#ffffff] rounded-lg hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center group shadow-md hover:shadow-lg"
          >
            <Compass className="mr-3 h-6 w-6" />
            <span className="text-lg font-semibold">Explore Bounties</span>
            <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/private/dashboard"
            className="w-full py-4 px-6 bg-[#303841] text-[#ffffff] rounded-lg hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center group shadow-md hover:shadow-lg"
          >
            <Eye className="mr-3 h-6 w-6" />
            <span className="text-lg font-semibold">View Active Bounties</span>
            <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

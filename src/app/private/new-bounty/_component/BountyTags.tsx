// components/BountyTags.tsx (Client Component)
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tag, X, HelpCircle } from "lucide-react";
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

export default function BountyTags({
  error,
}: {
  error: string;
}) {
  const [tags, setTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");

  const handleAddTag = (value: string) => {
    if (value && !tags.includes(value)) {
      setTags([...tags, value]);
    }
  };

  const handleAddCustomTag = () => {
    if (customTag && !tags.includes(customTag)) {
      setTags([...tags, customTag]);
      setCustomTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prevTags: string[]) =>
      prevTags.filter((tag: string) => tag !== tagToRemove)
    );
  };

  return (
    <div className="mb-6">
      <Label htmlFor="tags" className="mb-2 text-[#46515e] flex items-center">
        <Tag className="mr-2" />
        Tags
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="inline-block ml-2 w-4 h-4 text-[#46515e] cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Select relevant tags for your bounty</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Label>
      <Select  onValueChange={handleAddTag}>
        <SelectTrigger className="w-full border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300">
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
      <div className="flex items-center mt-2">
        <Input
          placeholder="Add custom tag"
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          className="mr-2 border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300"
        />
        <Button
          type="button"
          onClick={handleAddCustomTag}
          variant="outline"
          className="border-[#ff5722] text-[#ff5722] hover:bg-[#ff57221a] transition-all duration-300"
        >
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-[#ff57221a] border border-[#ff5722] text-[#ff5722] rounded-full text-sm flex items-center animate-fadeIn"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 text-[#ff5722]"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <input type="hidden" name="tags" value={tags} />
      {error && <p className="text-[#d9534f] text-sm mt-1">{error}</p>}
    </div>
  );
}

// components/HunterEnrollmentProfilePicture.tsx (Client Component)
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";

export default function HunterEnrollmentProfilePicture({
  profilePicture,
  setProfilePicture,
}: {
  profilePicture: File | null;
  setProfilePicture: any;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }
      setProfilePicture(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="profilePicture">Profile Picture</Label>
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {profilePicture ? (
            <Image
              src={URL.createObjectURL(profilePicture)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          )}
        </div>
        <Input
          id="profilePicture"
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          onClick={() => document.getElementById("profilePicture")?.click()}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Upload Picture
        </Button>
      </div>
    </div>
  );
}

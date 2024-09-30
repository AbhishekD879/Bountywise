// components/HunterEnrollmentProfilePicture.tsx (Client Component)
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/hooks/useAuth";

export default function HunterEnrollmentProfilePicture({
  profilePicture,
  setProfilePicture,
}: {
  profilePicture: null | string;
  setProfilePicture: any;
}) {
  const { user } = useAuth();
  if (!profilePicture && user.profilePicture) {
    setProfilePicture(user.profilePicture);
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2 cursor-pointer">
      <div className="flex flex-col justify-center items-center space-y-2">
        <div className="w-20 h-20 group ring-1 ring-black ring-offset-4 rounded-full bg-gray-200 flex items-center relative justify-center overflow-hidden">
          {profilePicture ? (
            <Image
              width={100}
              height={100}
              src={profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="cursor-pointer">
              <svg
                className="w-12 h-12  text-gray-400"
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
            </div>
          )}
          <div className="hidden group-hover:flex absolute top-0 w-full items-center justify-center h-full bg-black bg-opacity-30">
            <Label className="cursor-pointer" htmlFor="profilePicture">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                <path d="m15 5 4 4" />
              </svg>
              <Input
                id="profilePicture"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}

// components/CommingSoon.tsx
import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils"; // shadcn helper function for classnames
import { AlertCircle } from "lucide-react";

interface CommingSoonProps {
  className?: string;
  message?: string;
}

const CommingSoon: React.FC<PropsWithChildren<CommingSoonProps>> = ({
  children,
  className,
  message = "Coming Soon",
}) => {
  return (
    <div className="relative">
      {/* Child component */}
      <div className="pointer-events-none opacity-50">{children}</div>

      {/* Overlay */}
      <div
        className={cn(
          "absolute p-2 inset-0 z-10 flex items-center justify-center rounded backdrop-blur-[1px] bg-opacity-50 text-white font-bold bg-transparent border border-[#969ba1]",
          className,
        )}
      >
        <div className="flex items-center absolute top-1 right-1 gap-1">
          <AlertCircle
            width={12}
            height={12}
            className="text-[#ff5722] animate-pulse"
          />
          <span className="text-sm text-[#969ba1]  font-bold">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default CommingSoon;

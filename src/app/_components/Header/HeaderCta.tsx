"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect } from "react";
import { ProfileDropdown } from "./ProfileDropDown";

// Define type for the Cta component
interface CtaProps {
  children?: React.ReactNode;
}

export const Cta: React.FC<CtaProps> = ({ children }) => {
  "use client";
  const { loading, error, user, getCurrentUser } = useAuth();

  useEffect(() => {
    if (!user.email) {
      getCurrentUser();
    }
  }, [getCurrentUser, user.email]);

  if (loading) {
    return <Skeleton className="size-10 rounded-full" />;
  }

  if (user.profilePicture) {
    return (
      <div>
        <ProfileDropdown
          url={user.profilePicture}
          firstName={user.firstName!}
        />
      </div>
    );
  }

  return <div className="flex gap-4">{children}</div>;
};

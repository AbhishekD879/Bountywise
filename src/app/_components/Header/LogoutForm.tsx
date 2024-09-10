"use client";
import { logout } from "@/app/actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/hooks/useAuth";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export const LogoutForm = () => {
  const [state, logoutAction] = useFormState(logout, null);
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    if (state) {
      getCurrentUser();
    }
  }, [state, getCurrentUser]);

  return (
    <DropdownMenuItem className="cursor-pointer" asChild>
      <form action={logoutAction}>
        <LogOut className="mr-2 h-4 w-4" />
        <button type="submit">Log out</button>
      </form>
    </DropdownMenuItem>
  );
};

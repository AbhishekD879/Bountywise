import { useFormState, useFormStatus } from "react-dom";
import DisabledWrapper from "./DisabledWrapper";
import { googleAuth } from "@/app/actions";

export default function GoogleAuth() {
  const [state, action] = useFormState(googleAuth, null);
  const { pending } = useFormStatus();
  return (
    // {/* Sign In with Google */}
    <form action={action}>
      <button
        disabled={pending}
        type="submit"
        className="bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50 dark:focus:ring-[#4285F4]/55 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm mt-2 relative"
      >
        <svg
          className="mr-2 mt-1 -ml-1 w-4 h-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Sign in with Google
        {pending && <DisabledWrapper />}
      </button>
    </form>
  );
}

"use client";
import Image from "next/image";
import CONSTANT from "@/constants";
import { login, register } from "../actions"; // Import login and register actions
import { useFormState, useFormStatus } from "react-dom"; // Hooks for form state and status
import { Ban, InfoIcon } from "lucide-react"; // Icon for error messages
import { Dispatch, SetStateAction, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";

interface modelProps {
  isOpen: boolean;
  modelStateSetter: Dispatch<SetStateAction<boolean>>;
  modelProps: any;
}

export default function AuthForm(props: modelProps) {
  const { modelStateSetter, modelProps } = props;
  const [isSignUpMode, setIsSignUpMode] = useState(modelProps.isSignUpMode); // Toggle between signup and login mode
  const [state, authAction] = useFormState(
    isSignUpMode ? register : login, // Dynamically choose login or register action
    null,
  );
  const { getCurrentUser } = useAuth(); // Fetch authentication status from the custom hook
  if (state?.success) {
    console.log("Login Successful");
    modelStateSetter(false); // Close the model
    getCurrentUser();
    return null; // Return null to prevent rendering the form again
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Brand Logo */}
        <Image
          className="mx-auto h-10 w-auto"
          alt={CONSTANT.BRAND}
          width={44}
          height={44}
          src="/logo.svg"
        />

        {/* Form Title */}
        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {isSignUpMode ? "Sign up for an account" : "Sign in to your account"}
        </h2>

        {/* Error Message */}
        {state?.error && (
          <div className="flex items-center justify-center gap-1 text-center mt-2">
            <InfoIcon className="text-sm text-center font-bold !text-destructive" />
            <p className="text-sm text-center font-bold !text-destructive">
              {state?.error}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Authentication Form */}
        <form action={authAction} className="space-y-2">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accentOrange sm:text-sm sm:leading-6 focus-visible:outline-none px-2"
              />
            </div>
            {state?.email && (
              <p className="text-sm !text-destructive">{state.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              {!isSignUpMode && (
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-accentOrange hover:text-accentOrange/80"
                  >
                    Forgot password?
                  </a>
                </div>
              )}
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accentOrange/60 sm:text-sm sm:leading-6 focus-visible:outline-none px-2"
              />
            </div>
            {state?.password?.map((el) => (
              <p className="text-sm text-red-500" key={el}>
                {el}
              </p>
            ))}
          </div>

          {/* Confirm Password (only for Sign Up mode) */}
          {isSignUpMode && (
            <div className="!mb-4">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-accentOrange/60 sm:text-sm sm:leading-6 focus-visible:outline-none px-2"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Submit isSignUpMode={isSignUpMode} />
          <SocialSignInButtons />
        </form>

        {/* Social Sign In Buttons */}

        {/* Toggle Sign In/Sign Up Mode */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            {isSignUpMode ? "Already have an account?" : "Not a member yet?"}{" "}
            <a
              href="#"
              onClick={() => setIsSignUpMode(!isSignUpMode)}
              className="font-semibold leading-6 text-accentOrange hover:text-accentOrange/80"
            >
              {isSignUpMode ? "Sign in" : "Sign up"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Submit Button Component
const Submit = ({ isSignUpMode }: { isSignUpMode: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <div>
      <button
        disabled={pending}
        type="submit"
        className="flex w-full justify-center rounded-md bg-accentOrange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accentOrange/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentOrange disabled:opacity-50 disabled:cursor-not-allowed relative"
      >
        {isSignUpMode ? "Sign up" : "Sign in"}
        {pending && <DisabledWrapper />}
      </button>
    </div>
  );
};

// Social Sign In Buttons Component
const SocialSignInButtons = () => {
  const { pending } = useFormStatus();
  return (
    <div>
      {/* Sign In with Google */}
      <button
        disabled={pending}
        type="button"
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

      {/* Sign In with Apple */}
      <button
        disabled={pending}
        type="button"
        className="bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:ring-[#050708]/50 dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm mt-2 relative"
      >
        <svg
          className="mr-2 -ml-1 w-5 h-5"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="apple"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            fill="currentColor"
            d="M318.7 268c-.2-37.2 16.5-64.6 51.5-86.4-19-27.8-47.6-43.6-85-48.3-35.6-4.3-74.3 21.5-87 21.5-12.9 0-55.5-20.7-81.1-20.1-41.7.6-82 24.7-103.9 62.8-44.6 77.5-11.5 192.3 31.7 255.1 21.2 31.1 46.4 66 79.6 64.7 31.6-1.3 43.5-20.5 81-20.7 37.3-.2 48.2 20.6 81.1 20 33.6-.6 54.8-31.5 75.2-62.7 12.8-19.6 17.5-29.6 27.5-51.7-72.5-27.4-85.2-127.5-12.8-168.4z"
          ></path>
        </svg>
        Sign in with Apple
        {pending && <DisabledWrapper />}
      </button>
    </div>
  );
};

const DisabledWrapper = () => {
  return (
    <div className="w-full h-full backdrop:blur-lg flex justify-center items-center absolute z-10 top-0 left-0">
      <Ban color="red" height="24" width="24" />
    </div>
  );
};

"use client";
import Image from "next/image";
import CONSTANT from "@/constants";
import { login, register } from "../actions"; // Import signup action
import { useFormState, useFormStatus } from "react-dom";
import { InfoIcon } from "lucide-react";
import { useState } from "react";

export default function AuthForm() {
  const [isSignUpMode, setIsSignUpMode] = useState(false); // State to toggle between sign up and sign in
  console.log(isSignUpMode)
  const [state, authAction] = useFormState(
    isSignUpMode ? register : login, // Dynamically choose the action
    null
  );


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          alt={CONSTANT.BRAND}
          width={44}
          height={44}
          src="/logo.svg"
        />
        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {isSignUpMode ? "Sign up for an account" : "Sign in to your account"}
        </h2>
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
        <form action={authAction} className="space-y-2">
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

          <Submit isSignUpMode={isSignUpMode} />
        </form>

        <button
          type="button"
          className="bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50 dark:focus:ring-[#4285F4]/55 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm mt-2"
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
        </button>

        <button
          type="button"
          className="bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:ring-[#050708]/50 dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm mt-2"
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
              d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
            ></path>
          </svg>
          Sign in with Apple
        </button>

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

const Submit = ({ isSignUpMode }: { isSignUpMode: boolean }) => {
  const data =  useFormStatus();
  console.log(data)
  return (
    <div>
      <button
        disabled={data.pending}
        type="submit"
        className="flex w-full justify-center rounded-md bg-accentOrange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accentOrange/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentOrange disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSignUpMode ? "Sign up" : "Sign in"}
      </button>
    </div>
  );
};

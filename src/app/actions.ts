"use server";
import loginSchema from "@/lib/_definitions/loginSchema";
import registerSchema from "@/lib/_definitions/registerSchema";
import { lucia } from "@/lib/lucia";
import { google } from "@/lib/oAuth/googleOAuth";
import { Roles } from "@/lib/roles";
import db from "@/lib/tembo.db";
import { userTable } from "@/schema";
import { generateCodeVerifier, generateState } from "arctic";
import { sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { v4 } from "uuid";

// Define the common return object structure
interface TReturnObject {
  email: string[] | undefined | null;
  password: string[] | undefined | null;
  error: string | null;
  success: boolean;
  message: string | null;
}

// Fixing the login function
export async function login(previousState: any, formdata: FormData) {
  const returnObject: TReturnObject = {
    email: undefined,
    password: undefined,
    error: null,
    success: false, // Default success state is false
    message: null,
  };

  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;

  // Validate email and password
  const validationResult = await loginSchema.safeParseAsync({
    email,
    password,
  });

  if (!validationResult.success) {
    const { email, password } = validationResult.error.flatten().fieldErrors;
    returnObject.email = email;
    returnObject.password = password;
    return returnObject;
  }

  // Check if the user exists
  try {
    const user = await db.query.userTable.findFirst({
      where: sql`${userTable.email} = ${email}`,
    });

    if (!user) {
      returnObject.error = "User not found. Please register.";
      return returnObject;
    }

    if (!user.hashedPassword) {
      returnObject.error =
        "Click Google/Apple buttons for sign up; no email/password needed";
      return returnObject;
    }

    // Validate the password
    const isPasswordValid = await new Argon2id().verify(
      user.hashedPassword,
      password,
    );
    if (!isPasswordValid) {
      returnObject.error = "Invalid password.";
      return returnObject;
    }

    // Create a session and session cookie
    const session = await lucia.createSession(user.id, {
      expiresIn: 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    // If successful
    returnObject.success = true;
    returnObject.message = "Login successful!";
  } catch (error) {
    returnObject.error = "An error occurred during login.";
    console.log(error);
  }

  return returnObject;
}

// Fixing the register function
export async function register(previousState: any, formdata: FormData) {
  const returnObject: TReturnObject & { confirm: string[] | undefined | null } =
    {
      email: undefined,
      password: undefined,
      confirm: undefined,
      error: null,
      success: false,
      message: null,
    };

  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  const confirmPassword = formdata.get("confirm-password") as string;

  // Validate email, password, and confirmPassword
  const validationResult = await registerSchema.safeParseAsync({
    email,
    password,
    confirmPassword,
  });

  if (!validationResult.success) {
    const { email, password, confirmPassword } =
      validationResult.error.flatten().fieldErrors;
    returnObject.email = email;
    returnObject.password = password;
    returnObject.confirm = confirmPassword;
    return returnObject;
  }

  // Check if the user already exists
  try {
    const existingUser = await db.query.userTable.findFirst({
      where: sql`${userTable.email} = ${email}`,
    });

    if (existingUser) {
      returnObject.error = "User already exists, please sign in.";
      return returnObject;
    }

    // Hash password and create user
    const hashedPassword = await new Argon2id().hash(password);
    const userId = v4();

    await db.insert(userTable).values({
      id: userId,
      email,
      hashedPassword,
      roleId: Roles.user,
      profilePicture: `https://robohash.org/${userId}`,
    });

    // Create a session and session cookie
    const session = await lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    // Set success message
    returnObject.success = true;
    returnObject.message = "Registration successful!";
  } catch (error) {
    returnObject.error = "An error occurred during registration.";
    console.log(error);
  }

  return returnObject;
}

// Logout Route
export async function logout() {
  const blankSession = lucia.createBlankSessionCookie();
  cookies().set(blankSession.name, blankSession.value, blankSession.attributes);
  cookies().delete("google_code_verifier");
  cookies().delete("google_state");
  return true;
}

// Google auth
export async function googleAuth() {
  console.log("google action");
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const consentUrl = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["email", "profile", "openid"],
  });
  cookies().set("google_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  cookies().set("google_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  redirect(consentUrl.toString());
}

"use server";
import loginSchema  from "@/lib/_definitions/loginSchema";
import registerSchema from "@/lib/_definitions/registerSchema";
import { lucia } from "@/lib/lucia";
import { Roles } from "@/lib/roles";
import db from "@/lib/tembo.db";
import { userTable } from "@/schema";
import { sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";
import { v4} from "uuid";

interface TReturnObject {
  email: string[] | undefined | null;
  password: string[] | undefined | null;
  error: string | null;
}
export async function login(previousState: any, formdata: FormData) {
  const returnObject: TReturnObject & { success?: boolean; message?: string } = {
    email: undefined,
    password: undefined,
    error: null,
    success: false, // Default success state is false
  };

  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;

  // Validate the email and password using the login schema
  const validationResult = await loginSchema.safeParseAsync({
    email,
    password,
  });

  if (!validationResult.success) {
    console.log(validationResult.error.flatten().fieldErrors);
    const { email, password } = validationResult.error.flatten().fieldErrors;
    returnObject.email = email;
    returnObject.password = password;
    return returnObject;
  }

  // Check if the user exists in the database
  try {
    const user = await db.query.userTable.findFirst({
      where: (sql`${userTable.email} = ${email}`)
    });

    if (!user) {
      returnObject.error = "User not found. Please register.";
      return returnObject;
    }

    // Verify the provided password with the stored hashed password
    const isPasswordValid = await new Argon2id().verify(user.hashedPassword, password);

    if (!isPasswordValid) {
      returnObject.error = "Invalid password.";
      return returnObject;
    }

    // Create a session for the user if the login is successful
    const session = await lucia.createSession(user.id, {
      expiresIn: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
    });

    // Create a session cookie
    const sessionCookie = lucia.createSessionCookie(session.id);

    // Set the session cookie in the response
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    // Return success state when no errors occur
    returnObject.success = true;
    returnObject.message = "Login successful!";
    returnObject.error = null; // Clear any error since login is successful
  } catch (error) {
    // Catch any errors that occur during the login process
    returnObject.error = "An error occurred during login.";
    console.log(error);
    return returnObject;
  }

  return returnObject;
}

export async function register(previousState: any, formdata: FormData) {
  const returnObject: TReturnObject & {
    confirm: string[] | undefined | null;
  } = {
    email: undefined,
    password: undefined,
    error: null,
    confirm: undefined,
  };

  const email = formdata.get("email") as string;
  const password = formdata.get("password") as string;
  const confirmPassword = formdata.get("confirm-password") as string;

  console.log("Register Form Data", formdata);

  // Validation using your schema (assuming registerSchema uses Zod or Yup)
  const validationResult = await registerSchema.safeParseAsync({
    email,
    password,
    confirmPassword: formdata.get("confirm-password") as string,
  });

  // If validation fails, return the validation errors
  if (!validationResult.success) {
    console.log(validationResult.error.flatten().fieldErrors);
    const { email, password, confirmPassword } =
      validationResult.error.flatten().fieldErrors;
    returnObject.email = email;
    returnObject.password = password;
    returnObject.confirm = confirmPassword;
    return returnObject;
  }

  // Check if user already exists in the database
  const checkUser = await db.query.userTable.findFirst({
    where: (sql`${userTable.email} = ${email}`)
  });

  // Generate a unique user ID
  const userId = v4();

  if (!checkUser) {
    // Hash the user's password securely with Argon2id
    const hashedPassword = await new Argon2id().hash(password);

    // Insert the new user into the database
    const newUser = await db.insert(userTable).values({
      id: userId,
      email: email,
      hashedPassword: hashedPassword,
      roleId: Roles.user,
      profilePicture: "https://robohash.org/" + userId, // Generate profile picture URL
    });

    console.log("New User Created with ID:", userId);

    // Create a new session for the user
    const session = await lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
    });

    // Create a session cookie
    const sessionCookie = lucia.createSessionCookie(session.id);

    // Set the session cookie in the response
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    returnObject.error = null; // Clear any error since registration is successful
  } else {
    // User already exists, return an error
    returnObject.error = "User already exists, please sign in";
  }

  return returnObject;
}
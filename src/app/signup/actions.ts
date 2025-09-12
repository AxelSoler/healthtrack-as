"use server";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export interface SignupFormState {
  type?: "success" | "error";
  message: string;
}

const SignupSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export async function signup(
  prevState: SignupFormState | null,
  formData: FormData
): Promise<SignupFormState> {
  const validatedFields = SignupSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    const errorMessage = validatedFields.error.issues
      .map((e) => e.message)
      .join("\n");
    return { type: "error", message: errorMessage };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp(validatedFields.data);

  if (error) {
    return { type: "error", message: error.message };
  }

  return {
    type: "success",
    message: "Check your email for a confirmation link to complete your registration.",
  };
}

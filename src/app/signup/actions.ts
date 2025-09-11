"use server";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export interface SignupFormState {
  type?: "success" | "error";
  message: string;
}

const SignupSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
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
      .join(". ");
    return { type: "error", message: errorMessage };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp(validatedFields.data);

  if (error) {
    return { type: "error", message: error.message };
  }

  return {
    type: "success",
    message: "Success! Please check your email to confirm your account.",
  };
}

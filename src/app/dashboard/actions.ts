"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const MetricSchema = z.object({
  weight: z.coerce.number().optional(),
  blood_pressure: z.string().optional(),
  sleep_hours: z.coerce.number().optional(),
});

export async function addMetric(prevState: any, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "You must be logged in to add a metric.",
    };
  }

  const result = MetricSchema.safeParse({
    weight: formData.get("weight"),
    blood_pressure: formData.get("blood_pressure"),
    sleep_hours: formData.get("sleep_hours"),
  });

  if (!result.success) {
    return {
      error: "Invalid data provided.",
    };
  }

  const { error } = await supabase.from("metrics").insert([
    {
      ...result.data,
      user_id: user.id,
    },
  ]);

  if (error) {
    console.error(error);
    return {
      error: "Failed to save metric. Please try again.",
    };
  }

  revalidatePath("/dashboard");
  return {
    success: true,
  };
}

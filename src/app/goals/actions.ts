'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from "zod";

export async function updateWeightGoal(weight_goal: number) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: 'You must be logged in to update your weight goal.',
    };
  }

  const { error } = await supabase
    .from('profiles')
    .update({ weight_goal })
    .eq('id', user.id);

  if (error) {
    return {
      error: 'Failed to update weight goal.',
    };
  }

  revalidatePath('/goals');

  return {
    success: true,
  };
}

async function addMetricByType(
  type: "weight" | "blood_pressure" | "sleep_hours",
  value: string | number
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "You must be logged in to add a metric.",
    };
  }

  const metric: { [key: string]: string | number; user_id: string } = {
    user_id: user.id,
  };
  metric[type] = value;

  const { error } = await supabase.from("metrics").insert([metric]);

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

const WeightSchema = z.object({
  weight: z.coerce.number(),
});

export async function addWeight(_prevState: unknown, formData: FormData) {
  const result = WeightSchema.safeParse({
    weight: formData.get("weight"),
  });

  if (!result.success) {
    return {
      error: "Invalid data provided.",
    };
  }
  return await addMetricByType("weight", result.data.weight);
}

const BloodPressureSchema = z.object({
  blood_pressure: z.string(),
});

export async function addBloodPressure(_prevState: unknown, formData: FormData) {
  const result = BloodPressureSchema.safeParse({
    blood_pressure: formData.get("blood_pressure"),
  });

  if (!result.success) {
    return {
      error: "Invalid data provided.",
    };
  }
  return await addMetricByType("blood_pressure", result.data.blood_pressure);
}

const SleepHoursSchema = z.object({
  sleep_hours: z.coerce.number(),
});

export async function addSleepHours(_prevState: unknown, formData: FormData) {
  const result = SleepHoursSchema.safeParse({
    sleep_hours: formData.get("sleep_hours"),
  });

  if (!result.success) {
    return {
      error: "Invalid data provided.",
    };
  }
  return await addMetricByType("sleep_hours", result.data.sleep_hours);
}

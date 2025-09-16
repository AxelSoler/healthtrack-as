'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

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

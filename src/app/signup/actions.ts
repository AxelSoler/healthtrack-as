'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

import { z } from 'zod';

const SignupSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export async function signup(formData: FormData) {
  const supabase = await createClient()

  try {
    const data = SignupSchema.parse(Object.fromEntries(formData.entries()));

    const { error } = await supabase.auth.signUp(data);

    if (error) {
      redirect("/error");
    }
  } catch (error) {
    // For now, redirect to a generic error page. 
    // In a real app, you'd want to show more specific error messages to the user.
    redirect("/error");
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
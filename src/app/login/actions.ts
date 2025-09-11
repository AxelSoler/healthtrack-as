'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

import { z } from 'zod';

const LoginSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password cannot be empty." }),
});

export async function login(prevState: any, formData: FormData) {
    const validatedFields = LoginSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        const errorMessage = validatedFields.error.issues.map(e => e.message).join('. ');
        return { message: errorMessage };
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword(validatedFields.data);

    if (error) {
        return { message: error.message };
    }

    revalidatePath('/', 'layout')
    redirect('/')
}
'use server'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod';

const SignupSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export async function signup(prevState: any, formData: FormData) {
    const validatedFields = SignupSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        const errorMessage = validatedFields.error.issues.map(e => e.message).join('. ');
        return { type: 'error', message: errorMessage };
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.signUp(validatedFields.data);

    if (error) {
        return { type: 'error', message: error.message };
    }

    return { type: 'success', message: 'Success! Please check your email to confirm your account.' };
}
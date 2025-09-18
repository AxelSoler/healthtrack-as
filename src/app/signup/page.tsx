"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { signup } from "./actions";
import { useNotification } from "@/contexts/NotificationContext";
import { NotificationType } from "@/components/notifications/Notification";
import { SubmitButton } from "@/components/buttons/SubmitButton";
import Image from "next/image";

export default function SignupPage() {
  const [state, formAction] = useActionState(signup, null);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (state?.message) {
      showNotification(
        state.message,
        (state.type as NotificationType) || "error"
      );
    }
  }, [state, showNotification]);

  return (
    <div className="flex flex-col h-screen items-center p-4">
      <Image
        src="/logo_name.png"
        alt="Health Track - AS Logo"
        width={300}
        height={300}
        className="rounded-full"
        priority
      />
      <div className="w-full max-w-sm">
        <form
          action={formAction}
          className="bg-container-background p-6 rounded-xl shadow-md space-y-4"
        >
          <h1 className="text-xl font-bold text-center">Sign Up</h1>
          <div className="space-y-2">
            <label htmlFor="email">Email:</label>
            <input
              className="w-full border p-2 rounded"
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Password:</label>
            <input
              className="w-full border p-2 rounded"
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              className="w-full border p-2 rounded"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
            />
          </div>
          <SubmitButton className="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark transition-colors">
            Sign up
          </SubmitButton>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="underline text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

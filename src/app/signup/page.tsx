"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { signup } from "./actions";
import { useNotification } from "@/components/notifications/NotificationContext";
import { NotificationType } from "@/components/notifications/Notification";

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
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-sm">
        <form
          action={formAction}
          className="bg-neutral-100 dark:bg-neutral-900 p-6 rounded-xl shadow-md space-y-4"
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
          <button className="w-full bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black p-2 rounded hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors">
            Sign up
          </button>
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

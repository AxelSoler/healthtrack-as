"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { login } from "./actions";
import { useNotification } from "@/contexts/NotificationContext";
import { SubmitButton } from "@/components/buttons/SubmitButton";

export default function LoginPage() {
  const [state, formAction] = useActionState(login, null);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (state?.message) {
      showNotification(state.message, "error");
    }
  }, [state, showNotification]);

  return (
    <div className="flex flex-col h-screen items-center justify-center p-4">
      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark font-bold text-4xl mb-8">
        HEALTH TRACK - AS
      </h1>
      <div className="w-full max-w-sm">
        <form
          action={formAction}
          className="bg-container-background p-6 rounded-xl shadow-md space-y-4"
        >
          <h1 className="text-xl font-bold text-center">Login</h1>
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
          <SubmitButton className="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark transition-colors">
            Log in
          </SubmitButton>
          <p className="text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline text-blue-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

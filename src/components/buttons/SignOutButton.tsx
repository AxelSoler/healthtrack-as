"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-white"
    >
      Logout
    </button>
  );
};

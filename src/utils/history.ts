import { SupabaseClient, User } from "@supabase/supabase-js";

export async function addHistoryLog(
  supabase: SupabaseClient,
  user: User,
  description: string,
) {

  const { error } = await supabase.from("history_logs").insert([
    {
      user_id: user.id,
      description,
    },
  ]);

  if (error) {
    console.error("Error adding history log:", error);
  }
}
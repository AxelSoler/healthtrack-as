import { Header } from "@/components/layout/Header";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const GoalsPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: metrics } = await supabase
    .from("metrics")
    .select("weight")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(2);

  const currentWeight = metrics?.[0]?.weight || 0;
  const previousWeight = metrics?.[1]?.weight || 0;
  const weightDifference = Math.abs(currentWeight - previousWeight);
  const weightChangeStatus =
    currentWeight < previousWeight
      ? "Lost"
      : currentWeight > previousWeight
      ? "Gained"
      : "Maintained";

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <Header />

      <main className="p-4 md:p-8 flex flex-col items-center gap-2 md:gap-8">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
          <div className="w-full h-[150px] rounded-3xl bg-gradient-to-b from-pink-200 to-pink-100 shadow-md flex items-center justify-evenly p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary rounded-bl-full" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-4 border-white rounded-full bg-primary-dark" />

            <div className="flex flex-col items-center text-sm">
              <span className="font-semibold text-pink-800">
                {weightDifference.toFixed(1)} lbs
              </span>
              <span className="text-pink-500">{weightChangeStatus}</span>
            </div>

            <div className="relative flex items-center justify-center">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  stroke="#fbcfe8"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  stroke="#ec4899"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="314"
                  strokeDashoffset="60"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-bold text-pink-700">
                  {currentWeight.toFixed(1)} lbs
                </span>
                <span className="text-xs text-pink-500">Current weight</span>
              </div>
            </div>

            <div className="flex flex-col items-center text-sm">
              <span className="font-semibold text-pink-800">10 lbs</span>
              <span className="text-pink-500">To Goal</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GoalsPage;

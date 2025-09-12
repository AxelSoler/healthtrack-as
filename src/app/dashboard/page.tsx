import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SignOutButton } from "./SignOutButton";
import { MetricForm } from "./MetricForm";

const Dashboard = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: metrics } = await supabase
    .from("metrics")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <header className="flex justify-between items-center p-4 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-xl font-bold text-primary">HealthTrack</h1>
        <SignOutButton />
      </header>

      <main className="p-4 md:p-8 flex flex-col items-center gap-8">
        <MetricForm />

        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Your Metrics</h2>
          <div className="space-y-4">
            {metrics && metrics.length > 0 ? (
              metrics.map((metric) => (
                <div
                  key={metric.id}
                  className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg shadow-sm flex flex-wrap justify-between items-center"
                >
                  <p className="text-sm text-neutral-500">
                    {new Date(metric.created_at).toLocaleDateString()}
                  </p>
                  <div className="flex gap-4 font-mono">
                    {metric.weight && <p>Weight: {metric.weight} kg</p>}
                    {metric.blood_pressure && (
                      <p>BP: {metric.blood_pressure}</p>
                    )}
                    {metric.sleep_hours && (
                      <p>Sleep: {metric.sleep_hours}h</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-neutral-500 py-8">
                You haven't logged any metrics yet.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

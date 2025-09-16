import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { MetricModal } from "./MetricModal";

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
      <Header />

      <main className="p-4 md:p-8 flex flex-col items-center gap-2 md:gap-8">
        <MetricModal />

        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Your Metrics</h2>
          <div className="space-y-4 mt-8">
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
                You haven&apos;t logged any metrics yet.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

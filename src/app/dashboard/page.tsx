"use client";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import Link from "next/link";
import { useState, useEffect } from "react";
import useSWR from "swr";

const motivationalMessages = [
  "Every step counts! Keep going on your wellness journey.",
  "Your health is your greatest wealth. Invest in it every day.",
  "Small changes, big results. You can do it!",
  "Today is a new opportunity to be the best version of yourself.",
  "Don't give up. Progress, not perfection, is what matters.",
];

const supabase = createClient();

const metricsFetcher = async ([, userId]: [string, string]) => {
  const { data, error } = await supabase
    .from("metrics")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(3);
  if (error) throw error;
  return data;
};

const Dashboard = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [randomMessage, setRandomMessage] = useState("");

  useEffect(() => {
    setRandomMessage(
      motivationalMessages[
        Math.floor(Math.random() * motivationalMessages.length)
      ]
    );
  }, []);

  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return redirect("/login");
      }
      setUserId(user.id);
    };
    getUserId();
  }, []);

  const { data: metrics } = useSWR(
    userId ? ["metrics", userId] : null,
    metricsFetcher
  );

  const weights = metrics?.map((metric) => metric.weight).filter(Boolean) as number[];
  const latestWeight = weights && weights.length > 0 ? weights[0] : null;

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <Header />

      <main className="p-4 md:p-8 flex flex-col items-center gap-2 md:gap-8">
        <div className="w-full max-w-4xl flex flex-col items-center gap-4 mb-8 bg-container-background shadow-md rounded-xl p-4 md:p-6">
          <p className="text-lg text-center font-semibold text-primary">
            {randomMessage}
          </p>
          {latestWeight && (
            <p className="text-md text-center text-neutral-600 dark:text-neutral-400">
              Great job with your current weight of {latestWeight} kg! Keep it
              up.
            </p>
          )}
          <Link href="/goals">
            <button className="bg-primary text-white p-3 rounded-md hover:bg-primary-dark transition-colors font-bold">
              Define Your Goals
            </button>
          </Link>
        </div>

        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Last Metrics</h2>
          <div className="space-y-4 mt-8">
            {metrics && metrics.length > 0 ? (
              metrics.map((metric) => (
                <div
                  key={metric.id}
                  className="p-4 bg-container-background rounded-lg shadow-sm flex flex-wrap justify-between items-center"
                >
                  <p className="text-sm text-neutral-500">
                    {new Date(metric.created_at).toLocaleDateString()}
                  </p>
                  <div className="flex gap-4 font-mono">
                    {metric.weight && <p>Weight: {metric.weight} kg</p>}
                    {metric.blood_pressure && (
                      <p>BP: {metric.blood_pressure}</p>
                    )}
                    {metric.sleep_hours && <p>Sleep: {metric.sleep_hours}h</p>}
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

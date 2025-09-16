"use client";

import { Header } from "@/components/layout/Header";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { Modal } from "@/components/modal/Modal";
import { updateWeightGoal } from "./actions";
import { SubmitButton } from "@/components/buttons/SubmitButton";
import { MetricChart } from "@/components/charts/MetricChart";

interface Metric {
  created_at: string;
  id: string;
  user_id: string;
  weight?: number;
  blood_pressure?: string;
  sleep_hours?: number;
}

interface Profile {
  weight_goal: number;
}

const GoalsPage = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        redirect("/login");
      }

      const { data: metricsData } = await supabase
        .from("metrics")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
      setMetrics(metricsData || []);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("weight_goal")
        .eq("id", user.id)
        .single();
      setProfile(profileData);
    };

    fetchData();
  }, []);

  const handleSetGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    const goal = parseFloat(newGoal);
    if (!isNaN(goal)) {
      await updateWeightGoal(goal);
      setIsModalOpen(false);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("weight_goal")
          .eq("id", user.id)
          .single();
        setProfile(profileData);
      }
    }
  };

  const currentWeight = metrics?.[0]?.weight || 0;
  const previousWeight = metrics?.[1]?.weight || 0;
  const weightDifference = Math.abs(currentWeight - previousWeight);
  const weightChangeStatus =
    currentWeight < previousWeight
      ? "Lost"
      : currentWeight > previousWeight
      ? "Gained"
      : "Maintained";

  const weightGoal = profile?.weight_goal || 0;
  const poundsToGoal = Math.abs(currentWeight - weightGoal);
  const goalProgress =
    weightGoal > 0
      ? Math.max(0, 100 - (poundsToGoal / weightGoal) * 100)
      : 0;
  

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
              <span className="font-semibold text-primary-dark">
                {weightDifference.toFixed(1)} lbs
              </span>
              <span className="text-primary">{weightChangeStatus}</span>
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
                  strokeDashoffset={314 - (314 * goalProgress) / 100}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-bold text-primary-dark">
                  {currentWeight.toFixed(1)} lbs
                </span>
                <span className="text-xs text-primary">Current weight</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              {weightGoal > 0 ? (
                <>
                  <span className="font-semibold text-primary-dark">
                    {poundsToGoal.toFixed(1)} lbs
                  </span>
                  <span className="text-primary">To Goal</span>
                </>
              ) : (
                <h2 className="bg-primary-dark rounded-2xl p-2 cursor-pointer">
                  Set a goal!
                </h2>
              )}
            </div>
          </div>
          <div className="flex justify-end my-4 w-full">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-dark rounded-2xl px-4 py-2 cursor-pointer"
            >
              {weightGoal > 0 ? "Update Goal" : "Set a goal!"}
            </button>
          </div>
          <MetricChart metrics={metrics || []} />
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSetGoal} className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Set Your Weight Goal</h3>
            <input
              type="number"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Enter your goal weight"
              className="p-2 border rounded"
            />
            <SubmitButton className="mt-6 w-full bg-primary text-white p-3 rounded-md hover:bg-primary-dark transition-colors">
              Save Goal
            </SubmitButton>
          </form>
        </Modal>
      </main>
    </div>
  );
};

export default GoalsPage;

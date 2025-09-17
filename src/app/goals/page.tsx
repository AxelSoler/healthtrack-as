"use client";

import { Header } from "@/components/layout/Header";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { Modal } from "@/components/modal/Modal";
import { updateWeightGoal } from "./actions";
import { SubmitButton } from "@/components/buttons/SubmitButton";
import { MetricChart } from "@/components/charts/MetricChart";
import { MetricForm } from "./MetricForm";
import GoalsCard from "./GoalsCard";

const supabase = createClient();

const metricsFetcher = async ([, userId]: [string, string]) => {
  const { data, error } = await supabase
    .from("metrics")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

const profileFetcher = async ([, userId]: [string, string]) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("weight_goal")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
};

const GoalsPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState("");

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

  const { data: metrics, mutate: mutateMetrics } = useSWR(
    userId ? ["metrics", userId] : null,
    metricsFetcher
  );
  const { data: profile, mutate: mutateProfile } = useSWR(
    userId ? ["profile", userId] : null,
    profileFetcher
  );

  const handleSetGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    const goal = parseFloat(newGoal);
    if (!isNaN(goal)) {
      mutateProfile({ ...profile, weight_goal: goal }, false);

      await updateWeightGoal(goal);

      mutateProfile();

      setIsModalOpen(false);
    }
  };

  const weightGoal = profile?.weight_goal || 0;

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <Header />

      <main className="p-4 md:p-8 flex flex-col items-center gap-2 md:gap-8">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Goals</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-dark text-white rounded-2xl px-4 py-2 cursor-pointer"
            >
              {weightGoal > 0 ? "Update Goal" : "Set a goal!"}
            </button>
          </div>
          {profile && <GoalsCard metrics={metrics || []} profile={profile} />}
        </div>
        <div className="w-full max-w-4xl flex flex-col gap-8 bg-container-background shadow-md rounded-xl p-4 md:p-6 my-4">
          <MetricChart metrics={metrics || []} />
        </div>
          <MetricForm onSuccess={mutateMetrics} />
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

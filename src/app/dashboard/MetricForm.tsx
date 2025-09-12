
"use client";

import { useRef } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import { addMetric } from "./actions";

export function MetricForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { showNotification } = useNotification();

  const handleSubmit = async (formData: FormData) => {
    const result = await addMetric(formData);
    if (result.error) {
      showNotification(result.error, "error");
    } else {
      showNotification("Metric saved successfully!", "success");
      formRef.current?.reset();
    }
  };

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Metric</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="weight" className="block text-sm font-medium">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            step="0.1"
            className="mt-1 block w-full p-2 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-neutral-800"
          />
        </div>
        <div>
          <label htmlFor="blood_pressure" className="block text-sm font-medium">
            Blood Pressure (e.g., 120/80)
          </label>
          <input
            type="text"
            id="blood_pressure"
            name="blood_pressure"
            className="mt-1 block w-full p-2 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-neutral-800"
          />
        </div>
        <div>
          <label htmlFor="sleep_hours" className="block text-sm font-medium">
            Sleep (hours)
          </label>
          <input
            type="number"
            id="sleep_hours"
            name="sleep_hours"
            step="0.5"
            className="mt-1 block w-full p-2 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-neutral-800"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full bg-primary p-3 rounded-md hover:bg-primary-dark transition-colors"
      >
        Save Metric
      </button>
    </form>
  );
}

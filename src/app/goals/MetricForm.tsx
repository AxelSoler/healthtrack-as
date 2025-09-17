"use client";

import { useActionState, useEffect, useRef } from "react";
import { useNotification } from "@/contexts/NotificationContext";
import { addWeight, addBloodPressure, addSleepHours } from "./actions";
import { SubmitButton } from "@/components/buttons/SubmitButton";

type FormAction = (
  prevState: unknown,
  formData: FormData
) => Promise<{ error?: string; success?: boolean }>;

function MetricFormSection({
  action,
  metricName,
  label,
  inputType,
  step,
  onSuccess,
}: {
  action: FormAction;
  metricName: string;
  label: string;
  inputType: string;
  step?: string;
  onSuccess?: () => void;
}) {
  const [state, formAction] = useActionState(action, null);
  const formRef = useRef<HTMLFormElement>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (state?.error) {
      showNotification(state.error, "error");
    } else if (state?.success) {
      showNotification("Metric saved successfully!", "success");
      formRef.current?.reset();
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [state, showNotification, onSuccess]);

  return (
    <details className="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-lg shadow-md w-full h-fit">
      <summary className="font-medium cursor-pointer">{label}</summary>
      <form ref={formRef} action={formAction} className="mt-4">
        <div className="space-y-4">
          <div>
            <label
              htmlFor={metricName}
              className="block text-sm font-medium sr-only"
            >
              {label}
            </label>
            <input
              type={inputType}
              id={metricName}
              name={metricName}
              step={step}
              className="mt-1 block w-full p-2 border border-neutral-300 dark:border-neutral-700 rounded-md dark:bg-neutral-800"
            />
          </div>
        </div>
        <SubmitButton className="mt-6 w-full bg-primary text-white p-3 rounded-md hover:bg-primary-dark transition-colors">
          Save
        </SubmitButton>
      </form>
    </details>
  );
}

export function MetricForm({ onSuccess }: { onSuccess?: () => void }) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Add latest metrics</h2>
      <div className="w-full flex flex-col md:flex-row gap-6">
        <MetricFormSection
          action={addWeight}
          metricName="weight"
          label="Weight (lbs)"
          inputType="number"
          step="0.1"
          onSuccess={onSuccess}
        />
        <MetricFormSection
          action={addBloodPressure}
          metricName="blood_pressure"
          label="Blood Pressure (e.g., 120/80)"
          inputType="text"
          onSuccess={onSuccess}
        />
        <MetricFormSection
          action={addSleepHours}
          metricName="sleep_hours"
          label="Sleep (hours)"
          inputType="number"
          step="0.5"
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}

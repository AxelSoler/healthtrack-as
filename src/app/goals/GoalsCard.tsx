import { Metric, Profile } from "@/types";

interface GoalsCardProps {
  metrics: Metric[];
  profile: Profile;
}

const GoalsCard = ({ metrics, profile }: GoalsCardProps) => {
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
    weightGoal > 0 ? Math.max(0, 100 - (poundsToGoal / weightGoal) * 100) : 0;
  return (
    <div className="w-full h-[150px] rounded-3xl bg-gradient-to-b from-pink-200 to-pink-100 shadow-md flex items-center justify-between md:justify-evenly p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-primary rounded-bl-full" />
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
  );
};

export default GoalsCard;

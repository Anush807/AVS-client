import { Award } from "lucide-react";

const Badge = ({ badge, points, size = "md" }) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const badgeColors = {
    Gold: "badge-gold",
    Silver: "badge-silver",
    Bronze: "badge-bronze",
    None: "badge-none",
  };

  return (
    <div className="flex items-center space-x-2">
      <span
        className={`inline-flex items-center space-x-1 ${sizeClasses[size]} ${
          badgeColors[badge] || badgeColors.None
        } font-semibold rounded-full`}
      >
        <Award className="h-4 w-4" />
        <span>{badge}</span>
      </span>
      <span className="text-sm text-gray-600">{points} pts</span>
    </div>
  );
};

export default Badge;

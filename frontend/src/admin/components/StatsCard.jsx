import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

/**
 * StatsCard Component
 * Reusable card component for displaying statistics with trend indicators
 * 
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string|number} props.value - Main value to display
 * @param {string} props.change - Change percentage/value
 * @param {string} props.trend - 'up' or 'down'
 * @param {React.Component} props.icon - Icon component
 * @param {string} props.color - Color theme: 'blue', 'green', 'yellow', 'red', 'purple'
 * @param {string} props.description - Optional description text
 */
const StatsCard = ({
  title,
  value,
  change,
  trend = "up",
  icon: Icon,
  color = "blue",
  description = "from last month",
}) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-500",
      text: "text-blue-600 dark:text-blue-400",
      bgLight: "bg-blue-100 dark:bg-blue-900/20",
    },
    green: {
      bg: "bg-green-500",
      text: "text-green-600 dark:text-green-400",
      bgLight: "bg-green-100 dark:bg-green-900/20",
    },
    yellow: {
      bg: "bg-yellow-500",
      text: "text-yellow-600 dark:text-yellow-400",
      bgLight: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    red: {
      bg: "bg-red-500",
      text: "text-red-600 dark:text-red-400",
      bgLight: "bg-red-100 dark:bg-red-900/20",
    },
    purple: {
      bg: "bg-purple-500",
      text: "text-purple-600 dark:text-purple-400",
      bgLight: "bg-purple-100 dark:bg-purple-900/20",
    },
  };

  const colors = colorClasses[color] || colorClasses.blue;
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  const trendColor =
    trend === "up"
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";

  return (
    <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change && (
            <div className="flex items-center mt-2">
              <TrendIcon className={`w-4 h-4 ${trendColor}`} />
              <span className={`ml-1 text-sm font-medium ${trendColor}`}>
                {change}
              </span>
              {description && (
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  {description}
                </span>
              )}
            </div>
          )}
        </div>
        {Icon && (
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full ${colors.bgLight}`}
          >
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;

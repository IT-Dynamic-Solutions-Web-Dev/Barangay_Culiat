import React from "react";
import { AlertCircle, CheckCircle, Info, XCircle, X } from "lucide-react";

/**
 * Alert Component
 * Reusable alert/notification component
 * 
 * @param {Object} props
 * @param {string} props.type - Alert type: 'success', 'error', 'warning', 'info'
 * @param {string} props.title - Alert title
 * @param {string} props.message - Alert message
 * @param {Function} props.onClose - Close handler (optional)
 * @param {boolean} props.dismissible - Whether alert can be dismissed
 */
const Alert = ({ type = "info", title, message, onClose, dismissible = true }) => {
  const types = {
    success: {
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      text: "text-green-800 dark:text-green-300",
      icon: CheckCircle,
      iconColor: "text-green-600 dark:text-green-400",
    },
    error: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      text: "text-red-800 dark:text-red-300",
      icon: XCircle,
      iconColor: "text-red-600 dark:text-red-400",
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-200 dark:border-yellow-800",
      text: "text-yellow-800 dark:text-yellow-300",
      icon: AlertCircle,
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-800 dark:text-blue-300",
      icon: Info,
      iconColor: "text-blue-600 dark:text-blue-400",
    },
  };

  const config = types[type] || types.info;
  const Icon = config.icon;

  return (
    <div
      className={`flex items-start p-4 border rounded-lg ${config.bg} ${config.border}`}
      role="alert"
    >
      <Icon className={`flex-shrink-0 w-5 h-5 ${config.iconColor} mt-0.5`} />
      <div className="flex-1 ml-3">
        {title && (
          <h3 className={`text-sm font-semibold ${config.text} mb-1`}>
            {title}
          </h3>
        )}
        {message && <p className={`text-sm ${config.text}`}>{message}</p>}
      </div>
      {dismissible && onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 ml-3 p-1 rounded-lg ${config.text} hover:bg-black/5 dark:hover:bg-white/5 transition-colors`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;

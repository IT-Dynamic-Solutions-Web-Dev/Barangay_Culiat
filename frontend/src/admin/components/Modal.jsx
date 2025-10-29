import React from "react";

/**
 * Modal Component
 * Reusable modal dialog component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal open state
 * @param {Function} props.onClose - Close handler
 * @param {string} props.title - Modal title
 * @param {React.Node} props.children - Modal content
 * @param {string} props.size - Modal size: 'sm', 'md', 'lg', 'xl'
 * @param {React.Node} props.footer - Optional footer content
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  footer,
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        className={`w-full ${sizeClasses[size]} bg-white rounded-lg shadow-xl dark:bg-gray-800 max-h-[90vh] flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 transition-colors rounded-lg hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

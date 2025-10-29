import React from "react";
import { Settings as SettingsIcon, Save } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your barangay system settings
          </p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <nav className="space-y-1">
              {[
                "General",
                "Security",
                "Notifications",
                "Appearance",
                "Integrations",
              ].map((item) => (
                <button
                  key={item}
                  className="flex items-center w-full px-4 py-2 text-sm font-medium text-left text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2">
          <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              General Settings
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Barangay Name
                </label>
                <input
                  type="text"
                  defaultValue="Barangay Culiat"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  defaultValue="contact@barangayculiat.gov.ph"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  defaultValue="+63 123 456 7890"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <textarea
                  rows={3}
                  defaultValue="Barangay Culiat, Quezon City, Metro Manila"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

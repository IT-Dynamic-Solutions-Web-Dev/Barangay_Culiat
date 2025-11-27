import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Settings as SettingsIcon,
  Save,
  Building,
  Phone,
  Mail,
  MapPin,
  Globe,
  Palette,
  Shield,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useNotifications } from "../../../hooks/useNotifications";

const SettingsPage = () => {
  const { showSuccess, showError, showPromise } = useNotifications();
  const [activeTab, setActiveTab] = useState("site-info");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    siteInfo: {},
    contactInfo: {},
    socialMedia: {},
    theme: {},
    emailTemplates: { welcomeEmail: {}, documentReady: {} },
    system: {},
  });
  const [hasChanges, setHasChanges] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data.data;
      setSettings(data);
      // Merge with existing formData structure to ensure all fields exist
      setFormData({
        siteInfo: data.siteInfo || {},
        contactInfo: data.contactInfo || {},
        socialMedia: data.socialMedia || {},
        theme: data.theme || {},
        emailTemplates: data.emailTemplates || { welcomeEmail: {}, documentReady: {} },
        system: data.system || {},
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
      showError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSave = async (section = null) => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      
      const dataToSave = section ? { [section]: formData[section] } : formData;
      const endpoint = section ? `${API_URL}/api/settings/${section}` : `${API_URL}/api/settings`;
      
      const promise = axios.put(endpoint, dataToSave, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await showPromise(promise, {
        loading: "Saving settings...",
        success: "Settings saved successfully!",
        error: "Failed to save settings",
      });

      await fetchSettings();
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(settings);
    setHasChanges(false);
    showSuccess("Changes discarded");
  };

  const tabs = [
    { id: "site-info", label: "Site Information", icon: Building },
    { id: "contactInfo", label: "Contact Info", icon: Phone },
    { id: "socialMedia", label: "Social Media", icon: Globe },
    { id: "theme", label: "Theme", icon: Palette },
    { id: "emailTemplates", label: "Email Templates", icon: Mail },
    { id: "system", label: "System Settings", icon: Shield },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-blue-600" />
            System Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Configure your barangay management system
          </p>
        </div>
        
        {hasChanges && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4 inline mr-2" />
              Discard Changes
            </button>
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4 inline mr-2" />
              {saving ? "Saving..." : "Save All Changes"}
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-4 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {/* Site Information */}
        {activeTab === "site-info" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Building className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Site Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Barangay Name *
                </label>
                <input
                  type="text"
                  value={formData.siteInfo.barangayName || ""}
                  onChange={(e) => handleInputChange("siteInfo", "barangayName", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.siteInfo.city || ""}
                  onChange={(e) => handleInputChange("siteInfo", "city", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Province *
                </label>
                <input
                  type="text"
                  value={formData.siteInfo.province || ""}
                  onChange={(e) => handleInputChange("siteInfo", "province", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.siteInfo.tagline || ""}
                  onChange={(e) => handleInputChange("siteInfo", "tagline", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Your barangay's tagline"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.siteInfo.description || ""}
                  onChange={(e) => handleInputChange("siteInfo", "description", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Brief description of your barangay"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t dark:border-gray-700">
              <button
                onClick={() => handleSave("site-info")}
                disabled={saving}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Save Site Info
              </button>
            </div>
          </div>
        )}

        {/* Contact Information */}
        {activeTab === "contactInfo" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Phone className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Office Address
                </label>
                <textarea
                  rows={2}
                  value={formData.contactInfo.officeAddress || ""}
                  onChange={(e) => handleInputChange("contactInfo", "officeAddress", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Complete office address"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.contactInfo.phoneNumber || ""}
                  onChange={(e) => handleInputChange("contactInfo", "phoneNumber", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="+63 123 456 7890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={formData.contactInfo.mobileNumber || ""}
                  onChange={(e) => handleInputChange("contactInfo", "mobileNumber", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="+63 987 654 3210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.contactInfo.emailAddress || ""}
                  onChange={(e) => handleInputChange("contactInfo", "emailAddress", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="contact@barangay.gov.ph"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Office Hours
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.officeHours || ""}
                  onChange={(e) => handleInputChange("contactInfo", "officeHours", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Monday - Friday, 8:00 AM - 5:00 PM"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t dark:border-gray-700">
              <button
                onClick={() => handleSave("contact-info")}
                disabled={saving}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Save Contact Info
              </button>
            </div>
          </div>
        )}

        {/* Social Media */}
        {activeTab === "socialMedia" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Social Media Links
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="text-blue-600">📘</span> Facebook
                </label>
                <input
                  type="url"
                  value={formData.socialMedia.facebook || ""}
                  onChange={(e) => handleInputChange("socialMedia", "facebook", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="https://facebook.com/your-page"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="text-sky-500">🐦</span> Twitter
                </label>
                <input
                  type="url"
                  value={formData.socialMedia.twitter || ""}
                  onChange={(e) => handleInputChange("socialMedia", "twitter", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="https://twitter.com/your-handle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="text-pink-600">📷</span> Instagram
                </label>
                <input
                  type="url"
                  value={formData.socialMedia.instagram || ""}
                  onChange={(e) => handleInputChange("socialMedia", "instagram", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="https://instagram.com/your-account"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <span className="text-red-600">📺</span> YouTube
                </label>
                <input
                  type="url"
                  value={formData.socialMedia.youtube || ""}
                  onChange={(e) => handleInputChange("socialMedia", "youtube", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="https://youtube.com/your-channel"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t dark:border-gray-700">
              <button
                onClick={() => handleSave("social-media")}
                disabled={saving}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Save Social Media
              </button>
            </div>
          </div>
        )}

        {/* Theme Settings */}
        {activeTab === "theme" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Theme Settings
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.theme.primaryColor || "#3B82F6"}
                    onChange={(e) => handleInputChange("theme", "primaryColor", e.target.value)}
                    className="h-10 w-20 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.theme.primaryColor || "#3B82F6"}
                    onChange={(e) => handleInputChange("theme", "primaryColor", e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.theme.secondaryColor || "#8B5CF6"}
                    onChange={(e) => handleInputChange("theme", "secondaryColor", e.target.value)}
                    className="h-10 w-20 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.theme.secondaryColor || "#8B5CF6"}
                    onChange={(e) => handleInputChange("theme", "secondaryColor", e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Accent Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.theme.accentColor || "#10B981"}
                    onChange={(e) => handleInputChange("theme", "accentColor", e.target.value)}
                    className="h-10 w-20 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.theme.accentColor || "#10B981"}
                    onChange={(e) => handleInputChange("theme", "accentColor", e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-300 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>
                  Theme colors will be applied system-wide. Changes may require a page refresh to take full effect.
                </span>
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t dark:border-gray-700">
              <button
                onClick={() => handleSave("theme")}
                disabled={saving}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Save Theme
              </button>
            </div>
          </div>
        )}

        {/* Email Templates - Placeholder for now */}
        {activeTab === "emailTemplates" && (
          <div className="text-center py-12">
            <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Email Templates
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Configure email templates for various system notifications
            </p>
          </div>
        )}

        {/* System Settings */}
        {activeTab === "system" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                System Settings
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">User Registration</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Allow new user registrations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.system.registrationEnabled || false}
                    onChange={(e) => handleInputChange("system", "registrationEnabled", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Document Requests</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Enable document request submissions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.system.documentRequestEnabled || false}
                    onChange={(e) => handleInputChange("system", "documentRequestEnabled", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Report Submissions</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Allow residents to submit reports</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.system.reportingEnabled || false}
                    onChange={(e) => handleInputChange("system", "reportingEnabled", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t dark:border-gray-700">
              <button
                onClick={() => handleSave()}
                disabled={saving}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Save System Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;

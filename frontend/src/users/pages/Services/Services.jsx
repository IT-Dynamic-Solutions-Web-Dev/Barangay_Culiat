import React, { useState } from "react";
import PersonalInfoTab from "./components/PersonalInfoTab";
import EmergencyContactTab from "./components/EmergencyContactTab";
import DocumentRequestTab from "./components/DocumentRequestTab";
import { CheckCircle } from "lucide-react";

const tabs = [
  { id: "personal", label: "Personal Information" },
  { id: "emergency", label: "Emergency Contact" },
  { id: "request", label: "Document Request" },
];

const initialForm = {
  // Personal
  lastName: "",
  firstName: "",
  middleName: "",
  dob: "",
  pob: "",
  gender: "",
  civilStatus: "",
  nationality: "",
  address: "",
  contactNumber: "",
  pictureFile: null, // File object
  // Emergency
  emergencyName: "",
  emergencyRelationship: "",
  emergencyContact: "",
  emergencyAddress: "",
  // Request
  documentType: "",
  purpose: "",
  preferredPickupDate: "",
  remarks: "",
};

export default function Services() {
  const [active, setActive] = useState("personal");
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const setField = (name, value) =>
    setFormData((p) => ({ ...p, [name]: value }));

  const validateAll = () => {
    const e = {};
    // Minimal required fields (you can expand)
    if (!formData.lastName.trim()) e.lastName = "Last Name is required";
    if (!formData.firstName.trim()) e.firstName = "First name is required";
    if (!formData.dob) e.dob = "Date of birth is required";
    if (!formData.documentType) e.documentType = "Select a document type";
    if (!formData.purpose.trim()) e.purpose = "Purpose is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) {
      // go to first error tab
      if (errors.lastName || errors.firstName || errors.dob)
        setActive("personal");
      else if (errors.emergencyName || errors.emergencyContact)
        setActive("emergency");
      else setActive("request");
      return;
    }

    // Mock submit: show success toast
    setShowSuccess(true);
    // reset form (optional)
    // setFormData(initialForm);

    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div
      className="min-h-screen mt-6 py-[5em]"
      style={{ backgroundColor: "var(--color-neutral)" }}
    >
      {/* Page Header */}
      <div
        className="max-w-6xl mx-auto rounded-lg overflow-hidden mb-6"
        style={{
          background:
            "linear-gradient(90deg,var(--color-secondary), var(--color-secondary-glow))",
          color: "var(--color-text-color-light)",
        }}
      >
        <div className="px-6 py-8">
          <h1 className="text-2xl md:text-3xl font-bold">Barangay Services</h1>
          <p className="mt-1 text-sm opacity-90">
            Request your official barangay documents online quickly and
            securely.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Success Toast */}
        {showSuccess && (
          <div className="mb-4">
            <div
              className="flex items-start bg-[var(--color-light)] border-l-4"
              style={{ borderColor: "var(--color-primary)" }}
            >
              <div className="p-4 flex items-center">
                <CheckCircle
                  className="text-[var(--color-primary)]"
                  size={24}
                />
              </div>
              <div className="px-4 py-3">
                <p className="font-semibold text-[var(--color-text-color)]">
                  Request Submitted Successfully!
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Your request was received. We'll email a confirmation shortly.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Card */}
        <div className="bg-[var(--color-light)] rounded-lg shadow-md border border-[var(--color-neutral-active)] ">
          {/* Tabs */}
          <div className="px-2 md:px-6 py-4 border-b border-[var(--color-neutral-active)] flex ">
            <nav
              className="flex gap-2 w-full"
              role="tablist"
              aria-label="Form tabs"
            >
              {tabs.map((t) => {
                const activeStyle =
                  active === t.id
                    ? {
                        background: "var(--color-accent)",
                        color: "var(--color-text-color)",
                      }
                    : {};
                return (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className={`md:px-4 md:py-2 px-2 py-1 grow md:grow-0 rounded-md md:font-medium font-semibold whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer  transition-all`}
                    title={t.label}
                    style={{
                      border:
                        active === t.id
                          ? "2px solid var(--color-secondary)"
                          : "1px solid transparent",
                      ...activeStyle,
                    }}
                    role="tab"
                    aria-selected={active === t.id}
                  >
                    {t.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              {active === "personal" && (
                <PersonalInfoTab
                  formData={formData}
                  setField={setField}
                  errors={errors}
                  setErrors={setErrors}
                />
              )}

              {active === "emergency" && (
                <EmergencyContactTab
                  formData={formData}
                  setField={setField}
                  errors={errors}
                />
              )}

              {active === "request" && (
                <DocumentRequestTab
                  formData={formData}
                  setField={setField}
                  errors={errors}
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="px-6 py-4 border-t border-[var(--color-neutral-active)] flex justify-between items-center">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    if (active === "emergency") setActive("personal");
                    else if (active === "request") setActive("emergency");
                  }}
                  className="px-4 py-2 rounded-md font-medium border"
                >
                  Back
                </button>
              </div>

              <div className="flex items-center gap-3">
                {active !== "request" && (
                  <button
                    type="button"
                    onClick={() => {
                      if (active === "personal") setActive("emergency");
                      else if (active === "emergency") setActive("request");
                    }}
                    className="px-4 py-2 rounded-md font-medium"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      color: "var(--color-text-color-light)",
                    }}
                  >
                    Next
                  </button>
                )}

                {active === "request" && (
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-md font-semibold"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      color: "var(--color-light)",
                      boxShadow: `0 6px 18px -6px ${"var(--color-secondary-glow)"}`,
                    }}
                  >
                    Submit Request
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* small help block */}
        <div className="px-2 sm:p-0 text-center sm:text-left mt-4 text-sm text-[var(--color-text-secondary)]">
          By submitting, you agree to our terms and privacy policy. Processing
          usually takes 3–5 business days.
        </div>
      </div>
    </div>
  );
}

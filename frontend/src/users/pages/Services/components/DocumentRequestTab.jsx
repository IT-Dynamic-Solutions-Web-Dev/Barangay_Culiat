import React from "react";
import { FileText, Building, Calendar } from "lucide-react";

const DOCUMENT_TYPES = [
  { value: "indigency", label: "Certificate of Indigency" },
  { value: "residency", label: "Certificate of Residency" },
  { value: "clearance", label: "Barangay Clearance" },
  { value: "ctc", label: "Community Tax Certificate" },
  { value: "business_clearance", label: "Business Clearance" },
];

export default function DocumentRequestTab({ formData, setField, errors, isBusinessDocument }) {
  const onChange = (e) => setField(e.target.name, e.target.value);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-medium">Document Request</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Select the document you need and provide necessary details
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text-color)]">
          Document Type <span className="text-red-500">*</span>
        </label>
        <select
          name="documentType"
          value={formData.documentType}
          onChange={onChange}
          className={`mt-1 block w-full rounded-md border px-3 py-2 outline-none transition ${
            errors.documentType
              ? "border-red-500"
              : "border-[var(--color-neutral-active)]"
          }`}
        >
          <option value="">Select a document type</option>
          {DOCUMENT_TYPES.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        {errors.documentType && (
          <p className="text-xs text-red-500 mt-1">{errors.documentType}</p>
        )}
      </div>

      {/* Business Information Section - Only show for business documents */}
      {isBusinessDocument && (
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-4">
            <Building className="text-[var(--color-secondary)]" size={20} />
            <h2 className="text-lg font-medium">Business Information</h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-color)]">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="businessName"
                  value={formData.businessName}
                  onChange={onChange}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 outline-none transition ${
                    errors.businessName
                      ? "border-red-500"
                      : "border-[var(--color-neutral-active)]"
                  }`}
                  placeholder="e.g., Juan's Sari-Sari Store"
                />
                {errors.businessName && (
                  <p className="text-xs text-red-500 mt-1">{errors.businessName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-color)]">
                  Nature of Business <span className="text-red-500">*</span>
                </label>
                <input
                  name="natureOfBusiness"
                  value={formData.natureOfBusiness}
                  onChange={onChange}
                  className={`mt-1 block w-full rounded-md border px-3 py-2 outline-none transition ${
                    errors.natureOfBusiness
                      ? "border-red-500"
                      : "border-[var(--color-neutral-active)]"
                  }`}
                  placeholder="e.g., Retail Store, Food Business"
                />
                {errors.natureOfBusiness && (
                  <p className="text-xs text-red-500 mt-1">{errors.natureOfBusiness}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-color)] mb-2">
                Business Address
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  name="businessHouseNumber"
                  value={formData.businessHouseNumber}
                  onChange={onChange}
                  className="block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
                  placeholder="Unit/House No."
                />
                <input
                  name="businessStreet"
                  value={formData.businessStreet}
                  onChange={onChange}
                  className="block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
                  placeholder="Street"
                />
                <input
                  name="businessSubdivision"
                  value={formData.businessSubdivision}
                  onChange={onChange}
                  className="block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
                  placeholder="Subdivision/Area"
                />
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                Barangay Culiat, Quezon City, Metro Manila, 1128, Philippines
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-color)]">
                  Application Type
                </label>
                <select
                  name="applicationType"
                  value={formData.applicationType}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
                >
                  <option value="">Select type</option>
                  <option value="new">New Application</option>
                  <option value="renewal">Renewal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-color)]">
                  Owner/Representative Name
                </label>
                <input
                  name="ownerRepresentative"
                  value={formData.ownerRepresentative}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
                  placeholder="Full name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-color)]">
                  Owner Contact Number
                </label>
                <input
                  name="ownerContactNumber"
                  value={formData.ownerContactNumber}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
                  placeholder="09XX XXX XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text-color)]">
                  Representative Contact Number
                </label>
                <input
                  name="representativeContactNumber"
                  value={formData.representativeContactNumber}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
                  placeholder="09XX XXX XXXX"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Details */}
      <div className="border-t pt-4">
        <h2 className="text-lg font-medium mb-3">Request Details</h2>
        
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Purpose of Request <span className="text-red-500">*</span>
          </label>
          <textarea
            name="purposeOfRequest"
            value={formData.purposeOfRequest}
            onChange={onChange}
            rows={4}
            className={`mt-1 block w-full rounded-md border px-3 py-2 outline-none transition ${
              errors.purposeOfRequest
                ? "border-red-500"
                : "border-[var(--color-neutral-active)]"
            }`}
            placeholder="Please specify the purpose of your request..."
          />
          {errors.purposeOfRequest && (
            <p className="text-xs text-red-500 mt-1">{errors.purposeOfRequest}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Preferred Date of Pickup
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="date"
                id="preferredPickupDate"
                name="preferredPickupDate"
                value={formData.preferredPickupDate}
                onChange={onChange}
                className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-color)]">
              Remarks (optional)
            </label>
            <input
              name="remarks"
              value={formData.remarks}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
              placeholder="Any additional notes..."
            />
          </div>
        </div>
      </div>

      <div className="pt-2 text-sm text-[var(--color-text-secondary)] flex items-center gap-2">
        <FileText size={16} className="text-[var(--color-secondary)]" />
        <span>Please review all information before submitting your request.</span>
      </div>
    </div>
  );
}

import React from "react";
import { FileText } from "lucide-react";
import DatePicker from "../../../tailadminsrc/components/form/date-picker";

const DOCUMENT_TYPES = [
  "Certificate of Indigency",
  "Certificate of Residency",
  "Barangay Clearance",
  "Community Tax Certificate",
  "Business Permit",
  "Building Permit",
  "Certificate of Good Moral",
];

export default function DocumentRequestTab({ formData, setField, errors }) {
  const onChange = (e) => setField(e.target.name, e.target.value);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium">Document Request</h1>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text-color)]">
          Document Type
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
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        {errors.documentType && (
          <p className="text-xs text-red-500 mt-1">{errors.documentType}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text-color)]">
          Purpose of Request
        </label>
        <textarea
          name="purpose"
          value={formData.purpose}
          onChange={onChange}
          rows={4}
          className={`mt-1 block w-full rounded-md border px-3 py-2 outline-none transition ${
            errors.purpose
              ? "border-red-500"
              : "border-[var(--color-neutral-active)]"
          }`}
          placeholder="Please specify the purpose of your request..."
        />
        {errors.purpose && (
          <p className="text-xs text-red-500 mt-1">{errors.purpose}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Preferred Date of Pickup
          </label>

          <DatePicker
            id="preferredPickupDate"
            name="preferredPickupDate"
            placeholder="Select a date"
            onChange={onChange}
            variant="preferDate"
            className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
          />
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

      <div className="pt-2 text-sm text-[var(--color-text-secondary)] flex items-center gap-2">
        <FileText size={16} className="text-[var(--color-secondary)]" />
        <span>Make sure all information is correct before submitting.</span>
      </div>
    </div>
  );
}

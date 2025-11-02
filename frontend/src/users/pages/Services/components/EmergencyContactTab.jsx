import React from "react";
import { Phone, User } from "lucide-react";

export default function EmergencyContactTab({ formData, setField, errors }) {
  const onChange = (e) => setField(e.target.name, e.target.value);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-medium">Emergency Contact</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Fields marked with <span className="text-red-500">*</span> are auto-filled from your profile
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text-color)]">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-3 top-3 pointer-events-none">
            <User size={14} className="text-[var(--color-neutral-dark)]" />
          </div>
          <input
            name="emergencyName"
            value={formData.emergencyName}
            onChange={onChange}
            className={`mt-1 block w-full rounded-md border pl-10 px-3 py-2 outline-none transition ${
              errors.emergencyName
                ? "border-red-500"
                : "border-[var(--color-neutral-active)]"
            }`}
            placeholder="Maria Santos"
            readOnly
            style={{ backgroundColor: 'var(--color-neutral)' }}
          />
          {errors.emergencyName && (
            <p className="text-xs text-red-500 mt-1">{errors.emergencyName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Relationship <span className="text-red-500">*</span>
          </label>
          <input
            name="emergencyRelationship"
            value={formData.emergencyRelationship}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
            placeholder="Mother/Father/Spouse/Sibling"
            readOnly
            style={{ backgroundColor: 'var(--color-neutral)' }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-3 pointer-events-none">
              <Phone size={14} className="text-[var(--color-neutral-dark)]" />
            </div>
            <input
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={onChange}
              className={`mt-1 block w-full rounded-md border pl-10 px-3 py-2 outline-none transition ${
                errors.emergencyContact
                  ? "border-red-500"
                  : "border-[var(--color-neutral-active)]"
              }`}
              placeholder="09XX XXX XXXX"
              readOnly
              style={{ backgroundColor: 'var(--color-neutral)' }}
            />
            {errors.emergencyContact && (
              <p className="text-xs text-red-500 mt-1">{errors.emergencyContact}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text-color)] mb-2">
          Address <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            name="emergencyHouseNumber"
            value={formData.emergencyHouseNumber}
            onChange={onChange}
            className="block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
            placeholder="House No."
            readOnly
            style={{ backgroundColor: 'var(--color-neutral)' }}
          />
          <input
            name="emergencyStreet"
            value={formData.emergencyStreet}
            onChange={onChange}
            className="block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
            placeholder="Street"
            readOnly
            style={{ backgroundColor: 'var(--color-neutral)' }}
          />
          <input
            name="emergencySubdivision"
            value={formData.emergencySubdivision}
            onChange={onChange}
            className="block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
            placeholder="Subdivision/Purok"
            readOnly
            style={{ backgroundColor: 'var(--color-neutral)' }}
          />
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1">
          Barangay Culiat, Quezon City, Metro Manila, 1128, Philippines
        </p>
      </div>
    </div>
  );
}

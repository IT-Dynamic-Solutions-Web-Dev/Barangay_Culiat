import React from "react";
import { Phone, Home } from "lucide-react";

export default function EmergencyContactTab({ formData, setField }) {
  const onChange = (e) => setField(e.target.name, e.target.value);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium">Emergency Contact</h1>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text-color)]">
          Full Name
        </label>
        <input
          name="emergencyName"
          value={formData.emergencyName}
          onChange={onChange}
          className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
          placeholder="Maria Santos"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Relationship
          </label>
          <input
            name="emergencyRelationship"
            value={formData.emergencyRelationship}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
            placeholder="Mother/Father/Spouse"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Contact Number
          </label>
          <div className="relative">
            <div className="absolute left-3 top-3 pointer-events-none">
              <Phone size={14} className="text-[var(--color-neutral-dark)]" />
            </div>
            <input
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border pl-10 px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
              placeholder="09XX XXX XXXX"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text-color)]">
          Address
        </label>
        <div className="relative">
          <div className="absolute left-3 top-3 pointer-events-none">
            <Home size={14} className="text-[var(--color-neutral-dark)]" />
          </div>
          <input
            name="emergencyAddress"
            value={formData.emergencyAddress}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border pl-10 px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
            placeholder="Address of emergency contact"
          />
        </div>
      </div>
    </div>
  );
}

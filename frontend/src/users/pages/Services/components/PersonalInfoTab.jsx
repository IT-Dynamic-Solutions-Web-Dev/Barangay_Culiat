import React from "react";
import DatePicker from "../../../../tailadminsrc/components/form/date-picker";

export default function PersonalInfoTab({ formData, setField, errors, setErrors }) {
  const onChange = (e) => {
    const { name, value } = e.target;
    setField(name, value);
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-medium">Personal Information</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Fields marked with <span className="text-red-500">*</span> are auto-filled from your profile
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            className={`mt-1 block w-full rounded-md border px-3 py-2 outline-none transition ${
              errors.lastName ? "border-red-500" : "border-[var(--color-neutral-active)]"
            }`}
            placeholder="Dela Cruz"
            readOnly
            style={{ backgroundColor: 'var(--color-neutral)' }}
          />
          {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            className={`mt-1 block w-full rounded-md border px-3 py-2 outline-none transition ${
              errors.firstName ? "border-red-500" : "border-[var(--color-neutral-active)]"
            }`}
            placeholder="Juan"
            readOnly
            style={{ backgroundColor: 'var(--color-neutral)' }}
          />
          {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Middle Name
          </label>
          <input
            name="middleName"
            value={formData.middleName}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
            placeholder="Santos"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Qualifier
          </label>
          <input
            name="qualifier"
            value={formData.qualifier || ""}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
            placeholder="Jr."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text-color)] mb-2">
          Address <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            name="houseNumber"
            value={formData.houseNumber}
            onChange={onChange}
            className="block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
            placeholder="House No."
            readOnly
            style={{ backgroundColor: 'var(--color-neutral)' }}
          />
          <input
            name="street"
            value={formData.street}
            onChange={onChange}
            className="block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
            placeholder="Street"
            readOnly
            style={{ backgroundColor: 'var(--color-neutral)' }}
          />
          <input
            name="subdivision"
            value={formData.subdivision}
            onChange={onChange}
            className="block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
            placeholder="Subdivision"
            readOnly
            style={{ backgroundColor: 'var(--color-neutral)' }}
          />
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1">
          Barangay Culiat, Quezon City, Metro Manila, 1128, Philippines
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <DatePicker
            id="dateOfBirth"
            name="dateOfBirth"
            placeholder="Select date"
            value={formData.dateOfBirth}
            onChange={onChange}
            variant="dob"
            className={`mt-1 block w-full rounded-md border px-3 py-2 outline-none transition ${
              errors.dateOfBirth ? "border-red-500" : "border-[var(--color-neutral-active)]"
            }`}
          />
          {errors.dateOfBirth && <p className="text-xs text-red-500 mt-1">{errors.dateOfBirth}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Place of Birth
          </label>
          <input
            name="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
            placeholder="Quezon City"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={onChange}
            className={`mt-1 block w-full rounded-md border px-3 py-2 outline-none transition ${
              errors.gender ? "border-red-500" : "border-[var(--color-neutral-active)]"
            }`}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Civil Status
          </label>
          <select
            name="civilStatus"
            value={formData.civilStatus}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
          >
            <option value="">Select</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="widowed">Widowed</option>
            <option value="separated">Separated</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Nationality
          </label>
          <input
            name="nationality"
            value={formData.nationality}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
            placeholder="Filipino"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            name="contactNumber"
            value={formData.contactNumber}
            onChange={onChange}
            className={`mt-1 block w-full rounded-md border px-3 py-2 outline-none transition ${
              errors.contactNumber ? "border-red-500" : "border-[var(--color-neutral-active)]"
            }`}
            placeholder="09XX XXX XXXX"
            readOnly
            style={{ backgroundColor: 'var(--color-neutral)' }}
          />
          {errors.contactNumber && <p className="text-xs text-red-500 mt-1">{errors.contactNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Email Address
          </label>
          <input
            name="emailAddress"
            type="email"
            value={formData.emailAddress}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
            placeholder="email@example.com"
            readOnly
            style={{ backgroundColor: 'var(--color-neutral)' }}
          />
        </div>
      </div>
    </div>
  );
}

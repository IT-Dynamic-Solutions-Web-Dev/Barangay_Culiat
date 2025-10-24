import React, { useRef, useEffect, useState } from "react";
import { User, MapPin, Phone, Home } from "lucide-react";
import DatePicker from "../../../../tailadminsrc/components/form/date-picker";

export default function PersonalInfoTab({
  formData,
  setField,
  errors,
  setErrors,
}) {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(
    formData.pictureFile ? URL.createObjectURL(formData.pictureFile) : null
  );

  useEffect(() => {
    return () => {
      // revoke preview object when unmount
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onFile = (e) => {
    const file = e.target.files?.[0] ?? null;
    setField("pictureFile", file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setField(name, value);
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left: form fields */}
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-xl font-medium">Personal Information</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-color)]">
              Last Name
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={onChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 outline-none transition ${
                errors.lastName
                  ? "border-red-500"
                  : "border-[var(--color-neutral-active)]"
              }`}
              placeholder="Dela Cruz"
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-color)]">
              First Name
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={onChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 outline-none transition ${
                errors.firstName
                  ? "border-red-500"
                  : "border-[var(--color-neutral-active)]"
              }`}
              placeholder="Juan"
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
            )}
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-[var(--color-text-color)]">
              Date of Birth
            </label>
            {/* <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={onChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 outline-none transition ${
                errors.dob
                  ? "border-red-500"
                  : "border-[var(--color-neutral-active)]"
              }`}
            /> */}
            <DatePicker
              id="dob"
              placeholder="Select a date"
              value={formData.dob}
              onChange={onChange}
              variant="dob"
              className={`mt-1 block w-full rounded-md border px-3 py-2 outline-none transition ${
                errors.dob
                  ? "border-red-500"
                  : "border-[var(--color-neutral-active)]"
              }`}
            />
            {errors.dob && (
              <p className="text-xs text-red-500 mt-1">{errors.dob}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-color)]">
              Place of Birth
            </label>
            <input
              name="pob"
              value={formData.pob}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
              placeholder="Quezon City"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-color)]">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </select>
          </div>
        </div>

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
            <option>Single</option>
            <option>Married</option>
            <option>Widowed</option>
            <option>Separated</option>
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
            Address
          </label>
          <div className="relative">
            <div className="absolute left-3 top-3 pointer-events-none">
              <MapPin size={16} className="text-[var(--color-neutral-dark)]" />
            </div>
            <input
              name="address"
              value={formData.address}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border pl-10 px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
              placeholder="House no., Street, Barangay Culiat, Quezon City"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Contact Number
          </label>
          <div className="relative">
            <div className="absolute left-3 top-3 pointer-events-none">
              <Phone size={16} className="text-[var(--color-neutral-dark)]" />
            </div>
            <input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border pl-10 px-3 py-2 outline-none transition border-[var(--color-neutral-active)]"
              placeholder="09XX XXX XXXX"
            />
          </div>
        </div>
      </div>

      {/* Right: picture upload */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-36 h-36 rounded-full bg-[var(--color-neutral)] overflow-hidden border border-[var(--color-neutral-active)] flex items-center justify-center">
          {preview ? (
            // circular preview
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center px-3">
              <User
                size={34}
                className="mx-auto text-[var(--color-neutral-dark)]"
              />
              <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                1x1 Picture
              </p>
            </div>
          )}
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-[var(--color-text-color)]">
            Upload 1x1 Picture
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onFile}
            className="mt-2 block w-full text-sm"
          />
          <p className="text-xs text-[var(--color-text-secondary)] mt-2">
            Preferred: square crop (1:1). Max 2MB.
          </p>
        </div>
      </div>
    </div>
  );
}

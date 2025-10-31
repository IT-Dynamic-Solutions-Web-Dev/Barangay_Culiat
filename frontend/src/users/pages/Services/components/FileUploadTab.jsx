import React, { useRef, useState, useEffect } from "react";
import { Upload, File, X, AlertCircle } from "lucide-react";

export default function FileUploadTab({ formData, setField, errors, documentType }) {
  const photo1x1Ref = useRef(null);
  const validIDRef = useRef(null);
  
  const [photo1x1Preview, setPhoto1x1Preview] = useState(null);
  const [validIDPreview, setValidIDPreview] = useState(null);

  useEffect(() => {
    return () => {
      if (photo1x1Preview) URL.revokeObjectURL(photo1x1Preview);
      if (validIDPreview) URL.revokeObjectURL(validIDPreview);
    };
  }, [photo1x1Preview, validIDPreview]);

  const handlePhoto1x1 = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert('Only JPG, JPEG, and PNG files are allowed');
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5242880) {
        alert('File size must not exceed 5MB');
        return;
      }
      setField("photo1x1File", file);
      const url = URL.createObjectURL(file);
      setPhoto1x1Preview(url);
    }
  };

  const handleValidID = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert('Only JPG, JPEG, and PNG files are allowed');
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5242880) {
        alert('File size must not exceed 5MB');
        return;
      }
      setField("validIDFile", file);
      const url = URL.createObjectURL(file);
      setValidIDPreview(url);
    }
  };

  const removePhoto1x1 = () => {
    setField("photo1x1File", null);
    setPhoto1x1Preview(null);
    if (photo1x1Ref.current) photo1x1Ref.current.value = "";
  };

  const removeValidID = () => {
    setField("validIDFile", null);
    setValidIDPreview(null);
    if (validIDRef.current) validIDRef.current.value = "";
  };

  const requiresPhoto = ['clearance', 'business_permit', 'business_clearance'].includes(documentType);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-medium">Upload Required Documents</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Please upload clear photos of your documents. Only JPG, JPEG, and PNG files are accepted (max 5MB).
        </p>
      </div>

      {/* Photo 1x1 Upload */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-color)] mb-2">
          1x1 Photo {requiresPhoto && <span className="text-red-500">*</span>}
        </label>
        {requiresPhoto && (
          <p className="text-xs text-[var(--color-text-secondary)] mb-2">
            Required for {documentType.replace('_', ' ')}
          </p>
        )}
        
        {!formData.photo1x1File ? (
          <div
            onClick={() => photo1x1Ref.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition hover:border-[var(--color-secondary)] ${
              errors.photo1x1File ? 'border-red-500' : 'border-[var(--color-neutral-active)]'
            }`}
          >
            <Upload className="mx-auto mb-3 text-[var(--color-neutral-dark)]" size={32} />
            <p className="text-sm text-[var(--color-text-color)] font-medium">
              Click to upload 1x1 photo
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              JPG, JPEG, PNG (max 5MB)
            </p>
            <input
              ref={photo1x1Ref}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handlePhoto1x1}
              className="hidden"
            />
          </div>
        ) : (
          <div className="border rounded-lg p-4 flex items-center justify-between bg-[var(--color-neutral)]">
            <div className="flex items-center gap-3">
              {photo1x1Preview ? (
                <img
                  src={photo1x1Preview}
                  alt="1x1 Photo Preview"
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <File className="text-[var(--color-secondary)]" size={32} />
              )}
              <div>
                <p className="text-sm font-medium text-[var(--color-text-color)]">
                  {formData.photo1x1File.name}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {(formData.photo1x1File.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removePhoto1x1}
              className="p-2 hover:bg-red-50 rounded-full transition"
            >
              <X size={18} className="text-red-500" />
            </button>
          </div>
        )}
        {errors.photo1x1File && (
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle size={12} />
            {errors.photo1x1File}
          </p>
        )}
      </div>

      {/* Valid ID Upload */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-text-color)] mb-2">
          Valid ID <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-[var(--color-text-secondary)] mb-2">
          Required for all document requests (e.g., Driver's License, Passport, National ID, etc.)
        </p>
        
        {!formData.validIDFile ? (
          <div
            onClick={() => validIDRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition hover:border-[var(--color-secondary)] ${
              errors.validIDFile ? 'border-red-500' : 'border-[var(--color-neutral-active)]'
            }`}
          >
            <Upload className="mx-auto mb-3 text-[var(--color-neutral-dark)]" size={32} />
            <p className="text-sm text-[var(--color-text-color)] font-medium">
              Click to upload valid ID
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              JPG, JPEG, PNG (max 5MB)
            </p>
            <input
              ref={validIDRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleValidID}
              className="hidden"
            />
          </div>
        ) : (
          <div className="border rounded-lg p-4 flex items-center justify-between bg-[var(--color-neutral)]">
            <div className="flex items-center gap-3">
              {validIDPreview ? (
                <img
                  src={validIDPreview}
                  alt="Valid ID Preview"
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <File className="text-[var(--color-secondary)]" size={32} />
              )}
              <div>
                <p className="text-sm font-medium text-[var(--color-text-color)]">
                  {formData.validIDFile.name}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {(formData.validIDFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeValidID}
              className="p-2 hover:bg-red-50 rounded-full transition"
            >
              <X size={18} className="text-red-500" />
            </button>
          </div>
        )}
        {errors.validIDFile && (
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle size={12} />
            {errors.validIDFile}
          </p>
        )}
      </div>

      <div className="pt-2 text-sm text-[var(--color-text-secondary)] flex items-start gap-2 bg-blue-50 p-3 rounded">
        <AlertCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium text-blue-700">Important Notes:</p>
          <ul className="list-disc list-inside text-xs mt-1 text-blue-600 space-y-1">
            <li>Make sure all documents are clear and readable</li>
            <li>Photos should be in color and not edited</li>
            <li>File names should not contain special characters</li>
            <li>Maximum file size is 5MB per document</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

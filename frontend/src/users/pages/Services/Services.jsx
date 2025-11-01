import React, { useState, useEffect } from "react";
import PersonalInfoTab from "./components/PersonalInfoTab";
import EmergencyContactTab from "./components/EmergencyContactTab";
import DocumentRequestTab from "./components/DocumentRequestTab";
import FileUploadTab from "./components/FileUploadTab";
import MyRequestsTab from "./components/MyRequestsTab";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const tabs = [
  { id: "personal", label: "Personal Information" },
  { id: "emergency", label: "Emergency Contact" },
  { id: "files", label: "Upload Documents" },
  { id: "request", label: "Document Request" },
  { id: "my-requests", label: "My Requests" },
];

const initialForm = {
  // Personal (will be auto-filled from user)
  lastName: "",
  firstName: "",
  middleName: "",
  suffix: "",
  dateOfBirth: "",
  placeOfBirth: "",
  gender: "",
  civilStatus: "",
  nationality: "",
  // Address (atomic structure)
  subdivision: "",
  street: "",
  houseNumber: "",
  contactNumber: "",
  // Additional fields from form
  tinNumber: "",
  sssGsisNumber: "",
  precinctNumber: "",
  religion: "",
  heightWeight: "",
  colorOfHairEyes: "",
  occupation: "",
  emailAddress: "",
  // Spouse info
  spouseName: "",
  spouseOccupation: "",
  spouseContact: "",
  // Emergency Contact
  emergencyName: "",
  emergencyRelationship: "",
  emergencyContact: "",
  emergencySubdivision: "",
  emergencyStreet: "",
  emergencyHouseNumber: "",
  // File uploads
  photo1x1File: null,
  validIDFile: null,
  // Business Info (only for business documents)
  businessName: "",
  businessSubdivision: "",
  businessStreet: "",
  businessHouseNumber: "",
  applicationType: "",
  natureOfBusiness: "",
  ownerRepresentative: "",
  ownerContactNumber: "",
  representativeContactNumber: "",
  // Request
  documentType: "",
  purposeOfRequest: "",
  preferredPickupDate: "",
  remarks: "",
};

export default function Services() {
  const [active, setActive] = useState("personal");
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoFilling, setAutoFilling] = useState(true);
  const [showLoadingToast, setShowLoadingToast] = useState(true); // Start with loading visible
  const [hasLoadedData, setHasLoadedData] = useState(false);
  const { user, loading: authLoading } = useAuth();

  // Load form data from localStorage on mount
  useEffect(() => {
    console.log('💾 Checking localStorage for saved form data...');
    const savedFormData = localStorage.getItem('documentRequestForm');
    
    if (savedFormData) {
      console.log('📦 Found saved form data in localStorage');
      try {
        const parsedData = JSON.parse(savedFormData);
        console.log('📄 Parsed saved data:', parsedData);
        
        // Check if saved data has meaningful content (not just empty strings)
        const hasContent = parsedData.firstName || parsedData.lastName || parsedData.email;
        
        if (hasContent) {
          // Don't restore file objects, only text data
          const { photo1x1File, validIDFile, ...restData } = parsedData;
          setFormData((prev) => ({
            ...prev,
            ...restData
          }));
          setAutoFilling(false); // Skip auto-fill if we have saved data
          setHasLoadedData(true);
          setShowLoadingToast(false); // Hide loading immediately
          console.log('✅ Restored form data from localStorage');
        } else {
          console.log('📭 Saved data is empty, will auto-fill from user');
          localStorage.removeItem('documentRequestForm'); // Clear empty data
          setShowLoadingToast(true);
        }
      } catch (error) {
        console.error('❌ Error loading saved form data:', error);
        setShowLoadingToast(true); // Keep showing loading on error
      }
    } else {
      console.log('📭 No saved form data in localStorage');
      // Keep loading visible until user data arrives
      setShowLoadingToast(true);
      console.log('⏳ Waiting for user data to load...');
    }
  }, []);

  // Auto-fill form from user data (only if no saved data and haven't auto-filled yet)
  useEffect(() => {
    console.log('🔄 Auto-fill useEffect triggered');
    console.log('📊 User object:', user);
    console.log('🔐 Auth loading:', authLoading);
    console.log('🎯 AutoFilling state:', autoFilling);
    console.log('📍 Has loaded data:', hasLoadedData);
    
    // If we already have loaded data, hide loading and exit
    if (hasLoadedData) {
      console.log('✓ Data already loaded from localStorage or previous auto-fill');
      setShowLoadingToast(false);
      return;
    }
    
    // Wait for auth to finish loading
    if (authLoading) {
      console.log('⏳ Auth still loading, keeping loading overlay visible...');
      setShowLoadingToast(true);
      return;
    }
    
    // If auth finished but no user, something went wrong - hide loading
    if (!authLoading && !user) {
      console.log('❌ Auth finished but no user available');
      setShowLoadingToast(false);
      return;
    }
    
    if (user && autoFilling) {
      console.log('✅ Starting auto-fill process...');
      console.log('🔍 Full user object:', JSON.stringify(user, null, 2));
      setShowLoadingToast(true);
      
      // Format date of birth to YYYY-MM-DD for HTML date input
      const formatDate = (dateString) => {
        if (!dateString) return "";
        try {
          const date = new Date(dateString);
          if (isNaN(date.getTime())) return "";
          return date.toISOString().split('T')[0];
        } catch (error) {
          console.error('Error formatting date:', error);
          return "";
        }
      };

      const formattedDate = formatDate(user.dateOfBirth);
      console.log('📅 Date of Birth:', user.dateOfBirth, '→ Formatted:', formattedDate);
      console.log('👤 Name fields:', {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        suffix: user.suffix
      });
      console.log('🏠 Address:', user.address);
      console.log('🆘 Emergency Contact:', user.emergencyContact);

      const newFormData = {
        ...formData,
        lastName: user.lastName || "",
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        suffix: user.suffix || "",
        dateOfBirth: formattedDate,
        placeOfBirth: user.placeOfBirth || "",
        gender: user.gender || "",
        civilStatus: user.civilStatus || "",
        nationality: user.nationality || "Filipino",
        contactNumber: user.phoneNumber || "",
        emailAddress: user.email || "",
        // Address
        subdivision: user.address?.subdivision || "",
        street: user.address?.street || "",
        houseNumber: user.address?.houseNumber || "",
        // Additional fields from user registration
        tinNumber: user.tinNumber || "",
        sssGsisNumber: user.sssGsisNumber || "",
        precinctNumber: user.precinctNumber || "",
        religion: user.religion || "",
        heightWeight: user.heightWeight || "",
        colorOfHairEyes: user.colorOfHairEyes || "",
        occupation: user.occupation || "",
        // Spouse info
        spouseName: user.spouseInfo?.name || "",
        spouseOccupation: user.spouseInfo?.occupation || "",
        spouseContact: user.spouseInfo?.contactNumber || "",
        // Emergency contact
        emergencyName: user.emergencyContact?.fullName || "",
        emergencyRelationship: user.emergencyContact?.relationship || "",
        emergencyContact: user.emergencyContact?.contactNumber || "",
        emergencySubdivision: user.emergencyContact?.address?.subdivision || "",
        emergencyStreet: user.emergencyContact?.address?.street || "",
        emergencyHouseNumber: user.emergencyContact?.address?.houseNumber || "",
      };

      console.log('📝 New form data being set:', newFormData);
      setFormData(newFormData);
      setAutoFilling(false);
      setHasLoadedData(true);
      
      console.log('✅ Auto-fill completed!');
      console.log('📊 Form data after auto-fill:', newFormData);
      
      // Hide loading toast after a short delay to show completion
      setTimeout(() => {
        setShowLoadingToast(false);
        console.log('🎉 Loading overlay hidden');
      }, 800);
    } else {
      console.log('⏭️ Auto-fill condition not met');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, autoFilling, hasLoadedData, authLoading]);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (!autoFilling && formData !== initialForm) {
      // Save to localStorage (excluding file objects)
      const { photo1x1File, validIDFile, ...dataToSave } = formData;
      localStorage.setItem('documentRequestForm', JSON.stringify(dataToSave));
    }
  }, [formData, autoFilling]);

  const setField = (name, value) =>
    setFormData((p) => ({ ...p, [name]: value }));

  const isBusinessDocument = () => {
    return ['business_permit', 'business_clearance'].includes(formData.documentType);
  };

  const validateAll = () => {
    const e = {};
    // Required personal fields
    if (!formData.lastName.trim()) e.lastName = "Last Name is required";
    if (!formData.firstName.trim()) e.firstName = "First name is required";
    if (!formData.dateOfBirth) e.dateOfBirth = "Date of birth is required";
    if (!formData.gender) e.gender = "Gender is required";
    if (!formData.contactNumber.trim()) e.contactNumber = "Contact number is required";
    
    // File uploads
    if (!formData.validIDFile) e.validIDFile = "Valid ID is required";
    
    // Emergency contact
    if (!formData.emergencyName.trim()) e.emergencyName = "Emergency contact name is required";
    if (!formData.emergencyContact.trim()) e.emergencyContact = "Emergency contact number is required";
    
    // Document request
    if (!formData.documentType) e.documentType = "Select a document type";
    if (!formData.purposeOfRequest.trim()) e.purposeOfRequest = "Purpose is required";
    
    // Photo 1x1 required for specific documents
    const requiresPhoto = ['clearance', 'business_permit', 'business_clearance'].includes(formData.documentType);
    if (requiresPhoto && !formData.photo1x1File) {
      e.photo1x1File = "Photo 1x1 is required for this document type";
    }
    
    // Business fields validation
    if (isBusinessDocument()) {
      if (!formData.businessName.trim()) e.businessName = "Business name is required";
      if (!formData.natureOfBusiness.trim()) e.natureOfBusiness = "Nature of business is required";
    }
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) {
      // Navigate to first error tab
      if (Object.keys(errors).some(k => ['lastName', 'firstName', 'dateOfBirth', 'gender'].includes(k))) {
        setActive("personal");
      } else if (Object.keys(errors).some(k => ['emergencyName', 'emergencyContact'].includes(k))) {
        setActive("emergency");
      } else if (Object.keys(errors).some(k => ['photo1x1File', 'validIDFile'].includes(k))) {
        setActive("files");
      } else {
        setActive("request");
      }
      return;
    }

    setLoading(true);
    setShowError(false);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Personal info
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('firstName', formData.firstName);
      if (formData.middleName) formDataToSend.append('middleName', formData.middleName);
      if (formData.dateOfBirth) formDataToSend.append('dateOfBirth', formData.dateOfBirth);
      if (formData.placeOfBirth) formDataToSend.append('placeOfBirth', formData.placeOfBirth);
      if (formData.gender) formDataToSend.append('gender', formData.gender);
      if (formData.civilStatus) formDataToSend.append('civilStatus', formData.civilStatus);
      if (formData.nationality) formDataToSend.append('nationality', formData.nationality);
      if (formData.contactNumber) formDataToSend.append('contactNumber', formData.contactNumber);
      
      // Address
      formDataToSend.append('address[subdivision]', formData.subdivision || '');
      formDataToSend.append('address[street]', formData.street || '');
      formDataToSend.append('address[houseNumber]', formData.houseNumber || '');
      
      // Additional fields
      if (formData.tinNumber) formDataToSend.append('tinNumber', formData.tinNumber);
      if (formData.sssGsisNumber) formDataToSend.append('sssGsisNumber', formData.sssGsisNumber);
      if (formData.precinctNumber) formDataToSend.append('precinctNumber', formData.precinctNumber);
      if (formData.religion) formDataToSend.append('religion', formData.religion);
      if (formData.heightWeight) formDataToSend.append('heightWeight', formData.heightWeight);
      if (formData.colorOfHairEyes) formDataToSend.append('colorOfHairEyes', formData.colorOfHairEyes);
      if (formData.occupation) formDataToSend.append('occupation', formData.occupation);
      if (formData.emailAddress) formDataToSend.append('emailAddress', formData.emailAddress);
      
      // Spouse info
      if (formData.spouseName) formDataToSend.append('spouseInfo[name]', formData.spouseName);
      if (formData.spouseOccupation) formDataToSend.append('spouseInfo[occupation]', formData.spouseOccupation);
      if (formData.spouseContact) formDataToSend.append('spouseInfo[contactNumber]', formData.spouseContact);
      
      // Emergency contact
      formDataToSend.append('emergencyContact[fullName]', formData.emergencyName);
      if (formData.emergencyRelationship) formDataToSend.append('emergencyContact[relationship]', formData.emergencyRelationship);
      formDataToSend.append('emergencyContact[contactNumber]', formData.emergencyContact);
      formDataToSend.append('emergencyContact[address][subdivision]', formData.emergencySubdivision || '');
      formDataToSend.append('emergencyContact[address][street]', formData.emergencyStreet || '');
      formDataToSend.append('emergencyContact[address][houseNumber]', formData.emergencyHouseNumber || '');
      
      // Business info (if applicable)
      if (isBusinessDocument()) {
        formDataToSend.append('businessInfo[businessName]', formData.businessName);
        formDataToSend.append('businessInfo[natureOfBusiness]', formData.natureOfBusiness);
        if (formData.applicationType) formDataToSend.append('businessInfo[applicationType]', formData.applicationType);
        if (formData.ownerRepresentative) formDataToSend.append('businessInfo[ownerRepresentative]', formData.ownerRepresentative);
        if (formData.ownerContactNumber) formDataToSend.append('businessInfo[ownerContactNumber]', formData.ownerContactNumber);
        if (formData.representativeContactNumber) formDataToSend.append('businessInfo[representativeContactNumber]', formData.representativeContactNumber);
        formDataToSend.append('businessInfo[businessAddress][subdivision]', formData.businessSubdivision || '');
        formDataToSend.append('businessInfo[businessAddress][street]', formData.businessStreet || '');
        formDataToSend.append('businessInfo[businessAddress][houseNumber]', formData.businessHouseNumber || '');
      }
      
      // Document request
      formDataToSend.append('documentType', formData.documentType);
      formDataToSend.append('purposeOfRequest', formData.purposeOfRequest);
      if (formData.preferredPickupDate) formDataToSend.append('preferredPickupDate', formData.preferredPickupDate);
      if (formData.remarks) formDataToSend.append('remarks', formData.remarks);
      
      // Files
      if (formData.photo1x1File) formDataToSend.append('photo1x1', formData.photo1x1File);
      if (formData.validIDFile) formDataToSend.append('validID', formData.validIDFile);

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/api/document-requests`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('✅ Document request submitted successfully!', response.data);
      
      // Show success message
      setShowSuccess(true);
      setShowError(false);
      
      // Reset form
      setFormData(initialForm);
      setAutoFilling(true); // Re-enable auto-fill for next request
      setHasLoadedData(false); // Allow auto-fill on next visit
      localStorage.removeItem('documentRequestForm'); // Clear saved form data
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Hide success message after 7 seconds
      setTimeout(() => setShowSuccess(false), 7000);
      
    } catch (error) {
      console.error('Submit error:', error);
      setErrorMessage(
        error.response?.data?.message || 
        error.response?.data?.error ||
        'Failed to submit request. Please try again.'
      );
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setLoading(false);
    }
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

        {/* Error Toast */}
        {showError && (
          <div className="mb-4">
            <div
              className="flex items-start bg-[var(--color-light)] border-l-4"
              style={{ borderColor: "#ef4444" }}
            >
              <div className="p-4 flex items-center">
                <AlertCircle
                  className="text-red-500"
                  size={24}
                />
              </div>
              <div className="px-4 py-3">
                <p className="font-semibold text-[var(--color-text-color)]">
                  Submission Failed
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {errorMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Card */}
        <div className="bg-[var(--color-light)] rounded-lg shadow-md border border-[var(--color-neutral-active)] relative">
          {/* Loading Overlay */}
          {showLoadingToast && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-lg z-50 flex items-center justify-center">
              <div className="text-center">
                <div className="relative inline-block">
                  {/* Animated spinner rings */}
                  <div className="w-20 h-20 relative">
                    <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading Your Information</h3>
                  <p className="text-sm text-gray-600 max-w-sm">
                    Please wait while we auto-fill your personal details from your profile...
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
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

              {active === "files" && (
                <FileUploadTab
                  formData={formData}
                  setField={setField}
                  errors={errors}
                  documentType={formData.documentType}
                />
              )}

              {active === "request" && (
                <DocumentRequestTab
                  formData={formData}
                  setField={setField}
                  errors={errors}
                  isBusinessDocument={isBusinessDocument()}
                />
              )}

              {active === "my-requests" && (
                <MyRequestsTab />
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="px-6 py-4 border-t border-[var(--color-neutral-active)] flex justify-between items-center">
              <div>
                {active !== "personal" && active !== "my-requests" && (
                  <button
                    type="button"
                    onClick={() => {
                      if (active === "emergency") setActive("personal");
                      else if (active === "files") setActive("emergency");
                      else if (active === "request") setActive("files");
                    }}
                    className="px-4 py-2 rounded-md font-medium border"
                    style={{
                      borderColor: "var(--color-neutral-active)",
                      color: "var(--color-text-color)",
                    }}
                  >
                    Back
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {active !== "request" && active !== "my-requests" && (
                  <button
                    type="button"
                    onClick={() => {
                      if (active === "personal") setActive("emergency");
                      else if (active === "emergency") setActive("files");
                      else if (active === "files") setActive("request");
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
                    disabled={loading}
                    className="px-5 py-2 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: "var(--color-secondary)",
                      color: "var(--color-light)",
                      boxShadow: `0 6px 18px -6px ${"var(--color-secondary-glow)"}`,
                    }}
                  >
                    {loading ? 'Submitting...' : 'Submit Request'}
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

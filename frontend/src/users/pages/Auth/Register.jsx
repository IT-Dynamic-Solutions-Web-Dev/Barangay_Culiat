import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Upload, X, ArrowLeft, Home, Mail, User, Lock, Phone, MapPin, Eye, EyeOff, Calendar, Briefcase, Heart, IdCard } from "lucide-react";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    middleName: "",
    suffix: "",
    dateOfBirth: "",
    placeOfBirth: "",
    gender: "",
    civilStatus: "",
    nationality: "Filipino",
    phoneNumber: "",
    houseNumber: "",
    street: "",
    subdivision: "",
    tinNumber: "",
    sssGsisNumber: "",
    precinctNumber: "",
    religion: "",
    heightWeight: "",
    colorOfHairEyes: "",
    occupation: "",
    spouseName: "",
    spouseOccupation: "",
    spouseContact: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyContact: "",
    emergencyHouseNumber: "",
    emergencyStreet: "",
    emergencySubdivision: "",
    validIDFile: null,
    termsAccepted: false,
  });
  
  const [validIDPreview, setValidIDPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setError("Only JPG, JPEG, and PNG files are allowed");
        return;
      }
      
      if (file.size > 5242880) {
        setError("File size must not exceed 5MB");
        return;
      }
      
      setFormData({ ...formData, validIDFile: file });
      setValidIDPreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const removeFile = () => {
    setFormData({ ...formData, validIDFile: null });
    if (validIDPreview) {
      URL.revokeObjectURL(validIDPreview);
      setValidIDPreview(null);
    }
  };

  const validateStep = (step) => {
    setError("");
    
    if (step === 1) {
      if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill in all account fields");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return false;
      }
    }
    
    if (step === 2) {
      if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || 
          !formData.gender || !formData.civilStatus || !formData.phoneNumber) {
        setError("Please fill in all required personal information fields");
        return false;
      }
    }
    
    if (step === 3) {
      if (!formData.houseNumber || !formData.street) {
        setError("Please fill in your address");
        return false;
      }
      if (!formData.emergencyName || !formData.emergencyContact) {
        setError("Please provide emergency contact information");
        return false;
      }
    }
    
    if (step === 4) {
      if (!formData.validIDFile) {
        setError("Please upload a valid ID");
        return false;
      }
    }

    if (step === 5) {
      if (!formData.termsAccepted) {
        setError("You must accept the Terms and Conditions to register");
        return false;
      }
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      setError("");
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateStep(5)) {
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      if (formData.middleName) formDataToSend.append("middleName", formData.middleName);
      if (formData.suffix) formDataToSend.append("suffix", formData.suffix);
      formDataToSend.append("dateOfBirth", formData.dateOfBirth);
      if (formData.placeOfBirth) formDataToSend.append("placeOfBirth", formData.placeOfBirth);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("civilStatus", formData.civilStatus);
      formDataToSend.append("nationality", formData.nationality);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      
      formDataToSend.append("address[houseNumber]", formData.houseNumber || "");
      formDataToSend.append("address[street]", formData.street || "");
      formDataToSend.append("address[subdivision]", formData.subdivision || "");
      
      if (formData.tinNumber) formDataToSend.append("tinNumber", formData.tinNumber);
      if (formData.sssGsisNumber) formDataToSend.append("sssGsisNumber", formData.sssGsisNumber);
      if (formData.precinctNumber) formDataToSend.append("precinctNumber", formData.precinctNumber);
      if (formData.religion) formDataToSend.append("religion", formData.religion);
      if (formData.heightWeight) formDataToSend.append("heightWeight", formData.heightWeight);
      if (formData.colorOfHairEyes) formDataToSend.append("colorOfHairEyes", formData.colorOfHairEyes);
      if (formData.occupation) formDataToSend.append("occupation", formData.occupation);
      
      if (formData.spouseName) formDataToSend.append("spouseInfo[name]", formData.spouseName);
      if (formData.spouseOccupation) formDataToSend.append("spouseInfo[occupation]", formData.spouseOccupation);
      if (formData.spouseContact) formDataToSend.append("spouseInfo[contactNumber]", formData.spouseContact);
      
      formDataToSend.append("emergencyContact[fullName]", formData.emergencyName);
      if (formData.emergencyRelationship) formDataToSend.append("emergencyContact[relationship]", formData.emergencyRelationship);
      formDataToSend.append("emergencyContact[contactNumber]", formData.emergencyContact);
      formDataToSend.append("emergencyContact[address][houseNumber]", formData.emergencyHouseNumber || "");
      formDataToSend.append("emergencyContact[address][street]", formData.emergencyStreet || "");
      formDataToSend.append("emergencyContact[address][subdivision]", formData.emergencySubdivision || "");
      
      formDataToSend.append("validID", formData.validIDFile);

      const result = await register(formDataToSend);

      if (result.success || result.pending) {
        navigate("/registration-pending");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="flex items-center flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
            currentStep >= step 
              ? "bg-blue-600 text-white" 
              : "bg-slate-200 text-slate-500"
          }`}>
            {step}
          </div>
          {step < 5 && (
            <div className={`flex-1 h-1 mx-2 transition-all ${
              currentStep > step ? "bg-blue-600" : "bg-slate-200"
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username *</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Choose a username"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email *</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password *</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Minimum 6 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password *</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Re-enter your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Juan"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Dela Cruz"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Santos"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Suffix (e.g., Jr., Sr., III)</label>
          <input
            type="text"
            name="suffix"
            value={formData.suffix}
            onChange={handleChange}
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Jr."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date of Birth *</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 text-sm"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Place of Birth</label>
        <input
          type="text"
          name="placeOfBirth"
          value={formData.placeOfBirth}
          onChange={handleChange}
          className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
          placeholder="Quezon City"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Civil Status *</label>
          <select
            name="civilStatus"
            value={formData.civilStatus}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 text-sm"
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Widowed">Widowed</option>
            <option value="Separated">Separated</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number *</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
              placeholder="09123456789"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Occupation</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Briefcase className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
              placeholder="Your occupation"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Religion</label>
          <input
            type="text"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Your religion"
          />
        </div>
      </div>

      {formData.civilStatus === "Married" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
          <h4 className="text-sm font-semibold text-blue-900 flex items-center gap-2">
            <Heart className="h-4 w-4" /> Spouse Information
          </h4>
          <input
            type="text"
            name="spouseName"
            value={formData.spouseName}
            onChange={handleChange}
            className="block w-full px-3 py-2.5 bg-white border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Spouse Full Name"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="spouseOccupation"
              value={formData.spouseOccupation}
              onChange={handleChange}
              className="block w-full px-3 py-2.5 bg-white border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
              placeholder="Spouse Occupation"
            />
            <input
              type="tel"
              name="spouseContact"
              value={formData.spouseContact}
              onChange={handleChange}
              className="block w-full px-3 py-2.5 bg-white border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
              placeholder="Spouse Contact"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
        <MapPin className="h-4 w-4 text-blue-600" /> Your Address
      </h4>
      
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">House No. *</label>
          <input
            type="text"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="123"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Street *</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Main Street"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subdivision</label>
          <input
            type="text"
            name="subdivision"
            value={formData.subdivision}
            onChange={handleChange}
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Village"
          />
        </div>
      </div>

      <div className="bg-slate-100 border border-slate-300 rounded-lg p-3">
        <p className="text-xs text-slate-600">
          <strong>Barangay:</strong> Culiat | <strong>City:</strong> Quezon City | <strong>Region:</strong> NCR
        </p>
      </div>

      <div className="pt-4 border-t border-slate-200">
        <h4 className="text-sm font-semibold text-slate-800 mb-3">Emergency Contact *</h4>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            name="emergencyName"
            value={formData.emergencyName}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Full Name"
          />
          <input
            type="text"
            name="emergencyRelationship"
            value={formData.emergencyRelationship}
            onChange={handleChange}
            required
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Relationship"
          />
        </div>

        <input
          type="tel"
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleChange}
          required
          className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm mb-3"
          placeholder="Contact Number"
        />

        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            name="emergencyHouseNumber"
            value={formData.emergencyHouseNumber}
            onChange={handleChange}
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="House No."
          />
          <input
            type="text"
            name="emergencyStreet"
            value={formData.emergencyStreet}
            onChange={handleChange}
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Street"
          />
          <input
            type="text"
            name="emergencySubdivision"
            value={formData.emergencySubdivision}
            onChange={handleChange}
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Subdivision"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">TIN Number</label>
          <input
            type="text"
            name="tinNumber"
            value={formData.tinNumber}
            onChange={handleChange}
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="000-000-000"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">SSS/GSIS Number</label>
          <input
            type="text"
            name="sssGsisNumber"
            value={formData.sssGsisNumber}
            onChange={handleChange}
            className="block w-full px-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
            placeholder="00-0000000-0"
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
          <IdCard className="h-4 w-4 text-blue-600" />
          Upload Valid ID *
        </label>
        <p className="text-xs text-slate-500 mb-3">
          Upload a clear photo of your valid ID (Government ID, Driver\'s License, Passport, etc.)
        </p>

        {!validIDPreview ? (
          <label className="flex flex-col items-center px-6 py-8 bg-slate-50 text-slate-500 rounded-lg border-2 border-dashed border-slate-300 cursor-pointer hover:bg-slate-100 hover:border-blue-400 transition-all">
            <Upload className="w-12 h-12 mb-3 text-slate-400" />
            <span className="text-sm font-medium">Click to upload Valid ID</span>
            <span className="text-xs mt-1">JPG, JPEG, PNG (Max 5MB)</span>
            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileChange}
              required
            />
          </label>
        ) : (
          <div className="relative">
            <img
              src={validIDPreview}
              alt="Valid ID Preview"
              className="w-full h-64 object-contain border-2 border-slate-200 rounded-lg bg-slate-50"
            />
            <button
              type="button"
              onClick={removeFile}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Review Your Information</h4>
        <div className="text-xs text-blue-800 space-y-1">
          <p><strong>Name:</strong> {formData.firstName} {formData.middleName} {formData.lastName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phoneNumber}</p>
          <p><strong>Address:</strong> {formData.houseNumber} {formData.street} {formData.subdivision}, Brgy. Culiat</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-xs text-amber-800">
          <strong>Note:</strong> Your registration will be reviewed by barangay administrators. You will receive an email notification once your account is approved (typically within 1-3 business days).
        </p>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-lg p-4 h-64 overflow-y-auto text-sm text-slate-600 mb-4">
        <h3 className="font-bold text-slate-800 mb-2">Terms and Conditions</h3>
        <p className="mb-2">
          Welcome to the Barangay Culiat Online Portal. By registering, you agree to the following terms and conditions:
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          <li>You certify that all information provided is true and correct.</li>
          <li>You agree to provide a valid government-issued ID for verification purposes.</li>
          <li>You understand that your account is subject to approval by the Barangay Administration.</li>
          <li>You agree to use this portal for legitimate barangay-related transactions only.</li>
          <li>You consent to the collection and processing of your personal data in accordance with the Data Privacy Act of 2012.</li>
          <li>Any false information provided may result in the rejection of your application or suspension of your account.</li>
        </ul>
        <p>
          The Barangay Culiat Administration reserves the right to update these terms at any time.
        </p>
      </div>

      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <div className="flex items-center h-5">
          <input
            id="termsAccepted"
            name="termsAccepted"
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>
        <label htmlFor="termsAccepted" className="text-sm text-slate-700">
          I have read and agree to the <span className="font-semibold text-blue-700">Terms and Conditions</span> and <span className="font-semibold text-blue-700">Privacy Policy</span>.
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-auto">
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
        <div className="absolute inset-0 bg-[url(\'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=\')] opacity-30"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-12 text-sm font-medium group w-fit">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="mb-6">
            <div className="w-20 h-20 bg-white/95 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-blue-500/30 mb-4">
              <img src="/images/logo/brgy-culiat-logo.svg" alt="Barangay Culiat Logo" className="w-16 h-16 object-contain" />
            </div>
          </div>

          <div className="max-w-xl">
            <h1 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight">
              Join Barangay Culiat
              <span className="block text-white/90 text-2xl xl:text-3xl mt-2">Resident Registration</span>
            </h1>
            
            <p className="text-lg text-white/90 mb-6 leading-relaxed">
              Register now to access barangay services, submit reports, and stay connected with your community.
            </p>

            <div className="space-y-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="font-bold text-base mb-1.5 flex items-center gap-2">
                  <div className="w-7 h-7 bg-blue-500/30 rounded-lg flex items-center justify-center"><Home className="w-4 h-4" /></div>
                  Quick Access
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Get instant access to document requests and barangay services once approved.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="font-bold text-base mb-1.5 flex items-center gap-2">
                  <div className="w-7 h-7 bg-blue-500/30 rounded-lg flex items-center justify-center"><Mail className="w-4 h-4" /></div>
                  Stay Updated
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Receive important announcements and updates from your barangay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center p-4 md:p-8 relative overflow-y-auto">
        <Link to="/" className="lg:hidden absolute top-4 left-4 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium group z-20">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>

        <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-100 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="w-full max-w-2xl relative my-auto">
          <div className="lg:hidden text-center mb-6 mt-12">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl ring-2 ring-blue-500/30">
              <img src="/images/logo/brgy-culiat-logo.svg" alt="Barangay Culiat Logo" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 mb-1">Barangay Culiat</h1>
            <p className="text-slate-600 text-sm">Resident Registration</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="mb-6">
                                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-1.5">Create Your Account</h2>
                <p className="text-slate-500 text-sm">
                  Step {currentStep} of 5: {
                    currentStep === 1 ? "Account Credentials" :
                    currentStep === 2 ? "Personal Information" :
                    currentStep === 3 ? "Address & Contact" :
                    currentStep === 4 ? "Valid ID Upload" :
                    "Terms & Conditions"
                  }
                </p>
              </div>

              {renderStepIndicator()}

              {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-2">
                  <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">!</div>
                  <p className="text-xs font-medium text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
                {currentStep === 5 && renderStep5()}

                <div className="flex gap-3 mt-6">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors text-sm"
                    >
                      Previous
                    </button>
                  )}
                  
                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-gradient-to-r from-[#1a73e8] to-[#1557b0] hover:from-[#1557b0] hover:to-[#0d47a1] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.01] active:scale-[0.99] text-sm tracking-wide"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-[#1a73e8] to-[#1557b0] hover:from-[#1557b0] hover:to-[#0d47a1] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99] text-sm tracking-wide"
                    >
                      {loading ? "Submitting..." : "Complete Registration"}
                    </button>
                  )}
                </div>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-200 text-center">
                <p className="text-xs text-slate-500">
                  Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-medium">Sign in here</Link>
                </p>
              </div>
            </div>

            <div className="bg-slate-50/80 px-6 md:px-8 py-3 text-center border-t border-slate-200">
              <p className="text-xs text-slate-600 font-medium"> 2025 Barangay Culiat. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

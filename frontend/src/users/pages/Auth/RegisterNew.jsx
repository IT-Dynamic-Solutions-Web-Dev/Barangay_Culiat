import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Upload, X } from "lucide-react";

const RegisterNew = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Account Credentials
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    
    // Personal Information
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    gender: "",
    civilStatus: "",
    nationality: "Filipino",
    
    // Contact & Address
    phoneNumber: "",
    subdivision: "",
    street: "",
    houseNumber: "",
    
    // Additional Information
    tinNumber: "",
    sssGsisNumber: "",
    precinctNumber: "",
    religion: "",
    heightWeight: "",
    colorOfHairEyes: "",
    occupation: "",
    
    // Spouse Information (if married)
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
    
    // File Upload
    validIDFile: null,
  });
  
  const [validIDPreview, setValidIDPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only JPG, JPEG, and PNG files are allowed');
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5242880) {
        setError('File size must not exceed 5MB');
        return;
      }
      
      setFormData({ ...formData, validIDFile: file });
      setValidIDPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const removeFile = () => {
    setFormData({ ...formData, validIDFile: null });
    if (validIDPreview) {
      URL.revokeObjectURL(validIDPreview);
      setValidIDPreview(null);
    }
  };

  const validateStep = (currentStep) => {
    setError("");
    
    if (currentStep === 1) {
      if (!formData.username.trim()) {
        setError("Username is required");
        return false;
      }
      if (!formData.email.trim()) {
        setError("Email is required");
        return false;
      }
      if (!formData.password) {
        setError("Password is required");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    }
    
    if (currentStep === 2) {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setError("First name and last name are required");
        return false;
      }
      if (!formData.dateOfBirth) {
        setError("Date of birth is required");
        return false;
      }
      if (!formData.gender) {
        setError("Gender is required");
        return false;
      }
      if (!formData.civilStatus) {
        setError("Civil status is required");
        return false;
      }
    }
    
    if (currentStep === 3) {
      if (!formData.phoneNumber.trim()) {
        setError("Phone number is required");
        return false;
      }
      if (!formData.emergencyName.trim() || !formData.emergencyContact.trim()) {
        setError("Emergency contact information is required");
        return false;
      }
    }
    
    if (currentStep === 4) {
      if (!formData.validIDFile) {
        setError("Valid ID is required for registration");
        return false;
      }
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Account credentials
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      
      // Personal information
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      if (formData.middleName) formDataToSend.append('middleName', formData.middleName);
      formDataToSend.append('dateOfBirth', formData.dateOfBirth);
      if (formData.placeOfBirth) formDataToSend.append('placeOfBirth', formData.placeOfBirth);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('civilStatus', formData.civilStatus);
      formDataToSend.append('nationality', formData.nationality);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      
      // Address
      formDataToSend.append('address[subdivision]', formData.subdivision || '');
      formDataToSend.append('address[street]', formData.street || '');
      formDataToSend.append('address[houseNumber]', formData.houseNumber || '');
      
      // Additional information
      if (formData.tinNumber) formDataToSend.append('tinNumber', formData.tinNumber);
      if (formData.sssGsisNumber) formDataToSend.append('sssGsisNumber', formData.sssGsisNumber);
      if (formData.precinctNumber) formDataToSend.append('precinctNumber', formData.precinctNumber);
      if (formData.religion) formDataToSend.append('religion', formData.religion);
      if (formData.heightWeight) formDataToSend.append('heightWeight', formData.heightWeight);
      if (formData.colorOfHairEyes) formDataToSend.append('colorOfHairEyes', formData.colorOfHairEyes);
      if (formData.occupation) formDataToSend.append('occupation', formData.occupation);
      
      // Spouse information
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
      
      // Valid ID file
      formDataToSend.append('validID', formData.validIDFile);

      const result = await register(formDataToSend);

      if (result.success) {
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

  const renderStep1 = () => (
    <>
      <h3 style={styles.stepTitle}>Step 1: Account Information</h3>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Username *</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="Choose a username"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="your.email@example.com"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Password *</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="At least 6 characters"
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Confirm Password *</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="Re-enter your password"
        />
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <h3 style={styles.stepTitle}>Step 2: Personal Information</h3>
      
      <div style={styles.row}>
        <div style={styles.formGroup}>
          <label style={styles.label}>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Middle Name</label>
        <input
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.row}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Place of Birth</label>
          <input
            type="text"
            name="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Civil Status *</label>
          <select
            name="civilStatus"
            value={formData.civilStatus}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Widowed">Widowed</option>
            <option value="Separated">Separated</option>
            <option value="Divorced">Divorced</option>
          </select>
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nationality</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Religion</label>
          <input
            type="text"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Height/Weight</label>
          <input
            type="text"
            name="heightWeight"
            value={formData.heightWeight}
            onChange={handleChange}
            style={styles.input}
            placeholder="e.g., 5'6\" / 65kg"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Color of Hair/Eyes</label>
          <input
            type="text"
            name="colorOfHairEyes"
            value={formData.colorOfHairEyes}
            onChange={handleChange}
            style={styles.input}
            placeholder="e.g., Black / Brown"
          />
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.formGroup}>
          <label style={styles.label}>TIN Number</label>
          <input
            type="text"
            name="tinNumber"
            value={formData.tinNumber}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>SSS/GSIS Number</label>
          <input
            type="text"
            name="sssGsisNumber"
            value={formData.sssGsisNumber}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Precinct Number</label>
          <input
            type="text"
            name="precinctNumber"
            value={formData.precinctNumber}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Occupation</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      {formData.civilStatus === 'Married' && (
        <>
          <h4 style={styles.subHeading}>Spouse Information</h4>
          <div style={styles.formGroup}>
            <label style={styles.label}>Spouse Name</label>
            <input
              type="text"
              name="spouseName"
              value={formData.spouseName}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Spouse Occupation</label>
              <input
                type="text"
                name="spouseOccupation"
                value={formData.spouseOccupation}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Spouse Contact Number</label>
              <input
                type="tel"
                name="spouseContact"
                value={formData.spouseContact}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>
        </>
      )}
    </>
  );

  const renderStep3 = () => (
    <>
      <h3 style={styles.stepTitle}>Step 3: Contact & Address</h3>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Phone Number *</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          style={styles.input}
          placeholder="+63 XXX XXX XXXX"
        />
      </div>

      <h4 style={styles.subHeading}>Your Address (Barangay Culiat, Quezon City)</h4>
      <div style={styles.row}>
        <div style={styles.formGroup}>
          <label style={styles.label}>House Number</label>
          <input
            type="text"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Street</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Subdivision</label>
        <input
          type="text"
          name="subdivision"
          value={formData.subdivision}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <h4 style={styles.subHeading}>Emergency Contact *</h4>
      <div style={styles.formGroup}>
        <label style={styles.label}>Full Name *</label>
        <input
          type="text"
          name="emergencyName"
          value={formData.emergencyName}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.row}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Relationship</label>
          <input
            type="text"
            name="emergencyRelationship"
            value={formData.emergencyRelationship}
            onChange={handleChange}
            style={styles.input}
            placeholder="e.g., Parent, Sibling, Friend"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Contact Number *</label>
          <input
            type="tel"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
      </div>

      <h4 style={styles.subHeading}>Emergency Contact Address</h4>
      <div style={styles.row}>
        <div style={styles.formGroup}>
          <label style={styles.label}>House Number</label>
          <input
            type="text"
            name="emergencyHouseNumber"
            value={formData.emergencyHouseNumber}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Street</label>
          <input
            type="text"
            name="emergencyStreet"
            value={formData.emergencyStreet}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Subdivision</label>
        <input
          type="text"
          name="emergencySubdivision"
          value={formData.emergencySubdivision}
          onChange={handleChange}
          style={styles.input}
        />
      </div>
    </>
  );

  const renderStep4 = () => (
    <>
      <h3 style={styles.stepTitle}>Step 4: Upload Valid ID</h3>
      <p style={styles.infoText}>
        Please upload a clear photo of your valid ID for verification. 
        Your registration will be reviewed by an admin before approval.
      </p>
      
      <div style={styles.uploadSection}>
        {!validIDPreview ? (
          <label style={styles.uploadBox}>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <Upload size={48} style={{ color: '#4a90e2', marginBottom: '10px' }} />
            <p style={styles.uploadText}>Click to upload Valid ID</p>
            <p style={styles.uploadSubtext}>JPG, JPEG, or PNG (Max 5MB)</p>
          </label>
        ) : (
          <div style={styles.previewBox}>
            <img src={validIDPreview} alt="Valid ID Preview" style={styles.previewImage} />
            <button
              type="button"
              onClick={removeFile}
              style={styles.removeButton}
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Barangay Culiat</h1>
        <h2 style={styles.subtitle}>Resident Registration</h2>

        <div style={styles.stepIndicator}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                ...styles.stepDot,
                ...(s === step ? styles.stepDotActive : {}),
                ...(s < step ? styles.stepDotCompleted : {}),
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}

          <div style={styles.buttonGroup}>
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                style={styles.buttonSecondary}
                disabled={loading}
              >
                Previous
              </button>
            )}
            
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                style={styles.button}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                style={styles.button}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Register"}
              </button>
            )}
          </div>
        </form>

        <div style={styles.footer}>
          <p>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
    padding: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "800px",
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "10px",
    fontSize: "28px",
  },
  subtitle: {
    textAlign: "center",
    color: "#7f8c8d",
    marginBottom: "30px",
    fontSize: "18px",
  },
  stepIndicator: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
  },
  stepDot: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "#666",
  },
  stepDotActive: {
    backgroundColor: "#4a90e2",
    color: "white",
  },
  stepDotCompleted: {
    backgroundColor: "#27ae60",
    color: "white",
  },
  stepTitle: {
    color: "#2c3e50",
    marginBottom: "20px",
    fontSize: "20px",
  },
  subHeading: {
    color: "#34495e",
    marginTop: "20px",
    marginBottom: "15px",
    fontSize: "16px",
    fontWeight: "600",
  },
  infoText: {
    color: "#7f8c8d",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    color: "#2c3e50",
    fontWeight: "500",
  },
  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    transition: "border-color 0.3s",
  },
  uploadSection: {
    marginTop: "20px",
  },
  uploadBox: {
    border: "2px dashed #4a90e2",
    borderRadius: "8px",
    padding: "40px",
    textAlign: "center",
    cursor: "pointer",
    transition: "background-color 0.3s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  uploadText: {
    color: "#4a90e2",
    fontWeight: "500",
    margin: "10px 0 5px",
  },
  uploadSubtext: {
    color: "#7f8c8d",
    fontSize: "14px",
  },
  previewBox: {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "contain",
    backgroundColor: "#f5f7fa",
  },
  removeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "rgba(231, 76, 60, 0.9)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },
  button: {
    flex: 1,
    padding: "14px",
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonSecondary: {
    flex: 1,
    padding: "14px",
    backgroundColor: "#95a5a6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  error: {
    backgroundColor: "#fee",
    color: "#c33",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "20px",
    textAlign: "center",
  },
  footer: {
    marginTop: "30px",
    textAlign: "center",
    color: "#7f8c8d",
  },
  link: {
    color: "#4a90e2",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default RegisterNew;

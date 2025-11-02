import { Link } from "react-router-dom";
import { Clock, CheckCircle } from "lucide-react";

const RegistrationPending = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <Clock size={64} style={{ color: "#f39c12" }} />
        </div>
        
        <h1 style={styles.title}>Registration Pending</h1>
        
        <p style={styles.message}>
          Thank you for registering with Barangay Culiat!
        </p>
        
        <div style={styles.infoBox}>
          <CheckCircle size={20} style={{ color: "#27ae60", minWidth: "20px" }} />
          <p style={styles.infoText}>
            Your registration has been submitted successfully and is currently under review by our admin team.
          </p>
        </div>
        
        <div style={styles.steps}>
          <h3 style={styles.stepsTitle}>What happens next?</h3>
          <ol style={styles.stepsList}>
            <li>Our admin will review your submitted information and valid ID</li>
            <li>You will receive an email notification once your account is approved</li>
            <li>After approval, you can log in and access all barangay services</li>
          </ol>
        </div>
        
        <p style={styles.note}>
          <strong>Note:</strong> This process usually takes 1-3 business days. 
          If you have any questions, please contact us at barangayculiat@example.com
        </p>
        
        <Link to="/login" style={styles.button}>
          Back to Login
        </Link>
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
    maxWidth: "600px",
    textAlign: "center",
  },
  iconContainer: {
    marginBottom: "20px",
  },
  title: {
    color: "#2c3e50",
    marginBottom: "20px",
    fontSize: "28px",
  },
  message: {
    color: "#7f8c8d",
    marginBottom: "30px",
    fontSize: "16px",
    lineHeight: "1.6",
  },
  infoBox: {
    display: "flex",
    gap: "15px",
    backgroundColor: "#e8f8f5",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
    textAlign: "left",
    alignItems: "flex-start",
  },
  infoText: {
    margin: 0,
    color: "#27ae60",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  steps: {
    textAlign: "left",
    marginBottom: "30px",
  },
  stepsTitle: {
    color: "#2c3e50",
    marginBottom: "15px",
    fontSize: "18px",
  },
  stepsList: {
    color: "#7f8c8d",
    lineHeight: "2",
    paddingLeft: "20px",
  },
  note: {
    backgroundColor: "#fff3cd",
    color: "#856404",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "30px",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  button: {
    display: "inline-block",
    padding: "14px 40px",
    backgroundColor: "#4a90e2",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background-color 0.3s",
  },
};

export default RegistrationPending;

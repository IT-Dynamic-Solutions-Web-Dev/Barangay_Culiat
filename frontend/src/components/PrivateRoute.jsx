import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    // Store the current path to redirect back after login
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to home if user is not admin but trying to access admin routes
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const styles = {
  loading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '1.2rem',
    color: '#666',
    gap: '1rem',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

// Add keyframe animation for spinner
const styleSheet = document.styleSheets[0];
const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
if (styleSheet) {
  try {
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  } catch (e) {
    // Keyframes already exist
  }
}

export default PrivateRoute;

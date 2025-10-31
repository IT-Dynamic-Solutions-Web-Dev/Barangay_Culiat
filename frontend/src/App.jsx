import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./tailadminsrc/pages/AuthPages/SignIn";
import Register from "./tailadminsrc/pages/AuthPages/SignUp";
import Dashboard from "./users/pages/Home/Dashboard";
import Reports from "./users/pages/Reports/Reports";
import NewReport from "./users/pages/Reports/NewReport";
import Announcements from "./users/pages/Announcement/Announcements";
import AnnouncementDetail from "./users/pages/Announcement/AnnouncementDetail";
import Services from "./users/pages/Services/Services";
import MainLayout from "./MainLayout/MainLayout";
import Home from "./users/pages/Home/Home";
import About from "./users/pages/About/About";
import PolicyPopup from "./components/PolicyPopup";
import NotFound from "./tailadminsrc/pages/OtherPage/NotFound";

// Admin imports
import AdminLayout from "./admin/layouts/AdminLayout";
import AdminDashboard from "./admin/pages/Dashboard/AdminDashboard";
import AdminReports from "./admin/pages/Reports/AdminReports";
import AdminAnnouncements from "./admin/pages/Announcements/AdminAnnouncements";
import AdminUsers from "./admin/pages/Users/AdminUsers";
import PendingRegistrations from "./admin/pages/Users/PendingRegistrations";
import SettingsPage from "./admin/pages/Settings/SettingsPage";

// Resident Auth
import ResidentAuth from "./users/pages/Auth/ResidentAuth";
import Profile from "./users/pages/Profile/Profile";

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* 👇 Render only on client side */}
        {typeof window !== "undefined" && <PolicyPopup />}

        <Routes>
          {/* Admin Login */}
          <Route path="/signin" element={<Login />} />
          
          {/* Resident Login/Registration */}
          <Route path="/login" element={<ResidentAuth />} />
          <Route path="/register" element={<ResidentAuth />} />

          {/* User Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </PrivateRoute>
            }
          />

          {/* User Profile Route */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </PrivateRoute>
            }
          />

          {/* Admin Routes with AdminLayout */}
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly={true}>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="pending-registrations" element={<PendingRegistrations />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* User Routes with MainLayout */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />

          <Route
            path="/reports"
            element={
              <MainLayout>
                <Reports />
              </MainLayout>
            }
          />

          <Route
            path="/reports/newreport"
            element={
              <MainLayout>
                <NewReport />
              </MainLayout>
            }
          />

          <Route
            path="/announcements"
            element={
              <MainLayout>
                <Announcements />
              </MainLayout>
            }
          />
          <Route
            path="/announcements/:slug"
            element={
              <MainLayout>
                <AnnouncementDetail />
              </MainLayout>
            }
          />
          <Route
            path="/services/"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Services />
                </MainLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />

          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

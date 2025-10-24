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
import PolicyPopup from "./components/PolicyPopup"; // 👈 import popup
import NotFound from "./tailadminsrc/pages/OtherPage/NotFound";

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* 👇 Render only on client side */}
        {typeof window !== "undefined" && <PolicyPopup />}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
              <PrivateRoute>
                <MainLayout>
                  <Reports />
                </MainLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/reports/newreport"
            element={
              <PrivateRoute>
                <MainLayout>
                  <NewReport />
                </MainLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/announcements"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Announcements />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/announcements/:slug"
            element={
              <PrivateRoute>
                <MainLayout>
                  <AnnouncementDetail />
                </MainLayout>
              </PrivateRoute>
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

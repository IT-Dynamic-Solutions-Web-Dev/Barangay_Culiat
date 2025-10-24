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
import Dashboard from "./pages/Home/Dashboard";
import Reports from "./pages/Reports/Reports";
import NewReport from "./pages/Reports/NewReport";
import Announcements from "./pages/Announcement/Announcements";
import AnnouncementDetail from "./pages/Announcement/AnnouncementDetail";
import Services from "./pages/Services/Services";
import MainLayout from "./MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import PolicyPopup from "./components/PolicyPopup"; // 👈 import popup

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
                  path="/reports/new"
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
            </Routes>
         </AuthProvider>
      </Router>
   );
}

export default App;

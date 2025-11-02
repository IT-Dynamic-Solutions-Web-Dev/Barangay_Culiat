import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { Eye, EyeOff, Lock, User, ArrowLeft, Activity } from "lucide-react";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(username, password);
      
      if (response.success && response.user) {
        // Check if user is admin (roleCode 74933 or 74932)
        if (response.user.roleCode === 74933 || response.user.roleCode === 74932) {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">
      {/* Hero/Information Section - Left Side (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-12 text-sm font-medium group w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Logo */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-white/95 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-blue-500/30 mb-4">
              <img 
                src="/images/logo/brgy-culiat-logo.svg" 
                alt="Barangay Culiat Logo" 
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="max-w-xl">
            <h1 className="text-3xl xl:text-4xl font-bold mb-3 leading-tight">
              Barangay Culiat
              <span className="block text-white/90 text-xl xl:text-2xl mt-2">Admin Portal</span>
            </h1>
            
            <p className="text-base text-white/90 mb-5 leading-relaxed">
              Welcome to the administrative dashboard for Barangay Culiat Management System.
            </p>

            {/* Features/Info Cards - Reduced to 2 */}
            <div className="space-y-2.5">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/20">
                <h3 className="font-bold text-sm mb-1 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500/30 rounded-lg flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  Manage Community
                </h3>
                <p className="text-white/80 text-xs leading-relaxed">
                  Oversee resident information, document requests, and community services efficiently.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/20">
                <h3 className="font-bold text-sm mb-1 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500/30 rounded-lg flex items-center justify-center">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  Real-time Updates
                </h3>
                <p className="text-white/80 text-xs leading-relaxed">
                  Monitor reports, announcements, and activities happening in the barangay in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Section - Right Side */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-4 md:p-8 relative overflow-y-auto">
        {/* Mobile Back Button */}
        <Link
          to="/"
          className="lg:hidden absolute top-4 left-4 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium group z-20"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>

        {/* Decorative Elements for Mobile/Tablet */}
        <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-100 rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md relative my-auto">
          {/* Mobile Logo Header */}
          <div className="lg:hidden text-center mb-6 mt-12">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl ring-2 ring-blue-500/30">
              <img 
                src="/images/logo/brgy-culiat-logo.svg" 
                alt="Barangay Culiat Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-slate-800 mb-1">Barangay Culiat</h1>
            <p className="text-slate-600 text-sm">Admin Portal</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
            {/* Form Section */}
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-1.5">Welcome Back</h2>
                <p className="text-slate-500 text-sm">Sign in to access the admin dashboard</p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-2">
                  <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">!</div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-red-800">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username Field */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Username
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-slate-400 group-focus-within:text-[#1a73e8] transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
                      placeholder="Enter your username"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-[#1a73e8] transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 transition-colors z-10"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#1a73e8] to-[#1557b0] hover:from-[#1557b0] hover:to-[#0d47a1] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99] mt-4 text-sm tracking-wide"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </button>
              </form>

              {/* Additional Info */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <Lock className="w-3 h-3" />
                  <p>Secure connection to Barangay Culiat portal</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50/80 px-6 md:px-8 py-3 text-center border-t border-slate-200">
              <p className="text-xs text-slate-600 font-medium">
                © 2025 Barangay Culiat. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

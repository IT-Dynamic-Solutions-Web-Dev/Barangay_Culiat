import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Eye, EyeOff, Lock, User, ArrowLeft, Home, Mail } from "lucide-react";

export default function ResidentAuth() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(loginData.username, loginData.password);
      
      if (response.success && response.user) {
        if (response.user.roleCode === 74934) {
          const redirectPath = sessionStorage.getItem('redirectAfterLogin');
          if (redirectPath && redirectPath !== '/login' && redirectPath !== '/register') {
            sessionStorage.removeItem('redirectAfterLogin');
            navigate(redirectPath);
          } else {
            // Default redirect to home instead of dashboard
            navigate("/");
          }
        } else {
          setError("This login is for residents only. Admins please use the admin portal.");
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
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
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
              Barangay Culiat
              <span className="block text-white/90 text-2xl xl:text-3xl mt-2">Resident Portal</span>
            </h1>
            <p className="text-lg text-white/90 mb-6 leading-relaxed">Access barangay services, submit reports, and stay updated with community announcements.</p>
            <div className="space-y-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="font-bold text-base mb-1.5 flex items-center gap-2">
                  <div className="w-7 h-7 bg-blue-500/30 rounded-lg flex items-center justify-center"><Home className="w-4 h-4" /></div>
                  Community Services
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">Request documents, certificates, and access various barangay services online.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="font-bold text-base mb-1.5 flex items-center gap-2">
                  <div className="w-7 h-7 bg-blue-500/30 rounded-lg flex items-center justify-center"><Mail className="w-4 h-4" /></div>
                  Stay Informed
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">Receive important announcements and updates from your barangay officials.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-4 md:p-8 relative overflow-y-auto">
        <Link to="/" className="lg:hidden absolute top-4 left-4 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium group z-20">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>
        <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-100 rounded-full opacity-20 blur-3xl"></div>
        </div>
        <div className="w-full max-w-md relative my-auto">
          <div className="lg:hidden text-center mb-6 mt-12">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl ring-2 ring-blue-500/30">
              <img src="/images/logo/brgy-culiat-logo.svg" alt="Barangay Culiat Logo" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 mb-1">Barangay Culiat</h1>
            <p className="text-slate-600 text-sm">Resident Portal</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-1.5">Welcome Back</h2>
                <p className="text-slate-500 text-sm">Sign in to access your account</p>
              </div>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-2">
                  <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">!</div>
                  <p className="text-xs font-medium text-red-800">{error}</p>
                </div>
              )}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input type="text" value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} required className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm" placeholder="Enter your username" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input type={showPassword ? "text" : "password"} value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all duration-200 outline-none text-slate-900 placeholder-slate-400 text-sm" placeholder="Enter your password" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 transition-colors">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-[#1a73e8] to-[#1557b0] hover:from-[#1557b0] hover:to-[#0d47a1] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.99] mt-4 text-sm tracking-wide">
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
              <div className="mt-6 pt-4 border-t border-slate-200 text-center">
                <p className="text-xs text-slate-500">Admin? <Link to="/signin" className="text-blue-600 hover:underline font-medium">Sign in here</Link></p>
                <p className="text-xs text-slate-500 mt-2">Don't have an account? <Link to="/register" className="text-blue-600 hover:underline font-medium">Register here</Link></p>
              </div>
            </div>
            <div className="bg-slate-50/80 px-6 md:px-8 py-3 text-center border-t border-slate-200">
              <p className="text-xs text-slate-600 font-medium">© 2025 Barangay Culiat. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

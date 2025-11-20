import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { reportAPI } from "../../services/api";
import { motion } from "framer-motion";
import {
   ClipboardList,
   Plus,
   Filter,
   ArrowLeft,
   Clock,
   MapPin,
   AlertCircle,
} from "lucide-react";

const Reports = () => {
   const { user, logout, isAdmin } = useAuth();
   const navigate = useNavigate();
   const [reports, setReports] = useState([]);
   const [loading, setLoading] = useState(true);
   const [filter, setFilter] = useState({ status: "", category: "" });

   useEffect(() => {
      fetchReports();
   }, []);

   const fetchReports = async () => {
      try {
         const response = isAdmin
            ? await reportAPI.getAll()
            : await reportAPI.getMyReports();
         setReports(response.data.data);
      } catch (error) {
         console.error("Error fetching reports:", error);
      } finally {
         setLoading(false);
      }
   };

   const getStatusColor = (status) => {
      const colors = {
         pending: "#ffa500",
         "in-progress": "#1a73e8",
         resolved: "#4caf50",
         rejected: "#f44336",
      };
      return colors[status] || "#999";
   };

   const filteredReports = reports.filter((report) => {
      if (filter.status && report.status !== filter.status) return false;
      if (filter.category && report.category !== filter.category) return false;
      return true;
   });

   // Animation variants
   const fadeUp = {
      hidden: { opacity: 0, y: 40 },
      show: { opacity: 1, y: 0 },
   };

   const staggerContainer = {
      hidden: { opacity: 0 },
      show: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1,
         },
      },
   };

   const getStatusStyles = (status) => {
      const styles = {
         pending: "bg-orange-100 text-orange-700 border-orange-200",
         "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
         resolved: "bg-green-100 text-green-700 border-green-200",
         rejected: "bg-red-100 text-red-700 border-red-200",
      };
      return styles[status] || "bg-gray-100 text-gray-700 border-gray-200";
   };

   const getPriorityStyles = (priority) => {
      const styles = {
         low: "text-gray-600",
         medium: "text-yellow-600",
         high: "text-orange-600",
         urgent: "text-red-600 font-semibold",
      };
      return styles[priority] || "text-gray-600";
   };

   return (
      <div
         className="min-h-screen"
         style={{ backgroundColor: "var(--color-neutral)" }}
      >
         {/* Hero Section */}
         <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative text-white overflow-hidden"
            style={{
               background:
                  "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-glow) 100%)",
            }}
         >
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-10">
               <div
                  className="absolute inset-0"
                  style={{
                     backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                     backgroundSize: "40px 40px",
                  }}
               ></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-28 text-center">
               {/* Animated Icon Badge */}
               <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
               >
                  <ClipboardList className="w-8 h-8 md:w-10 md:h-10" />
               </motion.div>

               {/* Title */}
               <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 max-w-3xl mx-auto"
               >
                  {isAdmin ? "All Reports" : "My Reports"}
               </motion.h1>

               {/* Description */}
               <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed mx-auto"
               >
                  {isAdmin
                     ? "Manage and review all community reports submitted by residents."
                     : "Track the status of your submitted reports and concerns."}
               </motion.p>
            </div>

            {/* Wave Divider */}
            <div
               className="absolute bottom-0 left-0 w-full overflow-hidden leading-none"
               style={{ transform: "rotate(180deg)" }}
            >
               <svg
                  className="relative block w-full h-12 md:h-20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
               >
                  <path
                     d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                     fill="var(--color-neutral)"
                  ></path>
               </svg>
            </div>
         </motion.section>

         {/* Content Section */}
         <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Action Bar */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5 }}
               className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
            >
               <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
               >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Back to Dashboard</span>
               </button>

               {!isAdmin && (
                  <motion.button
                     onClick={() => navigate("/reports/newReport")}
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                     style={{
                        background:
                           "linear-gradient(to right, var(--color-secondary), var(--color-secondary-glow))",
                        color: "var(--color-text-color-light)",
                     }}
                  >
                     <Plus className="w-5 h-5" />
                     New Report
                  </motion.button>
               )}
            </motion.div>

            {/* Filters */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="bg-[var(--color-light)] rounded-lg shadow-md border border-[var(--color-neutral-active)] p-4 mb-6"
            >
               <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-5 h-5 text-[var(--color-primary)]" />
                  <h3 className="font-semibold text-[var(--color-text-color)]">
                     Filters
                  </h3>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-medium text-[var(--color-text-color)] mb-2">
                        Status
                     </label>
                     <select
                        value={filter.status}
                        onChange={(e) =>
                           setFilter({ ...filter, status: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-[var(--color-neutral-active)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none"
                     >
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="rejected">Rejected</option>
                     </select>
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-[var(--color-text-color)] mb-2">
                        Category
                     </label>
                     <select
                        value={filter.category}
                        onChange={(e) =>
                           setFilter({ ...filter, category: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-[var(--color-neutral-active)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none"
                     >
                        <option value="">All Categories</option>
                        <option value="infrastructure">Infrastructure</option>
                        <option value="safety">Safety</option>
                        <option value="health">Health</option>
                        <option value="sanitation">Sanitation</option>
                        <option value="other">Other</option>
                     </select>
                  </div>
               </div>
            </motion.div>

            {/* Reports List */}
            {loading ? (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center py-20"
               >
                  <div className="text-center">
                     <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                     <p className="text-[var(--color-text-secondary)]">
                        Loading reports...
                     </p>
                  </div>
               </motion.div>
            ) : filteredReports.length === 0 ? (
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[var(--color-light)] rounded-lg shadow-md border border-[var(--color-neutral-active)] p-12 text-center"
               >
                  <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-[var(--color-text-color)] mb-2">
                     No reports found
                  </h3>
                  <p className="text-[var(--color-text-secondary)] mb-6">
                     {filter.status || filter.category
                        ? "Try adjusting your filters to see more results."
                        : "You haven't submitted any reports yet."}
                  </p>
                  {!isAdmin && (
                     <motion.button
                        onClick={() => navigate("/reports/newReport")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                        style={{
                           background:
                              "linear-gradient(to right, var(--color-secondary), var(--color-secondary-glow))",
                           color: "var(--color-text-color-light)",
                        }}
                     >
                        Submit Your First Report
                     </motion.button>
                  )}
               </motion.div>
            ) : (
               <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="grid gap-4 md:gap-6"
               >
                  {filteredReports.map((report, index) => (
                     <motion.div
                        key={report._id}
                        variants={fadeUp}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        onClick={() => navigate(`/reports/${report._id}`)}
                        className="bg-[var(--color-light)] rounded-lg shadow-md hover:shadow-xl border border-[var(--color-neutral-active)] p-6 cursor-pointer transition-all"
                     >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                           <div className="flex-1">
                              <h3 className="text-xl font-bold text-[var(--color-text-color)] mb-2 hover:text-[var(--color-primary)] transition-colors">
                                 {report.title}
                              </h3>
                              <p className="text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
                                 {report.description}
                              </p>
                           </div>
                           <span
                              className={`px-4 py-1.5 rounded-full text-sm font-semibold border whitespace-nowrap ${getStatusStyles(
                                 report.status
                              )}`}
                           >
                              {report.status}
                           </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                           <span className="flex items-center gap-1.5 capitalize">
                              <Filter className="w-4 h-4" />
                              {report.category}
                           </span>
                           <span
                              className={`flex items-center gap-1.5 capitalize ${getPriorityStyles(
                                 report.priority
                              )}`}
                           >
                              <AlertCircle className="w-4 h-4" />
                              {report.priority} Priority
                           </span>
                           <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              {new Date(report.createdAt).toLocaleDateString()}
                           </span>
                        </div>

                        {isAdmin && report.reportedBy && (
                           <div className="mt-4 pt-4 border-t border-[var(--color-neutral-active)] text-sm text-[var(--color-text-secondary)] italic">
                              Reported by:{" "}
                              <span className="font-medium">
                                 {report.reportedBy.firstName}{" "}
                                 {report.reportedBy.lastName}
                              </span>
                           </div>
                        )}
                     </motion.div>
                  ))}
               </motion.div>
            )}

            {/* Results Count */}
            {!loading && filteredReports.length > 0 && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-8 text-sm text-[var(--color-text-secondary)]"
               >
                  Showing {filteredReports.length} of {reports.length} report
                  {reports.length !== 1 ? "s" : ""}
               </motion.div>
            )}
         </div>
      </div>
   );
};

export default Reports;

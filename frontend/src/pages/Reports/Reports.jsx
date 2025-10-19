import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { reportAPI } from "../../services/api";

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

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h2 style={styles.navTitle}>Barangay Culiat</h2>
        <div style={styles.navRight}>
          <span style={styles.userName}>
            {user?.firstName} {user?.lastName}
          </span>
          <button onClick={() => logout()} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </nav>

      <div style={styles.content}>
        <button
          onClick={() => navigate("/dashboard")}
          style={styles.backButton}
        >
          ← Back to Dashboard
        </button>

        <div style={styles.header}>
          <h1>{isAdmin ? "All Reports" : "My Reports"}</h1>
          {!isAdmin && (
            <button
              onClick={() => navigate("/reports/new")}
              style={styles.newButton}
            >
              + New Report
            </button>
          )}
        </div>

        <div style={styles.filters}>
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            style={styles.select}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            style={styles.select}
          >
            <option value="">All Categories</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="safety">Safety</option>
            <option value="health">Health</option>
            <option value="sanitation">Sanitation</option>
            <option value="other">Other</option>
          </select>
        </div>

        {loading ? (
          <p>Loading reports...</p>
        ) : filteredReports.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No reports found.</p>
            {!isAdmin && (
              <button
                onClick={() => navigate("/reports/new")}
                style={styles.newButton}
              >
                Submit Your First Report
              </button>
            )}
          </div>
        ) : (
          <div style={styles.reportList}>
            {filteredReports.map((report) => (
              <div
                key={report._id}
                style={styles.reportCard}
                onClick={() => navigate(`/reports/${report._id}`)}
              >
                <div style={styles.reportHeader}>
                  <h3>{report.title}</h3>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: getStatusColor(report.status),
                    }}
                  >
                    {report.status}
                  </span>
                </div>
                <p style={styles.reportDesc}>
                  {report.description.substring(0, 100)}...
                </p>
                <div style={styles.reportFooter}>
                  <span style={styles.category}>{report.category}</span>
                  <span style={styles.priority}>
                    Priority: {report.priority}
                  </span>
                  <span style={styles.date}>
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {isAdmin && report.reportedBy && (
                  <div style={styles.reportedBy}>
                    Reported by: {report.reportedBy.firstName}{" "}
                    {report.reportedBy.lastName}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  nav: {
    backgroundColor: "#1a73e8",
    color: "white",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navTitle: {
    margin: 0,
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  userName: {
    fontSize: "0.9rem",
  },
  logoutButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "white",
    color: "#1a73e8",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  content: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  backButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "white",
    color: "#1a73e8",
    border: "1px solid #1a73e8",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  newButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  filters: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  select: {
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  emptyState: {
    textAlign: "center",
    padding: "3rem",
    backgroundColor: "white",
    borderRadius: "8px",
  },
  reportList: {
    display: "grid",
    gap: "1rem",
  },
  reportCard: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  reportHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  statusBadge: {
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: "12px",
    fontSize: "0.85rem",
  },
  reportDesc: {
    color: "#666",
    marginBottom: "1rem",
  },
  reportFooter: {
    display: "flex",
    gap: "1rem",
    fontSize: "0.85rem",
    color: "#999",
  },
  category: {
    textTransform: "capitalize",
  },
  priority: {
    textTransform: "capitalize",
  },
  date: {},
  reportedBy: {
    marginTop: "0.5rem",
    fontSize: "0.85rem",
    color: "#666",
    fontStyle: "italic",
  },
};

export default Reports;

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { announcementAPI } from '../services/api';

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await announcementAPI.getPublished();
      setAnnouncements(response.data.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h2 style={styles.navTitle}>Barangay Culiat</h2>
        <div style={styles.navRight}>
          <span style={styles.userName}>
            {user?.firstName} {user?.lastName} ({user?.role})
          </span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </nav>

      <div style={styles.content}>
        <div style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Menu</h3>
          <ul style={styles.menu}>
            <li style={styles.menuItem} onClick={() => navigate('/dashboard')}>
              📊 Dashboard
            </li>
            <li style={styles.menuItem} onClick={() => navigate('/announcements')}>
              📢 Announcements
            </li>
            <li style={styles.menuItem} onClick={() => navigate('/reports')}>
              📝 {isAdmin ? 'All Reports' : 'My Reports'}
            </li>
            {isAdmin && (
              <>
                <li style={styles.menuItem} onClick={() => navigate('/admin/announcements')}>
                  ⚙️ Manage Announcements
                </li>
                <li style={styles.menuItem} onClick={() => navigate('/admin/reports')}>
                  ⚙️ Manage Reports
                </li>
              </>
            )}
            <li style={styles.menuItem} onClick={() => navigate('/profile')}>
              👤 Profile
            </li>
          </ul>
        </div>

        <div style={styles.main}>
          <h1 style={styles.pageTitle}>Welcome to Barangay Culiat Web System</h1>
          
          <div style={styles.welcomeCard}>
            <h2>Hello, {user?.firstName}!</h2>
            <p>Welcome to the Barangay Culiat online services portal.</p>
            {isAdmin ? (
              <p>As an admin, you can manage reports and announcements.</p>
            ) : (
              <p>As a resident, you can submit reports and view announcements.</p>
            )}
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Recent Announcements</h2>
            {loading ? (
              <p>Loading announcements...</p>
            ) : announcements.length === 0 ? (
              <p>No announcements available.</p>
            ) : (
              <div style={styles.announcementList}>
                {announcements.slice(0, 3).map((announcement) => (
                  <div key={announcement._id} style={styles.announcementCard}>
                    <div style={styles.announcementHeader}>
                      <h3>{announcement.title}</h3>
                      <span style={styles.badge}>{announcement.category}</span>
                    </div>
                    <p style={styles.announcementContent}>
                      {announcement.content.substring(0, 150)}...
                    </p>
                    <span style={styles.date}>
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => navigate('/announcements')}
              style={styles.viewAllButton}
            >
              View All Announcements
            </button>
          </div>

          <div style={styles.quickActions}>
            <h2 style={styles.sectionTitle}>Quick Actions</h2>
            <div style={styles.actionButtons}>
              <button
                onClick={() => navigate('/reports/new')}
                style={styles.actionButton}
              >
                📝 Submit New Report
              </button>
              <button
                onClick={() => navigate('/reports')}
                style={styles.actionButton}
              >
                📋 View My Reports
              </button>
              <button
                onClick={() => navigate('/announcements')}
                style={styles.actionButton}
              >
                📢 View Announcements
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  nav: {
    backgroundColor: '#1a73e8',
    color: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navTitle: {
    margin: 0,
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userName: {
    fontSize: '0.9rem',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
    color: '#1a73e8',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    minHeight: 'calc(100vh - 70px)',
  },
  sidebar: {
    width: '250px',
    backgroundColor: 'white',
    padding: '1.5rem',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  },
  sidebarTitle: {
    marginBottom: '1rem',
    color: '#333',
  },
  menu: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  menuItem: {
    padding: '0.75rem',
    marginBottom: '0.5rem',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  },
  main: {
    flex: 1,
    padding: '2rem',
  },
  pageTitle: {
    color: '#333',
    marginBottom: '1.5rem',
  },
  welcomeCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  section: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    color: '#333',
    marginBottom: '1rem',
  },
  announcementList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1rem',
  },
  announcementCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  announcementHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  badge: {
    backgroundColor: '#1a73e8',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
  },
  announcementContent: {
    color: '#666',
    marginBottom: '0.5rem',
  },
  date: {
    color: '#999',
    fontSize: '0.85rem',
  },
  viewAllButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  quickActions: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  actionButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  actionButton: {
    padding: '1rem 1.5rem',
    backgroundColor: '#fff',
    color: '#1a73e8',
    border: '2px solid #1a73e8',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Dashboard;

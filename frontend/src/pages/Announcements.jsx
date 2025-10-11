import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { announcementAPI } from '../services/api';

const Announcements = () => {
  const { user, logout } = useAuth();
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

  const getPriorityColor = (priority) => {
    const colors = {
      normal: '#4caf50',
      important: '#ff9800',
      urgent: '#f44336',
    };
    return colors[priority] || '#999';
  };

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
        <button onClick={() => navigate('/dashboard')} style={styles.backButton}>
          ← Back to Dashboard
        </button>

        <h1>Barangay Announcements</h1>
        <p style={styles.subtitle}>
          Stay updated with the latest announcements and news from Barangay Culiat.
        </p>

        {loading ? (
          <p>Loading announcements...</p>
        ) : announcements.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No announcements available at this time.</p>
          </div>
        ) : (
          <div style={styles.announcementList}>
            {announcements.map((announcement) => (
              <div key={announcement._id} style={styles.announcementCard}>
                <div style={styles.header}>
                  <div>
                    <h2 style={styles.title}>{announcement.title}</h2>
                    <div style={styles.meta}>
                      <span style={styles.category}>{announcement.category}</span>
                      <span
                        style={{
                          ...styles.priorityBadge,
                          backgroundColor: getPriorityColor(announcement.priority),
                        }}
                      >
                        {announcement.priority}
                      </span>
                      <span style={styles.date}>
                        {new Date(announcement.publishDate || announcement.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={styles.content}>
                  <p style={styles.announcementContent}>{announcement.content}</p>
                </div>
                {announcement.expiryDate && (
                  <div style={styles.footer}>
                    <span style={styles.expiry}>
                      Valid until: {new Date(announcement.expiryDate).toLocaleDateString()}
                    </span>
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
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
    color: '#1a73e8',
    border: '1px solid #1a73e8',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  subtitle: {
    color: '#666',
    marginBottom: '2rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '8px',
  },
  announcementList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  announcementCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  header: {
    marginBottom: '1rem',
  },
  title: {
    color: '#333',
    marginBottom: '0.5rem',
  },
  meta: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  category: {
    textTransform: 'capitalize',
    color: '#666',
    fontSize: '0.9rem',
  },
  priorityBadge: {
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
    textTransform: 'capitalize',
  },
  date: {
    color: '#999',
    fontSize: '0.85rem',
  },
  announcementContent: {
    lineHeight: '1.6',
    color: '#444',
    whiteSpace: 'pre-wrap',
  },
  footer: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #eee',
  },
  expiry: {
    color: '#999',
    fontSize: '0.85rem',
    fontStyle: 'italic',
  },
};

export default Announcements;

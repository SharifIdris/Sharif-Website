import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState({ connected: false, message: 'Checking database connection...' });
  const navigate = useNavigate();

  useEffect(() => {
    const identity = window.netlifyIdentity;
    if (identity) {
      const onInit = user => {
        setUser(user);
        setLoading(false);
        if (user) {
          checkDatabaseConnection();
        }
      };
      const onLogin = user => {
        setUser(user);
        setLoading(false);
        checkDatabaseConnection();
      };
      const onLogout = () => {
        setUser(null);
        navigate('/');
      };

      identity.on('init', onInit);
      identity.on('login', onLogin);
      identity.on('logout', onLogout);

      // Initialize the identity widget
      identity.init();

      // Cleanup listeners on component unmount
      return () => {
        identity.off('init', onInit);
        identity.off('login', onLogin);
        identity.off('logout', onLogout);
      };
    } else {
      // If Netlify Identity is not available for any reason
      setLoading(false);
    }
  }, [navigate]);

  const checkDatabaseConnection = () => {
    fetch('/api/test-db')
      .then(response => response.json())
      .then(data => {
        setDbStatus({
          connected: true,
          message: `Connected to ${data.database} (${data.timestamp})`
        });
      })
      .catch(error => {
        console.error('Database connection error:', error);
        setDbStatus({
          connected: false,
          message: 'Failed to connect to database. Check console for details.'
        });
      });
  };

  // If loading, show loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If not logged in, show login button
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Login Required</h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          You need to be logged in as an administrator to access this page.
        </p>
        <button
          onClick={() => window.netlifyIdentity.open()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 pt-24 pb-12 px-4"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center">
              <span className="text-gray-600 mr-4">Logged in as {user.email}</span>
              <button
                onClick={() => window.netlifyIdentity.logout()}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm transition-colors duration-300"
              >
                Log Out
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AdminCard
              title="Projects"
              description="Manage your portfolio projects"
              icon="briefcase"
              link="/admin/projects"
            />
            <AdminCard
              title="Blog Posts"
              description="Create and edit blog content"
              icon="edit"
              link="/admin/blog"
            />
            <AdminCard
              title="Services"
              description="Update your service offerings"
              icon="cogs"
              link="/admin/services"
            />
            <AdminCard
              title="Certificates"
              description="Manage your certifications"
              icon="certificate"
              link="/admin/certificates"
            />
            <AdminCard
              title="Profile"
              description="Update your personal information"
              icon="user"
              link="/admin/profile"
            />
            <AdminCard
              title="Testimonials"
              description="Manage client testimonials"
              icon="quote-right"
              link="/admin/testimonials"
            />
            <AdminCard
              title="Media"
              description="Upload and manage images"
              icon="images"
              link="/admin/media"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              onClick={() => {
                fetch('/api/migrate', {
                  headers: {
                    Authorization: `Bearer ${user.token.access_token}`
                  }
                })
                  .then(response => response.json())
                  .then(data => {
                    alert(data.message || 'Migration completed');
                  })
                  .catch(error => {
                    console.error('Error during migration:', error);
                    alert('Error during migration. Check console for details.');
                  });
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-300"
            >
              Migrate Content
            </button>
            <button
              onClick={() => {
                fetch('/api/init-db')
                  .then(response => response.json())
                  .then(data => {
                    alert(data.message || 'Database initialized successfully');
                    checkDatabaseConnection();
                  })
                  .catch(error => {
                    console.error('Error initializing database:', error);
                    alert('Error initializing database. Check console for details.');
                  });
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-300"
            >
              Initialize Database
            </button>
            <button
              onClick={() => window.open('/', '_blank')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm transition-colors duration-300"
            >
              View Site
            </button>
          </div>
          
          <div className={`${dbStatus.connected ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-md p-4`}>
            <div className="flex items-center">
              <div className={`w-3 h-3 ${dbStatus.connected ? 'bg-green-500' : 'bg-red-500'} rounded-full mr-2`}></div>
              <span className={`font-medium ${dbStatus.connected ? 'text-green-700' : 'text-red-700'}`}>
                {dbStatus.connected ? 'Database Connected' : 'Database Connection Issue'}
              </span>
            </div>
            <p className={`${dbStatus.connected ? 'text-green-600' : 'text-red-600'} text-sm mt-1`}>
              {dbStatus.message}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Admin card component
const AdminCard = ({ title, description, icon, link }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 cursor-pointer"
      onClick={() => navigate(link)}
    >
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <i className={`fas fa-${icon} text-blue-500 text-xl`}></i>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default AdminDashboard;
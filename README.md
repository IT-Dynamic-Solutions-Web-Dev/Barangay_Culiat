# Barangay Culiat Web System

A comprehensive MERN stack web application that allows residents to access barangay services online, ensures privacy, and gives admins control over reports and announcements — all under a secure, role-based system.

## Features

### For Residents
- **User Authentication**: Secure registration and login system
- **Submit Reports**: Report issues like infrastructure problems, safety concerns, health issues, sanitation, etc.
- **View Reports**: Track the status of submitted reports
- **View Announcements**: Stay updated with barangay announcements and news
- **Privacy Protection**: All reports are kept private between the resident and administrators
- **Profile Management**: Update personal information

### For Administrators
- **Manage Reports**: View all reports, update status, assign reports, and add comments
- **Manage Announcements**: Create, publish, update, and delete announcements
- **User Management**: Control access through role-based authentication
- **Dashboard**: Monitor all activities and reports at a glance

## Technology Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: UI library
- **Vite**: Build tool and development server
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Context API**: State management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/IT-Dynamic-Solutions-Web-Dev/Barangay_Culiat.git
cd Barangay_Culiat
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration
```

Configure your `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/barangay_culiat
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=development
```

Note: There is a detailed backend README available at `backend/README.md` with additional setup, scripts, seed instructions and troubleshooting tips. Check that file for environment-specific guidance.

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

### Running the Application

1. **Start MongoDB** (if running locally)
```bash
mongod
```

2. **Start Backend Server**
```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```

3. **Start Frontend Development Server**
```bash
cd frontend
npm run dev
# Frontend will run on http://localhost:5173
```

4. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Logs / Auditing
- `GET /api/logs` - Get audit logs (admin/superadmin only)
- `POST /api/logs` - Create log entry (admin/superadmin only). The backend also writes logs automatically for key actions such as account creation and barangay ID request lifecycle events.

### TEST LANG TO. DON'T LOOK AT THIS MUCH
### Barangay ID Requests
- `POST /api/barangay-id-requests` - Create barangay ID request (resident)
- `GET /api/barangay-id-requests` - List requests (admin)
- `GET /api/barangay-id-requests/:id` - Get a single request (admin/resident)
- `PUT /api/barangay-id-requests/:id/status` - Update request status (admin)
- `DELETE /api/barangay-id-requests/:id` - Delete request (admin)

### Reports
- `POST /api/reports` - Create new report (protected)
- `GET /api/reports` - Get all reports (admin only)
- `GET /api/reports/my-reports` - Get user's reports (protected)
- `GET /api/reports/:id` - Get single report (protected)
- `PUT /api/reports/:id/status` - Update report status (admin only)
- `POST /api/reports/:id/comments` - Add comment to report (protected)
- `DELETE /api/reports/:id` - Delete report (admin only)

### Announcements
- `POST /api/announcements` - Create announcement (admin only)
- `GET /api/announcements` - Get published announcements
- `GET /api/announcements/all` - Get all announcements (admin only)
- `GET /api/announcements/:id` - Get single announcement (protected)
- `PUT /api/announcements/:id` - Update announcement (admin only)
- `PUT /api/announcements/:id/publish` - Toggle publish status (admin only)
- `DELETE /api/announcements/:id` - Delete announcement (admin only)

## Security Features

- **Password Hashing**: Passwords are hashed using bcryptjs before storage
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control (RBAC)**: Different permissions for admin and resident roles
- **Private Reports**: Reports are only visible to the reporter and administrators
- **Input Validation**: All inputs are validated on both client and server
- **CORS Configuration**: Controlled cross-origin resource sharing

## Project Structure

```
Barangay_Culiat/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── reportController.js   # Report management logic
│   │   └── announcementController.js
│   ├── middleware/
│   │   └── auth.js               # Authentication & authorization
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Report.js             # Report schema
│   │   └── Announcement.js       # Announcement schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── reports.js            # Report routes
│   │   └── announcements.js      # Announcement routes
│   ├── .env.example              # Environment variables template
│   ├── server.js                 # Express server setup
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── PrivateRoute.jsx  # Route protection component
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Authentication context
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   ├── Dashboard.jsx     # Main dashboard
│   │   │   ├── Reports.jsx       # Reports list page
│   │   │   ├── NewReport.jsx     # Create report page
│   │   │   └── Announcements.jsx # Announcements page
│   │   ├── services/
│   │   │   └── api.js            # API service layer
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   └── package.json
│
├── .gitignore
└── README.md
```

## Default User Roles

- **Admin**: Full access to all features including report and announcement management
- **Resident**: Can submit reports, view own reports, and view published announcements

## Future Enhancements

- Document request and processing system
- Real-time notifications
- File upload support for reports
- Advanced search and filtering
- Report analytics and statistics
- Mobile app version
- Email notifications
- SMS integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Contact

For any queries or support, please contact the Barangay Culiat IT Team.

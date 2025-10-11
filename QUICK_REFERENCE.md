# Quick Reference Guide

## 🚀 Quick Start Commands

### Initial Setup
```bash
# Clone and enter directory
git clone https://github.com/IT-Dynamic-Solutions-Web-Dev/Barangay_Culiat.git
cd Barangay_Culiat

# Install all dependencies
npm run install-all

# Setup backend .env
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Seed database with sample data (optional)
npm run seed
```

### Development
```bash
# Terminal 1: Start Backend (from backend/)
npm run dev        # Runs on http://localhost:5000

# Terminal 2: Start Frontend (from frontend/)
npm run dev        # Runs on http://localhost:5173
```

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# Start backend in production
cd ../backend
npm start
```

## 🔑 Test Credentials (After Seeding)

**Admin Account:**
- Email: `admin@barangay.com`
- Password: `admin123`

**Resident Account:**
- Email: `juan@example.com`
- Password: `password123`

## 📂 Project Structure

```
Barangay_Culiat/
├── backend/           # Node.js + Express API
│   ├── config/        # Database config
│   ├── controllers/   # Business logic
│   ├── middleware/    # Auth middleware
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API routes
│   ├── server.js      # Entry point
│   └── seed.js        # Database seeder
│
├── frontend/          # React + Vite UI
│   └── src/
│       ├── components/  # Reusable components
│       ├── context/     # State management
│       ├── pages/       # Page components
│       └── services/    # API calls
│
└── Documentation files
```

## 🔌 API Endpoints Cheat Sheet

### Authentication
```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user
GET    /api/auth/me          # Get current user (protected)
PUT    /api/auth/profile     # Update profile (protected)
```

### Reports
```
POST   /api/reports                # Create report (protected)
GET    /api/reports                # Get all reports (admin)
GET    /api/reports/my-reports     # Get my reports (resident)
GET    /api/reports/:id            # Get single report (protected)
PUT    /api/reports/:id/status     # Update status (admin)
POST   /api/reports/:id/comments   # Add comment (protected)
DELETE /api/reports/:id            # Delete report (admin)
```

### Announcements
```
POST   /api/announcements             # Create (admin)
GET    /api/announcements             # Get published (public)
GET    /api/announcements/all         # Get all (admin)
GET    /api/announcements/:id         # Get single (protected)
PUT    /api/announcements/:id         # Update (admin)
PUT    /api/announcements/:id/publish # Toggle publish (admin)
DELETE /api/announcements/:id         # Delete (admin)
```

## 🛠️ Common Tasks

### Add New Admin User
```javascript
// In MongoDB shell (mongosh)
use barangay_culiat
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)
```

### Reset Database
```bash
cd backend
npm run seed
```

### Check Backend Logs
```bash
cd backend
npm run dev
# Watch terminal for logs
```

### Test API with cURL
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@barangay.com","password":"admin123"}'

# Get announcements
curl http://localhost:5000/api/announcements
```

## 🔒 Environment Variables

**Backend (.env)**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/barangay_culiat
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## 📊 Data Models

### Report Categories
- infrastructure
- safety
- health
- sanitation
- other

### Report Status
- pending
- in-progress
- resolved
- rejected

### Priority Levels
- low
- medium
- high
- urgent

### User Roles
- admin (full access)
- resident (limited access)

## 🐛 Troubleshooting

**MongoDB Connection Error**
```bash
# Check MongoDB is running
mongosh
# Or start MongoDB service
sudo systemctl start mongod
```

**Port Already in Use**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
# Or change PORT in .env
```

**Frontend Build Error**
```bash
cd frontend
rm -rf node_modules
npm install
npm run build
```

**Clear Browser Storage**
```javascript
// In browser console
localStorage.clear()
location.reload()
```

## 📚 Documentation Files

- **README.md** - Project overview
- **SETUP.md** - Installation guide
- **API_DOCUMENTATION.md** - API reference
- **PROJECT_SUMMARY.md** - Technical summary
- **QUICK_REFERENCE.md** - This file

## 🔗 Useful Links

- Backend: http://localhost:5000
- Frontend: http://localhost:5173
- API Health: http://localhost:5000/api/health

## 💡 Tips

1. Always run both backend and frontend servers
2. Use the seed script to populate test data
3. Check browser console for frontend errors
4. Check terminal for backend errors
5. Use MongoDB Compass for database visualization
6. Test APIs with Postman or Insomnia
7. Keep .env file secure and never commit it

## 🎯 Feature Checklist

- [x] User authentication (register/login)
- [x] Role-based access control
- [x] Report submission and management
- [x] Announcement creation and publishing
- [x] Privacy controls on reports
- [x] Status tracking for reports
- [x] Comment system
- [x] Filtering and categorization
- [x] Responsive UI design
- [x] Comprehensive documentation

---

**Need Help?** Check the SETUP.md or API_DOCUMENTATION.md for detailed information.

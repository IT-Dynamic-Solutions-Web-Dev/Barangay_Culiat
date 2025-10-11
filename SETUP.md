# Barangay Culiat Web System - Setup Guide

## Quick Start

Follow these steps to get the Barangay Culiat Web System up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (local or cloud) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/IT-Dynamic-Solutions-Web-Dev/Barangay_Culiat.git
cd Barangay_Culiat
```

### 2. Install Dependencies

You can install all dependencies at once or separately:

**Option A: Install All at Once (Recommended)**
```bash
npm run install-all
```

**Option B: Install Separately**
```bash
# Install backend dependencies
npm run install-backend

# Install frontend dependencies
npm run install-frontend
```

### 3. Set Up MongoDB

**Option A: Local MongoDB**
1. Install MongoDB Community Edition on your machine
2. Start MongoDB service:
   - **Windows**: MongoDB should start automatically as a service
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Set up a database user
4. Whitelist your IP address
5. Get your connection string

### 4. Configure Backend Environment

1. Navigate to the backend directory:
```bash
cd backend
```

2. Copy the example environment file:
```bash
cp .env.example .env
```

3. Edit the `.env` file with your configuration:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/barangay_culiat
# For MongoDB Atlas, use: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/barangay_culiat

JWT_SECRET=your_secure_random_jwt_secret_key_here_change_this
NODE_ENV=development
```

**Important**: Generate a strong JWT secret. You can use:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Start the Application

You need to run both backend and frontend servers. Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
The backend will run on: http://localhost:5000

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm run dev
```
The frontend will run on: http://localhost:5173

### 6. Access the Application

Open your web browser and navigate to:
```
http://localhost:5173
```

## Creating Admin Account

Since the system uses role-based access, you'll need to create an admin account. There are two ways:

### Option 1: Register and Manually Update Role in Database

1. Register a new account through the registration page
2. Connect to MongoDB:
   ```bash
   mongosh  # or mongo for older versions
   ```
3. Switch to the barangay_culiat database:
   ```javascript
   use barangay_culiat
   ```
4. Update the user role to admin:
   ```javascript
   db.users.updateOne(
     { email: "your-admin-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

### Option 2: Create Admin User via MongoDB

1. Connect to MongoDB:
   ```bash
   mongosh
   ```
2. Switch to the barangay_culiat database:
   ```javascript
   use barangay_culiat
   ```
3. Insert an admin user (password: "admin123" - **change this!**):
   ```javascript
   db.users.insertOne({
     firstName: "Admin",
     lastName: "User",
     email: "admin@barangay.com",
     password: "$2a$10$YourHashedPasswordHere",
     role: "admin",
     isActive: true,
     createdAt: new Date(),
     updatedAt: new Date()
   })
   ```

**Note**: The password needs to be hashed. It's easier to use Option 1.

## Testing the System

### Test as Resident
1. Register a new account
2. Login with your credentials
3. Submit a test report
4. View announcements

### Test as Admin
1. Login with admin credentials
2. View all reports
3. Create announcements
4. Update report status

## Default Ports

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017 (if running locally)

## Troubleshooting

### MongoDB Connection Error

**Error**: `MongoServerError: connect ECONNREFUSED`

**Solution**:
- Ensure MongoDB is running
- Check if the MONGO_URI in `.env` is correct
- For local MongoDB: `mongodb://localhost:27017/barangay_culiat`
- For MongoDB Atlas: Use the connection string from your cluster

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
- Change the PORT in backend/.env to a different number (e.g., 5001)
- Or stop the process using that port

### CORS Error

**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution**:
- Ensure the backend server is running
- Check that CORS is properly configured in `backend/server.js`

### JWT Token Error

**Error**: `jwt malformed` or `invalid signature`

**Solution**:
- Clear browser localStorage
- Ensure JWT_SECRET in `.env` is set and consistent
- Try logging out and logging back in

## Development Tips

### Hot Reloading
- Backend uses `nodemon` for automatic restart on file changes
- Frontend uses Vite's HMR (Hot Module Replacement) for instant updates

### API Testing
You can test the API endpoints using tools like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- cURL commands

### Database Management
View and manage your data using:
- [MongoDB Compass](https://www.mongodb.com/products/compass) (GUI)
- mongosh (MongoDB Shell)

## Production Deployment

For production deployment:

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Set environment variables:
```env
NODE_ENV=production
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_production_secret
```

3. Use a process manager like PM2 for the backend:
```bash
npm install -g pm2
pm2 start backend/server.js --name barangay-api
```

4. Serve the frontend build with a web server (Nginx, Apache, etc.)

## Getting Help

If you encounter any issues:
1. Check the console logs in the browser (F12)
2. Check the terminal where the backend is running
3. Review the MongoDB logs
4. Refer to the main README.md for more information

## Next Steps

After successful setup:
1. Create your admin account
2. Explore the features
3. Customize the system to your needs
4. Add more features as required

Happy coding! 🚀

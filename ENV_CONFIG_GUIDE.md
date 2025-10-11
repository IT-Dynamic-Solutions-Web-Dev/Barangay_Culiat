# Environment Configuration Guide

This project uses environment-specific configuration files to automatically switch between local development and production settings.

## Backend Configuration

### Environment Files

- **`.env.development`** - Local development settings (localhost, local MongoDB)
- **`.env.production`** - Production settings (domain, MongoDB Atlas)

### Usage

**Local Development:**
```bash
npm run dev          # Runs with .env.local
npm run dev:watch    # Runs with nodemon and .env.local
npm run seed         # Seeds database using .env.local
```

**Production:**
```bash
npm start           # Runs with .env.production
npm run seed:prod   # Seeds database using .env.production
```

### Backend Environment Variables

- `NODE_ENV` - Environment mode (development/production)
- `PORT` - Server port (default: 5000)
- `DB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CORS_ORIGIN` - Allowed CORS origins

## Frontend Configuration

### Environment Files

- **`.env.development`** - Local development settings (localhost API)
- **`.env.production`** - Production settings (production API domain)

### Usage

**Local Development:**
```bash
npm run dev              # Runs in development mode (uses .env.development)
npm run build:dev        # Builds for local testing
```

**Production:**
```bash
npm run build            # Builds for production (uses .env.production)
npm run preview          # Preview production build
```

### Frontend Environment Variables

- `VITE_API_URL` - Backend API URL
- `VITE_APP_ENV` - Application environment

## Setup Instructions

### 1. Backend Setup

1. Copy `.env.local` and configure for your local setup:
   ```properties
   NODE_ENV=development
   PORT=5000
   DB_URI=mongodb://localhost:27017/barangay_culiat
   JWT_SECRET=your_local_secret
   CORS_ORIGIN=http://localhost:5173
   ```

2. Copy `.env.production` and configure for production:
   ```properties
   NODE_ENV=production
   PORT=5000
   DB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database
   JWT_SECRET=your_strong_production_secret
   CORS_ORIGIN=https://yourdomain.com
   ```

### 2. Frontend Setup

1. Configure `.env.development`:
   ```properties
   VITE_API_URL=http://localhost:5000
   VITE_APP_ENV=development
   ```

2. Configure `.env.production` with your production domain:
   ```properties
   VITE_API_URL=https://api.yourdomain.com
   VITE_APP_ENV=production
   ```

## Git Configuration

Add to `.gitignore` (if not already present):
```
# Environment files
.env
.env.local
.env.production
.env.*.local
```

**Important:** Never commit sensitive credentials to git. Share environment templates without actual credentials.

## Switching Environments

The environment is automatically selected based on the npm script you use:

- Use `npm run dev` for local development
- Use `npm start` or `npm run build` for production

No manual switching required!

## Deployment Notes

### Backend Deployment

1. Upload `.env.production` to your server
2. Run `npm start` to use production settings
3. Ensure MongoDB Atlas is accessible from your server

### Frontend Deployment

1. Run `npm run build` locally or in CI/CD
2. The build will automatically use `.env.production`
3. Deploy the `dist` folder to your hosting service

## Troubleshooting

- **API connection issues**: Check `VITE_API_URL` in frontend env file
- **CORS errors**: Verify `CORS_ORIGIN` in backend env file matches frontend URL
- **Database connection**: Ensure `DB_URI` is correct and MongoDB is accessible
- **Environment not loading**: Check that you're using the correct npm script

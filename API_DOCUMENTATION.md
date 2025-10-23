# Barangay Culiat Web System - API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Response Format

All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (development only)"
}
```

---

## Authentication Endpoints

### Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Auth**: Public
- **Body**:
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "address": "string (optional)",
  "phoneNumber": "string (optional)"
}
```
- **Success Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "user_id",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "role": "resident",
    "token": "jwt_token"
  }
}
```

Note: Successful account creation will generate a `CREATE_ACCOUNT` log entry. Admin-created accounts (via the admin register endpoint) will also log the admin who performed the action.

Example log entry created on account registration:
```json
{
  "action": "CREATE_ACCOUNT",
  "description": "User registered: <user_id> (email@example.com)",
  "performedBy": "<user_id or admin_id>",
  "performedByRole": "Resident|Admin|SuperAdmin",
  "timestamp": "date"
}
```

### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth**: Public
- **Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "user_id",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "role": "resident|admin",
    "token": "jwt_token"
  }
}
```

### Get Current User
- **URL**: `/auth/me`
- **Method**: `GET`
- **Auth**: Required
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "role": "resident|admin",
    "address": "string",
    "phoneNumber": "string",
    "isActive": true,
    "createdAt": "date"
  }
}
```

### Update Profile
- **URL**: `/auth/profile`
- **Method**: `PUT`
- **Auth**: Required
- **Body**:
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "address": "string (optional)",
  "phoneNumber": "string (optional)"
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { ... }
}
```

---

## Report Endpoints

### Create Report
- **URL**: `/reports`
- **Method**: `POST`
- **Auth**: Required (Resident/Admin)
- **Body**:
```json
{
  "title": "string",
  "description": "string",
  "category": "infrastructure|safety|health|sanitation|other",
  "priority": "low|medium|high|urgent",
  "location": "string (optional)"
}
```
- **Success Response** (201):
```json
{
  "success": true,
  "message": "Report created successfully",
  "data": { ... }
}
```

### Get All Reports
- **URL**: `/reports`
- **Method**: `GET`
- **Auth**: Required (Admin only)
- **Query Parameters**:
  - `status`: pending|in-progress|resolved|rejected
  - `category`: infrastructure|safety|health|sanitation|other
  - `priority`: low|medium|high|urgent
- **Success Response** (200):
```json
{
  "success": true,
  "count": 10,
  "data": [ ... ]
}
```

### Get My Reports
- **URL**: `/reports/my-reports`
- **Method**: `GET`
- **Auth**: Required (Resident)
- **Success Response** (200):
```json
{
  "success": true,
  "count": 5,
  "data": [ ... ]
}
```

### Get Single Report
- **URL**: `/reports/:id`
- **Method**: `GET`
- **Auth**: Required
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "report_id",
    "title": "string",
    "description": "string",
    "category": "string",
    "status": "string",
    "priority": "string",
    "location": "string",
    "reportedBy": { ... },
    "assignedTo": { ... },
    "comments": [ ... ],
    "isPrivate": true,
    "createdAt": "date"
  }
}
```

### Update Report Status
- **URL**: `/reports/:id/status`
- **Method**: `PUT`
- **Auth**: Required (Admin only)
- **Body**:
```json
{
  "status": "pending|in-progress|resolved|rejected",
  "assignedTo": "user_id (optional)"
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Report updated successfully",
  "data": { ... }
}
```

### Add Comment to Report
- **URL**: `/reports/:id/comments`
- **Method**: `POST`
- **Auth**: Required
- **Body**:
```json
{
  "text": "string"
}
```
- **Success Response** (201):
```json
{
  "success": true,
  "message": "Comment added successfully",
  "data": { ... }
}
```

### Delete Report
- **URL**: `/reports/:id`
- **Method**: `DELETE`
- **Auth**: Required (Admin only)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Report deleted successfully"
}
```

---

## Barangay ID Request Endpoints

Endpoints for residents to request a Barangay ID and for admins to manage those requests.

### Create Barangay ID Request
- **URL**: `/barangay-id-requests`
- **Method**: `POST`
- **Auth**: Required (Resident)
- **Body** (example):
```json
{
  "firstName": "string",
  "middleName": "string (optional)",
  "lastName": "string",
  "suffix": "string (optional)",
  "completeAddress": "string",
  "sex": "Male|Female|Other",
  "placeOfBirth": "string",
  "dateOfBirth": "YYYY-MM-DD",
  "citizenship": "string",
  "civilStatus": "Single|Married|Widowed|Divorced|Separated",
  "emergencyFirstName": "string",
  "emergencyMiddleName": "string (optional)",
  "emergencyLastName": "string",
  "emergencySuffix": "string (optional)",
  "emergencyRelationship": "string",
  "emergencyContactNumber": "string"
}
```
- **Success Response** (201):
```json
{
  "success": true,
  "message": "Barangay ID request submitted successfully",
  "data": { ... }
}
```

### Get All Barangay ID Requests
- **URL**: `/barangay-id-requests`
- **Method**: `GET`
- **Auth**: Required (Admin only)
- **Success Response** (200):
```json
{
  "success": true,
  "count": 10,
  "data": [ ... ]
}
```

### Get Single Barangay ID Request
- **URL**: `/barangay-id-requests/:id`
- **Method**: `GET`
- **Auth**: Required (Admin only)
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "request_id",
    "firstName": "string",
    "middleName": "string",
    "lastName": "string",
    "suffix": "string",
    "completeAddress": "string",
    "sex": "Male|Female|Other",
    "placeOfBirth": "string",
    "dateOfBirth": "date",
    "citizenship": "string",
    "civilStatus": "string",
  "barangayIdNumber": "BID-2025-XXXXXX",
  "emergencyFirstName": "string",
  "emergencyMiddleName": "string",
  "emergencyLastName": "string",
  "emergencySuffix": "string",
  "emergencyRelationship": "string",
  "emergencyContactNumber": "string",
    "status": "Pending|Approved|Rejected",
    "requestedAt": "date",
    "reviewedAt": "date (optional)"
  }
}
```

### Update Barangay ID Request Status
- **URL**: `/barangay-id-requests/:id/status`
- **Method**: `PUT`
- **Auth**: Required (Admin only)
- **Body**:
```json
{
  "status": "Pending|Approved|Rejected"
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Barangay ID request marked as Approved",
  "data": { ... }
}
```

### Delete Barangay ID Request
- **URL**: `/barangay-id-requests/:id`
- **Method**: `DELETE`
- **Auth**: Required (Admin only)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Barangay ID request deleted successfully"
}
```

### Notes & Error Codes
- `400` - Bad Request (validation errors when creating requests)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (resident trying to access admin-only endpoints)
- `404` - Barangay ID request not found
- `500` - Internal Server Error

Image/photo uploads and proof-of-residency fields are currently commented in the model and not enforced by the controller; they may be added later.

---

## Logs Endpoints

These endpoints allow administrators to view and manage system logs. Access is restricted to `SuperAdmin` and `Admin` roles.

### Get All Logs
- **URL**: `/logs`
- **Method**: `GET`
- **Auth**: Required (Admin/SuperAdmin)
- **Success Response** (200):
```json
{
  "success": true,
  "count": 10,
  "data": [ { /* log objects */ } ]
}
```

### Get Single Log
- **URL**: `/logs/:id`
- **Method**: `GET`
- **Auth**: Required (Admin/SuperAdmin)
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "log_id",
    "action": "CREATE_ACCOUNT|REPORT|USER_ACTION|BACKUP_DATABASE|DELETE_DATABASE|OTHER",
    "description": "string",
    "performedBy": { "_id": "user_id", "firstName": "string", "lastName": "string", "email": "string" },
    "timestamp": "date"
  }
}
```

### Create Log
- **URL**: `/logs`
- **Method**: `POST`
- **Auth**: Required (Admin/SuperAdmin)
- **Body**:
```json
{
  "action": "CREATE_ACCOUNT|REPORT|USER_ACTION|BACKUP_DATABASE|DELETE_DATABASE|OTHER",
  "description": "string",
  "performedBy": "user_id"
}
```
- **Success Response** (201):
```json
{
  "success": true,
  "message": "Log created",
  "data": { /* created log */ }
}
```

### Delete Log
- **URL**: `/logs/:id`
- **Method**: `DELETE`
- **Auth**: Required (Admin/SuperAdmin)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Log deleted successfully"
}
```

### Error codes
- `401` - Unauthorized
- `403` - Forbidden (insufficient role)
- `404` - Log not found
- `500` - Internal Server Error

## Announcement Endpoints

### Create Announcement
- **URL**: `/announcements`
- **Method**: `POST`
- **Auth**: Required (Admin only)
- **Body**:
```json
{
  "title": "string",
  "content": "string",
  "category": "event|notice|alert|update|general",
  "priority": "normal|important|urgent",
  "publishDate": "date (optional)",
  "expiryDate": "date (optional)"
}
```
- **Success Response** (201):
```json
{
  "success": true,
  "message": "Announcement created successfully",
  "data": { ... }
}
```

### Get All Announcements (Admin)
- **URL**: `/announcements/all`
- **Method**: `GET`
- **Auth**: Required (Admin only)
- **Success Response** (200):
```json
{
  "success": true,
  "count": 10,
  "data": [ ... ]
}
```

### Get Published Announcements
- **URL**: `/announcements`
- **Method**: `GET`
- **Auth**: Public/Protected
- **Success Response** (200):
```json
{
  "success": true,
  "count": 8,
  "data": [ ... ]
}
```

### Get Single Announcement
- **URL**: `/announcements/:id`
- **Method**: `GET`
- **Auth**: Required
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "announcement_id",
    "title": "string",
    "content": "string",
    "category": "string",
    "priority": "string",
    "isPublished": true,
    "publishedBy": { ... },
    "publishDate": "date",
    "expiryDate": "date",
    "createdAt": "date"
  }
}
```

### Update Announcement
- **URL**: `/announcements/:id`
- **Method**: `PUT`
- **Auth**: Required (Admin only)
- **Body**:
```json
{
  "title": "string (optional)",
  "content": "string (optional)",
  "category": "string (optional)",
  "priority": "string (optional)",
  "isPublished": "boolean (optional)",
  "publishDate": "date (optional)",
  "expiryDate": "date (optional)"
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Announcement updated successfully",
  "data": { ... }
}
```

### Toggle Publish Status
- **URL**: `/announcements/:id/publish`
- **Method**: `PUT`
- **Auth**: Required (Admin only)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Announcement published/unpublished successfully",
  "data": { ... }
}
```

### Delete Announcement
- **URL**: `/announcements/:id`
- **Method**: `DELETE`
- **Auth**: Required (Admin only)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Announcement deleted successfully"
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Error Codes

Common error messages:

- `"Not authorized to access this route"` - No token or invalid token
- `"User role 'resident' is not authorized to access this route"` - Insufficient permissions
- `"Invalid credentials"` - Wrong email or password
- `"User already exists with this email"` - Email already registered
- `"Report not found"` - Invalid report ID
- `"Announcement not found"` - Invalid announcement ID

---

## Rate Limiting

Currently, there are no rate limits implemented. For production, consider implementing rate limiting to prevent abuse.

---

## CORS

The API accepts requests from all origins in development. For production, configure CORS to accept only your frontend domain.

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Create Report (Replace TOKEN)
```bash
curl -X POST http://localhost:5000/api/reports \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Street Light Issue",
    "description": "The street light is not working",
    "category": "infrastructure",
    "priority": "medium",
    "location": "Main Street"
  }'
```

### Get Published Announcements
```bash
curl -X GET http://localhost:5000/api/announcements
```

---

## Postman Collection

You can import these endpoints into Postman for easier testing. Create a collection with:
- Base URL variable: `{{base_url}}` = `http://localhost:5000/api`
- Auth token variable: `{{token}}` = Your JWT token

---

For more information, refer to the main README.md file.

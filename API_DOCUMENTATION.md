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
  "username": "string",
  "email": "string",
  "password": "string",
  "address": {
    "street": "string (optional)",
    "houseNumber": "string (optional)",
    "subdivision": "string (optional)"
  },
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
    "username": "string",
    "email": "string",
    "role": "resident",
    "token": "jwt_token"
  }
}
```

Note: The User model requires a unique `username` field. The address structure follows an atomic format with fixed barangay location (Barangay Culiat, Quezon City) and user-specific details (street, houseNumber, subdivision).

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
    "username": "string",
    "email": "string",
    "role": "resident|admin|superadmin",
    "token": "jwt_token"
  }
}
```

**Note on Roles:**
- `74932` - SuperAdmin (full system access)
- `74933` - Admin (management access)
- `74934` - Resident (basic user access)

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


## Document Request Endpoints


### Create Document Request
- **URL**: `/document-requests`
- **Method**: `POST`
- **Auth**: Required (Resident/Admin)
- **Body**:
```json
{
  "lastName": "string",
  "firstName": "string",
  "middleName": "string (optional)",
  "dateOfBirth": "YYYY-MM-DD",
  "placeOfBirth": "string",
  "gender": "male|female|other|unspecified",
  "civilStatus": "single|married|widowed|separated|domestic_partner|other",
  "nationality": "string",
  "address": "string",
  "contactNumber": "string",
  "emergencyContact": { "fullName": "string", "relationship": "string", "contactNumber": "string", "address": "string" },
  "documentType": "indigency|residency|clearance|ctc|business_permit|building_permit|good_moral",
  "purposeOfRequest": "string",
  "preferredPickupDate": "YYYY-MM-DD",
  "remarks": "string (optional)",
  "photo1x1": "picture_id (optional)",
  "validID": "picture_id (optional)",
}
```

### Notes on photo fields (photo1x1 & validID)

- The fields `photo1x1` and `validID` are not file blobs or URLs; they are ObjectId references to a separate `Picture` document stored in the database. Example value: `"photo1x1": "650a1f2b6d9e4c3b2a1f0e9d"`.
- This keeps `DocumentRequest` documents small and lets the application centralize file metadata (filename, path/url, mime type, size, uploader, createdAt) in the `Picture` model.
- Typical flow:
  1. Upload the file(s) to the upload endpoint: `POST /document-requests/upload` (multipart/form-data). The response contains the created `Picture` document including its `_id`.
  2. Create the DocumentRequest and set `photo1x1` / `validID` to the returned picture `_id` values.
  3. When reading a DocumentRequest, the server may `populate` these refs so the response includes picture metadata (and URLs) instead of raw ids.

Example upload response (successful):
```json
{
  "success": true,
  "data": {
    "_id": "650a1f2b6d9e4c3b2a1f0e9d",
    "filename": "650a1f2b6d9e4c3b2a1f0e9d.jpg",
    "url": "/uploads/document-requests/650a1f2b6d9e4c3b2a1f0e9d.jpg",
    "mimeType": "image/jpeg",
    "size": 123456
  }
}
```

If you prefer a single-step flow (upload files and create the request in one multipart/form-data request), the server can be extended to accept files on `POST /document-requests` and perform upload -> create atomically. The current API uses the two-step approach (upload then create) for simplicity and clearer file lifecycle management.
- **Success Response** (201):
```json
{
  "success": true,
  "message": "Document request created successfully",
  "data": { /* document request object */ }
}
```

### Get All Document Requests
- **URL**: `/document-requests`
- **Method**: `GET`
- **Auth**: Required (Admin only)
- **Query Parameters**:
  - `status`: pending|approved|rejected|completed|cancelled
  - `documentType`: indigency|residency|clearance|ctc|business_permit|building_permit|good_moral|other
  - `applicant`: user_id
- **Success Response** (200):
```json
{
  "success": true,
  "count": 10,
  "data": [ /* requests */ ]
}
```

### Get My Requests
- **URL**: `/document-requests/my-requests`
- **Method**: `GET`
- **Auth**: Required (Resident)
- **Success Response** (200):
```json
{
  "success": true,
  "count": 3,
  "data": [ /* user's requests */ ]
}
```

### Get Single Document Request
- **URL**: `/document-requests/:id`
- **Method**: `GET`
- **Auth**: Required
- **Success Response** (200):
```json
{
  "success": true,
  "data": { /* document request object */ }
}
```

### Update Document Request
- **URL**: `/document-requests/:id`
- **Method**: `PUT`
- **Auth**: Required (Owner/Admin)
- **Body**: same fields as create (only included fields are updated)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Document request updated successfully",
  "data": { /* updated request */ }
}
```

### Update Document Request Status
- **URL**: `/document-requests/:id/status`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Body**:
```json
{ "status": "pending|approved|rejected|completed|cancelled" }
```
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Document request status updated",
  "data": { /* updated request */ }
}
```

### Delete Document Request
- **URL**: `/document-requests/:id`
- **Method**: `DELETE`
- **Auth**: Required (Admin or owner)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Document request deleted successfully"
}
```

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

## Officials Endpoints

### Get All Officials
- **URL**: `/officials`
- **Method**: `GET`
- **Auth**: Public
- **Query Parameters**:
  - `isActive`: true|false
  - `position`: barangay_captain|barangay_kagawad|sk_chairman|barangay_secretary|barangay_treasurer|administrative_officer|deputy_officer|other
- **Success Response** (200):
```json
{
  "success": true,
  "count": 10,
  "data": [ /* officials */ ]
}
```

### Get Active Officials
- **URL**: `/officials/active`
- **Method**: `GET`
- **Auth**: Public
- **Success Response** (200):
```json
{
  "success": true,
  "count": 8,
  "data": [ /* active officials */ ]
}
```

### Get Officials by Position
- **URL**: `/officials/position/:position`
- **Method**: `GET`
- **Auth**: Public
- **Success Response** (200):
```json
{
  "success": true,
  "count": 3,
  "data": [ /* officials with specified position */ ]
}
```

### Get Single Official
- **URL**: `/officials/:id`
- **Method**: `GET`
- **Auth**: Public
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "official_id",
    "firstName": "string",
    "lastName": "string",
    "middleName": "string",
    "position": "string",
    "committee": "string",
    "isActive": true,
    "contactNumber": "string",
    "email": "string",
    "photo": "string (URL)",
    "bio": "string",
    "displayOrder": 0,
    "createdAt": "date"
  }
}
```

### Create Official
- **URL**: `/officials`
- **Method**: `POST`
- **Auth**: Required (Admin)
- **Body**:
```json
{
  "firstName": "string",
  "lastName": "string",
  "middleName": "string (optional)",
  "position": "barangay_captain|barangay_kagawad|sk_chairman|barangay_secretary|barangay_treasurer|administrative_officer|deputy_officer|other",
  "committee": "string (optional)",
  "isActive": true,
  "contactNumber": "string (optional)",
  "email": "string (optional)",
  "photo": "string (optional)",
  "bio": "string (optional)",
  "displayOrder": 0
}
```
- **Success Response** (201):
```json
{
  "success": true,
  "message": "Official created successfully",
  "data": { /* official object */ }
}
```

### Update Official
- **URL**: `/officials/:id`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Body**: Same as create (all fields optional)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Official updated successfully",
  "data": { /* updated official */ }
}
```

### Toggle Official Active Status
- **URL**: `/officials/:id/toggle-active`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Official activated/deactivated successfully",
  "data": { /* official */ }
}
```

### Reorder Officials
- **URL**: `/officials/reorder`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Body**:
```json
{
  "officials": [
    { "id": "official_id", "displayOrder": 0 },
    { "id": "official_id", "displayOrder": 1 }
  ]
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Officials reordered successfully"
}
```

### Delete Official
- **URL**: `/officials/:id`
- **Method**: `DELETE`
- **Auth**: Required (Admin)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Official deleted successfully"
}
```

### Get Officials Statistics
- **URL**: `/officials/stats/all`
- **Method**: `GET`
- **Auth**: Required (Admin)
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "total": 10,
    "active": 8,
    "inactive": 2,
    "byPosition": [ /* position counts */ ]
  }
}
```

---

## Barangay Info Endpoints

### Get Barangay Information
- **URL**: `/barangay-info`
- **Method**: `GET`
- **Auth**: Public
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "info_id",
    "barangayName": "string",
    "description": "string",
    "mission": "string",
    "vision": "string",
    "history": "string",
    "address": {
      "street": "string",
      "municipality": "string",
      "province": "string",
      "region": "string",
      "zipCode": "string"
    },
    "contactInfo": {
      "phoneNumber": "string",
      "email": "string"
    },
    "demographics": {
      "totalPopulation": 0,
      "totalHouseholds": 0,
      "ongoingPublicProjects": 0,
      "barangayArea": 0
    },
    "logo": "string (URL)",
    "coverPhoto": "string (URL)",
    "socialMedia": {
      "facebook": "string",
      "twitter": "string",
      "instagram": "string",
      "youtube": "string"
    },
    "lastUpdatedBy": { /* user */ },
    "createdAt": "date"
  }
}
```

### Create Barangay Information
- **URL**: `/barangay-info`
- **Method**: `POST`
- **Auth**: Required (SuperAdmin)
- **Body**:
```json
{
  "barangayName": "string",
  "description": "string (optional)",
  "mission": "string (optional)",
  "vision": "string (optional)",
  "history": "string (optional)",
  "address": { /* address object */ },
  "contactInfo": { /* contact object */ },
  "demographics": { /* demographics object */ },
  "logo": "string (optional)",
  "coverPhoto": "string (optional)",
  "socialMedia": { /* social media object */ }
}
```
- **Success Response** (201):
```json
{
  "success": true,
  "message": "Barangay information created successfully",
  "data": { /* barangay info */ }
}
```

### Update Barangay Information
- **URL**: `/barangay-info`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Body**: Same as create (all fields optional)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Barangay information updated successfully",
  "data": { /* updated info */ }
}
```

### Update Demographics
- **URL**: `/barangay-info/demographics`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Body**:
```json
{
  "totalPopulation": 0,
  "totalHouseholds": 0,
  "ongoingPublicProjects": 0,
  "barangayArea": 0
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Demographics updated successfully",
  "data": { /* updated info */ }
}
```

### Update Contact Information
- **URL**: `/barangay-info/contact`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Body**:
```json
{
  "phoneNumber": "string",
  "email": "string"
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Contact information updated successfully",
  "data": { /* updated info */ }
}
```

### Update Address
- **URL**: `/barangay-info/address`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Body**:
```json
{
  "street": "string",
  "municipality": "string",
  "province": "string",
  "region": "string",
  "zipCode": "string"
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Address updated successfully",
  "data": { /* updated info */ }
}
```

### Update Social Media
- **URL**: `/barangay-info/social-media`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Body**:
```json
{
  "facebook": "string",
  "twitter": "string",
  "instagram": "string",
  "youtube": "string"
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Social media updated successfully",
  "data": { /* updated info */ }
}
```

### Delete Barangay Information
- **URL**: `/barangay-info`
- **Method**: `DELETE`
- **Auth**: Required (SuperAdmin)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Barangay information deleted successfully"
}
```

---

## Services Endpoints

### Get All Services
- **URL**: `/services`
- **Method**: `GET`
- **Auth**: Public
- **Query Parameters**:
  - `isActive`: true|false
  - `category`: document_issuance|permits_clearance|health_services|social_services|emergency_services|public_safety|other
- **Success Response** (200):
```json
{
  "success": true,
  "count": 10,
  "data": [ /* services */ ]
}
```

### Get Active Services
- **URL**: `/services/active`
- **Method**: `GET`
- **Auth**: Public
- **Success Response** (200):
```json
{
  "success": true,
  "count": 8,
  "data": [ /* active services */ ]
}
```

### Get Services by Category
- **URL**: `/services/category/:category`
- **Method**: `GET`
- **Auth**: Public
- **Success Response** (200):
```json
{
  "success": true,
  "count": 5,
  "data": [ /* services */ ]
}
```

### Get Single Service
- **URL**: `/services/:id`
- **Method**: `GET`
- **Auth**: Public
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "service_id",
    "title": "string",
    "description": "string",
    "category": "string",
    "requirements": ["string"],
    "processingTime": "string",
    "fees": 0,
    "officeInCharge": "string",
    "contactPerson": "string",
    "contactNumber": "string",
    "availableHours": "string",
    "icon": "string (URL)",
    "isActive": true,
    "displayOrder": 0,
    "createdBy": { /* user */ },
    "createdAt": "date"
  }
}
```

### Create Service
- **URL**: `/services`
- **Method**: `POST`
- **Auth**: Required (Admin)
- **Body**:
```json
{
  "title": "string",
  "description": "string",
  "category": "document_issuance|permits_clearance|health_services|social_services|emergency_services|public_safety|other",
  "requirements": ["string"],
  "processingTime": "string",
  "fees": 0,
  "officeInCharge": "string (optional)",
  "contactPerson": "string (optional)",
  "contactNumber": "string (optional)",
  "availableHours": "string (optional)",
  "icon": "string (optional)",
  "isActive": true,
  "displayOrder": 0
}
```
- **Success Response** (201):
```json
{
  "success": true,
  "message": "Service created successfully",
  "data": { /* service */ }
}
```

### Update Service
- **URL**: `/services/:id`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Body**: Same as create (all fields optional)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Service updated successfully",
  "data": { /* updated service */ }
}
```

### Toggle Service Active Status
- **URL**: `/services/:id/toggle-active`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Service activated/deactivated successfully",
  "data": { /* service */ }
}
```

### Reorder Services
- **URL**: `/services/reorder`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Body**:
```json
{
  "services": [
    { "id": "service_id", "displayOrder": 0 },
    { "id": "service_id", "displayOrder": 1 }
  ]
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Services reordered successfully"
}
```

### Delete Service
- **URL**: `/services/:id`
- **Method**: `DELETE`
- **Auth**: Required (Admin)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Service deleted successfully"
}
```

### Get Services Statistics
- **URL**: `/services/stats/all`
- **Method**: `GET`
- **Auth**: Required (Admin)
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "total": 10,
    "active": 8,
    "inactive": 2,
    "byCategory": [ /* category counts */ ],
    "averageFee": 150.5
  }
}
```

---

## FAQs Endpoints

### Get Published FAQs
- **URL**: `/faqs`
- **Method**: `GET`
- **Auth**: Public
- **Query Parameters**:
  - `category`: general|documents|services|permits|complaints|programs|other
  - `search`: string (searches in questions and answers)
- **Success Response** (200):
```json
{
  "success": true,
  "count": 15,
  "data": [ /* FAQs */ ]
}
```

### Get FAQs by Category
- **URL**: `/faqs/category/:category`
- **Method**: `GET`
- **Auth**: Public
- **Success Response** (200):
```json
{
  "success": true,
  "count": 5,
  "data": [ /* FAQs */ ]
}
```

### Get Single FAQ
- **URL**: `/faqs/:id`
- **Method**: `GET`
- **Auth**: Public
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "faq_id",
    "question": "string",
    "answer": "string",
    "category": "string",
    "displayOrder": 0,
    "isPublished": true,
    "views": 100,
    "helpful": 50,
    "notHelpful": 5,
    "createdBy": { /* user */ },
    "lastUpdatedBy": { /* user */ },
    "createdAt": "date"
  }
}
```

### Mark FAQ as Helpful
- **URL**: `/faqs/:id/helpful`
- **Method**: `PUT`
- **Auth**: Public
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Thank you for your feedback",
  "data": {
    "helpful": 51,
    "notHelpful": 5
  }
}
```

### Mark FAQ as Not Helpful
- **URL**: `/faqs/:id/not-helpful`
- **Method**: `PUT`
- **Auth**: Public
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Thank you for your feedback",
  "data": {
    "helpful": 50,
    "notHelpful": 6
  }
}
```

### Get All FAQs (Admin)
- **URL**: `/faqs/all/list`
- **Method**: `GET`
- **Auth**: Required (Admin)
- **Query Parameters**:
  - `category`: general|documents|services|permits|complaints|programs|other
  - `isPublished`: true|false
- **Success Response** (200):
```json
{
  "success": true,
  "count": 20,
  "data": [ /* all FAQs */ ]
}
```

### Create FAQ
- **URL**: `/faqs`
- **Method**: `POST`
- **Auth**: Required (Admin)
- **Body**:
```json
{
  "question": "string",
  "answer": "string",
  "category": "general|documents|services|permits|complaints|programs|other",
  "displayOrder": 0,
  "isPublished": true
}
```
- **Success Response** (201):
```json
{
  "success": true,
  "message": "FAQ created successfully",
  "data": { /* FAQ */ }
}
```

### Update FAQ
- **URL**: `/faqs/:id`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Body**: Same as create (all fields optional)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "FAQ updated successfully",
  "data": { /* updated FAQ */ }
}
```

### Toggle FAQ Publish Status
- **URL**: `/faqs/:id/publish`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "FAQ published/unpublished successfully",
  "data": { /* FAQ */ }
}
```

### Reorder FAQs
- **URL**: `/faqs/reorder`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Body**:
```json
{
  "faqs": [
    { "id": "faq_id", "displayOrder": 0 },
    { "id": "faq_id", "displayOrder": 1 }
  ]
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "message": "FAQs reordered successfully"
}
```

### Delete FAQ
- **URL**: `/faqs/:id`
- **Method**: `DELETE`
- **Auth**: Required (Admin)
- **Success Response** (200):
```json
{
  "success": true,
  "message": "FAQ deleted successfully"
}
```

### Get FAQ Statistics
- **URL**: `/faqs/stats/all`
- **Method**: `GET`
- **Auth**: Required (Admin)
- **Success Response** (200):
```json
{
  "success": true,
  "data": {
    "total": 20,
    "published": 15,
    "unpublished": 5,
    "byCategory": [ /* category counts */ ],
    "mostViewed": [ /* top 5 FAQs */ ],
    "mostHelpful": [ /* top 5 FAQs */ ]
  }
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
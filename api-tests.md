# TripMate API Test Collection

Base URL: `http://localhost:8000/api/v1`

---

## 🔐 Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

{
"fullName": "John Doe",
"email": "john@example.com",
"phoneNumber": "9876543210",
"password": "Test@1234",
"dateOfBirth": "1995-05-15",
"gender": "male",
"role": "traveler"
}



### 2. Login
**POST** `/auth/login`

{
"email": "john@example.com",
"password": "Test@1234"
}



### 3. Get Current User
**GET** `/auth/me`
Headers: `Authorization: Bearer <token>`

### 4. Logout
**POST** `/auth/logout`
Headers: `Authorization: Bearer <token>`

### 5. Change Password
**POST** `/auth/change-password`
Headers: `Authorization: Bearer <token>`

{
"currentPassword": "Test@1234",
"newPassword": "NewTest@1234"
}



---

## 👤 User Endpoints

### 6. Get Profile
**GET** `/users/profile`
Headers: `Authorization: Bearer <token>`

### 7. Update Profile
**PUT** `/users/profile`
Headers: `Authorization: Bearer <token>`

{
"fullName": "John Updated",
"address": {
"street": "123 Main St",
"city": "Mumbai",
"state": "Maharashtra",
"pincode": "400001"
},
"travelPreferences": {
"interests": ["adventure", "beach", "food"],
"budget": "moderate",
"travelStyle": "solo"
}
}



### 8. Update Avatar
**PATCH** `/users/avatar`
Headers: `Authorization: Bearer <token>`

{
"avatar": "https://example.com/avatar.jpg"
}



### 9. Add SOS Contact
**POST** `/users/sos-contacts`
Headers: `Authorization: Bearer <token>`

{
"name": "Jane Doe",
"phoneNumber": "9876543211",
"relation": "Sister"
}



### 10. Get Companions
**GET** `/users/companions?city=Mumbai&minRating=4`
Headers: `Authorization: Bearer <token>`

---

## ✈️ Trip Endpoints

### 11. Create Trip
**POST** `/trips`
Headers: `Authorization: Bearer <token>`

{
"title": "Goa Beach Vacation",
"description": "A relaxing beach vacation in Goa",
"destination": {
"city": "Goa",
"state": "Goa",
"country": "India"
},
"startDate": "2025-12-01",
"endDate": "2025-12-07",
"duration": {
"days": 7,
"nights": 6
},
"budget": {
"estimated": 50000,
"currency": "INR"
},
"tripType": "couple"
}



### 12. Get All User Trips
**GET** `/trips?status=planning&page=1&limit=10`
Headers: `Authorization: Bearer <token>`

### 13. Get Trip by ID
**GET** `/trips/:id`
Headers: `Authorization: Bearer <token>`

### 14. Update Trip
**PUT** `/trips/:id`
Headers: `Authorization: Bearer <token>`

{
"title": "Updated Trip Title",
"description": "Updated description"
}



### 15. Delete Trip
**DELETE** `/trips/:id`
Headers: `Authorization: Bearer <token>`

### 16. Add Companion to Trip
**POST** `/trips/:id/companions`
Headers: `Authorization: Bearer <token>`

{
"companionId": "67123abc456def789"
}



### 17. Update Trip Status
**PATCH** `/trips/:id/status`
Headers: `Authorization: Bearer <token>`

{
"status": "booked"
}



---

## 📝 Response Format

### Success Response
{
"statusCode": 200,
"data": { ... },
"message": "Success message",
"success": true
}



### Error Response
{
"statusCode": 400,
"message": "Error message",
"errors": [],
"success": false
}

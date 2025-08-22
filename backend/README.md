# Fitness Studio Backend API

A Node.js backend API for the Fitness Studio application with MongoDB, Passport authentication, session management, and comprehensive gym membership tracking.

## Features

- 🔐 User authentication (signup, login, logout)
- 👥 Role-based access control (user, trainer, admin)
- 🗄️ MongoDB database with Mongoose ODM
- 🔒 Session-based authentication with Passport.js
- 🛡️ Password hashing with bcrypt
- 🌐 CORS enabled for frontend integration
- 📝 TypeScript support
- 💪 **Gym Membership Management**
- 🏃‍♂️ **Check-in/Check-out System**
- 💳 **Payment Tracking**
- 📊 **Analytics and Reporting**

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/fitness_studio

# Session Configuration
SESSION_SECRET=your_super_secret_session_key_here

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
```

3. Build the project:
```bash
npm run build
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get current user profile
- `GET /api/auth/status` - Check authentication status

### Membership Management

- `GET /api/membership/my-membership` - Get user's membership details
- `POST /api/membership` - Create new membership (admin only)
- `PUT /api/membership/:id` - Update membership (admin only)
- `POST /api/membership/check-in` - Check in to gym
- `PUT /api/membership/check-out/:checkInId` - Check out from gym
- `GET /api/membership/check-ins` - Get user's check-in history
- `GET /api/membership/payments` - Get user's payment history
- `GET /api/membership/admin/all` - Get all memberships (admin only)
- `GET /api/membership/admin/stats` - Get membership statistics (admin only)

### Health Check

- `GET /api/health` - API health status

## Request/Response Examples

### Signup
```json
POST /api/auth/signup
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user",
  "phoneNumber": "+1234567890",
  "dateOfBirth": "1990-01-01",
  "gender": "male"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Check-in
```json
POST /api/membership/check-in
{
  "location": "Main Gym",
  "activity": "Weight Training",
  "equipment": ["bench", "dumbbells"],
  "trainerId": "trainer_id_here"
}
```

## Database Models

### User
- `email` (unique, required)
- `password` (hashed, required)
- `firstName` (required)
- `lastName` (required)
- `role` (user, trainer, admin)
- `isActive` (boolean)
- `phoneNumber`, `dateOfBirth`, `gender`
- `emergencyContact` (name, phone, relationship)
- `membership` (reference to Membership)
- `specialization`, `experience`, `bio` (trainer-specific)
- `permissions` (admin-specific)
- `createdAt`, `updatedAt` (timestamps)

### Membership
- `user` (reference to User)
- `planType` (basic, premium, vip, family, student, senior)
- `status` (active, expired, suspended, cancelled)
- `startDate`, `endDate`
- `price`, `currency`, `billingCycle`
- `features` (gym access, classes, pool, sauna, etc.)
- `checkIns`, `payments` (references)
- `autoRenew`, `discountPercentage`
- Virtual fields: `durationDays`, `daysRemaining`, `isExpired`

### CheckIn
- `user`, `membership` (references)
- `checkInTime`, `checkOutTime`, `duration`
- `location`, `activity`, `equipment`
- `trainer` (reference), `status`
- Virtual fields: `durationMinutes`, `durationHours`

### Payment
- `user`, `membership` (references)
- `amount`, `currency`, `paymentMethod`
- `status`, `transactionId`, `paymentDate`
- `billingPeriod`, `description`
- `taxAmount`, `processingFee`, `discountAmount`
- Virtual fields: `totalAmount`, `netAmount`

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- CORS protection
- Input validation
- Role-based access control
- Secure session management

## Development

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `SESSION_SECRET` - Secret key for sessions
- `FRONTEND_URL` - Frontend URL for CORS

## Gym-Specific Features

### Membership Plans
- **Basic**: Gym access, locker access
- **Premium**: Basic + group classes, personal training
- **VIP**: Premium + pool, sauna, towel service
- **Family**: Multiple users, shared features
- **Student/Senior**: Discounted rates

### Check-in System
- Track gym visits with timestamps
- Monitor workout duration
- Record activities and equipment used
- Trainer session tracking

### Payment Management
- Multiple payment methods
- Billing cycles (monthly, quarterly, yearly)
- Auto-renewal support
- Discount and promotional code support
- Tax and fee calculations

### Analytics
- Membership statistics
- Revenue tracking
- Usage analytics
- Plan type distribution

## Notes

- Make sure MongoDB is running before starting the server
- In production, use strong session secrets and HTTPS
- The API is configured to work with the Fitness Studio frontend
- Regular users (not admin/trainer) automatically get membership tracking
- Check-ins require active membership
- Admin users can manage all memberships and view analytics

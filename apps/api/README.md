# 🔧 Daynt Forms - Backend API

> **NestJS-based REST API with Prisma ORM, JWT authentication, and comprehensive form management**

## 🎯 Overview

This is the backend service for Daynt Forms, providing:
- RESTful API endpoints for form management
- JWT-based authentication with httpOnly cookies
- Database access through Prisma ORM
- File upload handling
- Response export (CSV/JSON)
- Webhook integration support
- Rate limiting and security features

## 🛠️ Tech Stack

- **NestJS 10** - Progressive Node.js framework
- **Prisma 5** - Next-generation ORM
- **SQLite/PostgreSQL** - Database (SQLite default, PostgreSQL production)
- **Passport JWT** - Authentication strategy
- **bcrypt** - Password hashing
- **Swagger** - API documentation
- **class-validator** - DTO validation
- **Multer** - File uploads

## 📁 Project Structure

```
apps/api/
├── src/
│   ├── auth/                   # Authentication module
│   │   ├── auth.controller.ts  # Login, register, logout endpoints
│   │   ├── auth.service.ts     # Auth business logic
│   │   ├── jwt.strategy.ts     # Passport JWT strategy
│   │   └── dto/                # Auth DTOs
│   ├── forms/                  # Forms module
│   │   ├── forms.controller.ts # Form CRUD endpoints
│   │   ├── forms.service.ts    # Form business logic
│   │   └── dto/                # Form DTOs
│   ├── submissions/            # Submissions module
│   │   ├── submissions.controller.ts  # Submit & export endpoints
│   │   ├── submissions.service.ts     # Submission logic
│   │   └── dto/                # Submission DTOs
│   ├── uploads/                # File upload module
│   │   ├── uploads.controller.ts
│   │   └── uploads.service.ts
│   ├── prisma/                 # Prisma module
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── app.module.ts           # Root module
│   └── main.ts                 # Bootstrap file
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── migrations/             # Migration history
│   └── seed.ts                 # Seed data script
├── uploads/                    # File upload directory
├── .env                        # Environment variables
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npx prisma migrate dev

# Seed demo data
npm run seed
```

### Environment Variables

Create a `.env` file:

```env
# Database
DATABASE_URL="file:../dev.db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRATION="7d"

# Server
PORT=4000
NODE_ENV="development"

# CORS
FRONTEND_ORIGIN="http://localhost:3000"

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR="./uploads"
```

### Run Development Server

```bash
npm run dev
```

Server starts at: **http://localhost:4000**

API documentation: **http://localhost:4000/api/docs**

## 📚 API Endpoints

### Authentication

```
POST   /api/auth/register       Create new account
POST   /api/auth/login          Login (returns httpOnly cookie)
POST   /api/auth/logout         Logout (clears cookie)
GET    /api/auth/me             Get current user
```

### Forms (Protected)

```
GET    /api/forms               List user's forms
POST   /api/forms               Create form
GET    /api/forms/:id           Get form by ID
PUT    /api/forms/:id           Update form
DELETE /api/forms/:id           Delete form
GET    /api/forms/public/:id    Get public form (no auth)
```

### Submissions

```
POST   /api/submissions/public/:publicId        Submit form (public)
GET    /api/submissions/form/:formId           Get form submissions
GET    /api/submissions/export/:formId/csv     Export as CSV
GET    /api/submissions/export/:formId/json    Export as JSON
```

### Uploads (Protected)

```
POST   /api/uploads             Upload file
GET    /api/uploads/:filename   Get file
```

### Health Check

```
GET    /api/health              Server status
```

## 🗄️ Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  forms     Form[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Form Model (Enhanced)
```prisma
model Form {
  id              String   @id @default(cuid())
  title           String
  description     String?
  isPublic        Boolean  @default(true)
  publicId        String   @unique @default(nanoid())
  userId          String
  user            User     @relation(...)
  fields          Field[]
  submissions     Submission[]
  
  // Advanced Features
  template        String?        # Template type
  brandColor      String?        # Custom brand color
  brandLogo       String?        # Logo URL
  startDate       DateTime?      # Form start time
  endDate         DateTime?      # Form end time
  maxSubmissions  Int?           # Submission limit
  submissionCount Int @default(0) # Current count
  thankYouMessage String?        # Custom thank you
  redirectUrl     String?        # Redirect after submit
  language        String @default("en") # i18n
  webhookUrl      String?        # Webhook integration
  enableCaptcha   Boolean @default(false) # Spam protection
  
  // Analytics
  viewCount       Int @default(0)
  conversionRate  Float?
  avgCompletionTime Int?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### Field Model
```prisma
model Field {
  id          String   @id @default(cuid())
  formId      String
  form        Form     @relation(...)
  label       String
  type        String   # text, email, number, radio, checkbox, file
  required    Boolean  @default(false)
  options     String?  # JSON array for radio/checkbox
  order       Int
  
  // Validation
  minLength   Int?
  maxLength   Int?
  minValue    Float?
  maxValue    Float?
  pattern     String?  # Regex pattern
  
  // Conditional Logic
  conditionalFieldId    String?
  conditionalValue      String?
  conditionalOperator   String?
  showWhenMatch        Boolean @default(true)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Submission Model
```prisma
model Submission {
  id             String   @id @default(cuid())
  formId         String
  form           Form     @relation(...)
  responses      String   # JSON data
  isDraft        Boolean  @default(false)
  completionTime Int?     # Milliseconds
  ipAddress      String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

## 🔐 Security Features

### Authentication
- JWT tokens in httpOnly cookies (XSS protection)
- Bcrypt password hashing (10 salt rounds)
- Token expiration and refresh
- Secure cookie flags (httpOnly, sameSite, secure)

### API Protection
- Rate limiting (100 requests per minute)
- CORS configured for frontend only
- Input validation on all endpoints
- SQL injection protection (Prisma)

### File Upload Security
- File type validation
- File size limits (5MB default)
- Sanitized filenames
- Secure storage path

## 🧪 Development Commands

```bash
# Development
npm run dev              # Start with hot reload

# Build
npm run build            # Compile TypeScript
npm run start            # Run production build

# Database
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Create migration
npm run seed             # Seed database
npx prisma studio        # Open Prisma Studio GUI
npx prisma migrate reset # Reset database

# Database Switching
npm run db:use:sqlite    # Switch to SQLite
npm run db:use:postgres  # Switch to PostgreSQL
```

## 🔄 Database Migrations

### Create New Migration
```bash
npx prisma migrate dev --name your_migration_name
```

### Apply Migrations (Production)
```bash
npx prisma migrate deploy
```

### Reset Database
```bash
npx prisma migrate reset --force
npm run seed
```

## 📊 Seeding Data

The seed script creates:
- 1 demo user (demo@formapp.dev / password123)
- 3 sample forms:
  - Customer Feedback Survey (5 responses)
  - Job Application Form (3 responses)
  - Event Registration (7 responses)

Run seed:
```bash
npm run seed
```

## 🌐 CORS Configuration

Default CORS settings (main.ts):
```typescript
app.enableCors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

## 🚀 Production Deployment

### PostgreSQL Setup
```bash
# Switch to PostgreSQL schema
npm run db:use:postgres

# Update .env
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"

# Generate and migrate
npm run prisma:generate
npx prisma migrate deploy

# Start production
npm run build
npm run start
```

### Environment Variables (Production)
```env
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
JWT_SECRET="super-secure-64-character-random-string"
JWT_EXPIRATION="24h"
PORT=4000
NODE_ENV="production"
FRONTEND_ORIGIN="https://yourdomain.com"
```

### Deployment Platforms
- **Heroku**: Add Heroku Postgres addon
- **Railway**: Auto-detects Prisma
- **DigitalOcean**: App Platform with managed database
- **AWS**: Elastic Beanstalk with RDS
- **Google Cloud**: Cloud Run with Cloud SQL

## 📖 API Documentation

Interactive Swagger docs available at:
**http://localhost:4000/api/docs**

Features:
- Try all endpoints directly in browser
- View request/response schemas
- Authentication testing
- Example payloads

## 🐛 Troubleshooting

### Prisma Client Not Generated
```bash
npm run prisma:generate
```

### Migration Errors
```bash
npx prisma migrate reset --force
npx prisma migrate dev
npm run seed
```

### Port Already in Use
```bash
# Change PORT in .env
PORT=4001
```

### CORS Errors
Check `FRONTEND_ORIGIN` in .env matches your frontend URL

## 📝 Testing

### Manual API Testing
Use Swagger UI at http://localhost:4000/api/docs

### With cURL
```bash
# Register
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","name":"Test User"}'

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}' \
  -c cookies.txt

# Get Forms (with auth)
curl http://localhost:4000/api/forms -b cookies.txt
```

## 🤝 Contributing

See main [README.md](../../README.md) for contribution guidelines.

## 📄 License

MIT License - See [LICENSE](../../LICENSE)

---

**Part of Daynt Forms**
Built with ❤️ using NestJS and Prisma

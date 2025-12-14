# NestJS Tasks 1-3

## Quick Start

### Installation & Running

```bash
# Clone the project (if needed)
git clone https://github.com/0CupOfTea0/nestcourse.git
cd node-app-1-3

# Install dependencies
npm install

# Run in development mode
npm run start:dev
```

Server will start at `http://localhost:3000`

## Available Endpoints

### Task 1: Modular Architecture

```bash
# Math endpoint
curl "http://localhost:3000/math/add?a=5&b=3"
```

### Task 2-3: DI Chain + Request Lifecycle

```bash
# Audit endpoint (successful request)
curl -H "Authorization: Bearer test-token" "http://localhost:3000/audit/123/login"

# Audit endpoint (error - no authorization)
curl "http://localhost:3000/audit/123/login"

# Audit endpoint (error - userId not a number)
curl -H "Authorization: Bearer test-token" "http://localhost:3000/audit/abc/login"
```

## Project Structure

```
src/
├── app.module.ts              # Main module
├── main.ts                    # Entry point
├── math/                      # Task 1: Math module
│   ├── math.module.ts
│   ├── math.controller.ts
│   └── math.service.ts
├── logger/                    # Task 1: Logging module
│   ├── logger.module.ts
│   └── logger.service.ts
├── user/                      # Task 2: User service
│   └── user.service.ts
├── audit/                     # Task 2-3: Audit & lifecycle
│   ├── audit.module.ts
│   ├── audit.controller.ts
│   └── audit.service.ts
├── guards/                    # Task 3: Guard
│   └── auth/
│       └── auth.guard.ts
├── pipes/                     # Task 3: Pipe
│   └── validation/
│       └── validation.pipe.ts
└── interceptors/              # Task 3: Interceptor
    └── logging/
        └── logging.interceptor.ts
```

## Technical Details

### Dependencies (package.json)

```json
{
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.0"
  }
}
```

### Request Lifecycle (Task 3)

When calling `/audit/:userId/:action`, the following executes:

1. **Interceptor** (before) - logs request start
2. **Guard** - validates Authorization header
3. **Pipe** - validates and transforms parameters
4. **Controller** - handles the request
5. **Services** - DI chain: AuditService → UserService → LoggerService
6. **Interceptor** (after) - logs request completion

### Development Commands

```bash
# Running in different modes
npm run start          # Standard start
npm run start:dev      # Development with hot-reload
npm run start:prod     # Production build

# Build & linting
npm run build          # Build project
npm run format         # Code formatting
npm run lint           # Code style check

# Testing
npm run test           # Run tests
npm run test:watch     # Tests in watch mode
npm run test:cov       # Tests with coverage
```

## Example Output

### Successful Request:

```bash
curl -H "Authorization: Bearer my-secret-token" "http://localhost:3000/audit/456/logout"
```

**Server Console:**

```
Interceptor: Before request
Guard: Access granted
Pipe: Transforming value "456" for param userId
Controller: Handling request
[UserService] Finding user 456 - 2024-01-15T12:00:00.000Z
[AuditService] User John Doe performed: logout - 2024-01-15T12:00:00.001Z
🏁 Interceptor: After request - 8ms
```

**Server Response:**

```json
{
  "user": {
    "id": "456",
    "name": "John Doe"
  },
  "action": "logout",
  "timestamp": "2024-01-15T12:00:00.001Z"
}
```

### Authorization Error:

```bash
curl "http://localhost:3000/audit/123/login"
```

**Response:**

```json
{
  "message": "No authorization header",
  "error": "Forbidden",
  "statusCode": 403
}
```

## Notes

- For Task 3, `Authorization: Bearer <any-token>` header is required
- `userId` must be a number
- `action` can be any string
- Logs are output to server console in real-time

## Troubleshooting

If endpoints don't work:

1. Verify server is running (`npm run start:dev`)
2. Check URL: `http://localhost:3000/audit/123/login`
3. Add Authorization header
4. Check server console for errors

## Additional Information

This project demonstrates:

- NestJS modular architecture
- Dependency Injection (DI)
- Middleware chain (Guard → Pipe → Interceptor)
- TypeScript strict typing
- Request lifecycle logging

## Tasks Overview

### Task 1: Modular NestJS Setup

- Demonstrates `@Module` decorator for encapsulation
- Shows `@Injectable` services with dependency injection
- Emphasizes feature modularity and reusability

### Task 2: Dependency Injection Chain

- Shows constructor-based DI with three services
- Illustrates service dependency graph
- Can be tested with mocks

### Task 3: Request Lifecycle Exploration

- Demonstrates execution order: Guard → Interceptor → Pipe → Controller
- Shows how to block access with guards
- Logs each stage of request processing

---

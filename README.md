# Task Manager 2.0

Task Manager is a task and list management application built with React, Node.js, and PostgreSQL.

## Requirements

### For Docker deployment (recommended)

- **Docker** version 20.10 or higher
- **Docker Compose** version 2.0 or higher

> **Important:** When running with Docker, you **do not need** to install Node.js, npm, PostgreSQL, or other dependencies on your computer. Everything needed will be installed and run inside Docker containers.

### For local development

- **Node.js** version 20 or higher
- **npm** or **yarn**
- **PostgreSQL** (or use Docker only for the database)

## Running with Docker

> **Perfect for:** Quick project setup without installing dependencies on your computer. Everything needed (Node.js, npm, PostgreSQL, Nginx) is already included in Docker images.

### Quick start

1. **Make sure Docker and Docker Compose are installed:**

   ```bash
   docker --version
   docker-compose --version
   ```

2. **Build and run all services:**

   ```bash
   docker-compose up --build
   ```

3. **The application will be available at:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - PostgreSQL: localhost:5432

> **Note:** On the first run, the build may take a few minutes as Docker downloads base images and installs all dependencies. Subsequent runs will be faster thanks to caching.

### Stopping

```bash
docker-compose down
```

### Stopping with data removal

```bash
docker-compose down -v
```

### Running in background mode

```bash
docker-compose up -d --build
```

### Viewing logs

```bash
docker-compose logs -f
```

View logs for a specific service:

```bash
docker-compose logs -f server
docker-compose logs -f client
docker-compose logs -f postgres
```

## Local development

### Installing dependencies

```bash
npm install
```

### Running in development mode

Run server and client simultaneously:

```bash
npm run dev
```

Or run separately:

**Backend server:**

```bash
cd apps/server
npm run dev
```

**Frontend client:**

```bash
cd apps/client
npm run dev
```

### Environment variables

For local development, create a `.env` file in the project root or in `apps/server`:

```env
DB_PASSWORD=postgres
DB_HOST=localhost
DB_USER=postgres
DB_NAME=task_manager
DB_PORT=5432
NODE_ENV=development
CLIENT_URL=http://localhost:5173
PORT=8000
```

**Important:** Make sure PostgreSQL is running locally or use Docker for the database:

```bash
docker-compose up postgres -d
```

### Building for production

**Backend:**

```bash
cd apps/server
npm run build
npm start
```

**Frontend:**

```bash
cd apps/client
npm run build
npm run preview
```

## Project structure

```
task-manager-2.0/
├── apps/
│   ├── client/          # Frontend application (React + Vite)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── api/         # RTK Query API
│   │   │   │   ├── features/    # Feature components
│   │   │   │   ├── hooks/       # React hooks
│   │   │   │   ├── store/       # Redux store
│   │   │   │   ├── ui/          # UI components
│   │   │   │   └── utils/       # Utilities
│   │   └── package.json
│   └── server/          # Backend API (Node.js + Express)
│       ├── src/
│       │   ├── controllers/    # Controllers
│       │   ├── db/             # Database setup
│       │   ├── repo/           # Repositories
│       │   ├── routes/         # API routes
│       │   ├── services/       # Business logic
│       │   └── utils/          # Utilities
│       └── package.json
├── shared/              # Shared TypeScript types
│   └── types/
├── docker-compose.yml   # Docker Compose configuration
├── Dockerfile           # Dockerfile for server
├── Dockerfile.client    # Dockerfile for client
├── nginx.conf           # Nginx configuration
└── package.json         # Root package.json
```

## Technologies

- **Frontend:**
  - React 19
  - Redux Toolkit + RTK Query
  - TypeScript
  - Vite
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
  - TypeScript

- **Infrastructure:**
  - Docker & Docker Compose
  - Nginx (for production client)

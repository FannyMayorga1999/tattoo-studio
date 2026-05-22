# Tattoo Studio

A modern and responsive website for a tattoo artist/studio built with Next.js, Tailwind CSS, Express, and PostgreSQL.

## Tech Stack

**Frontend:** Next.js, React, TypeScript, Tailwind CSS  
**Backend:** Express, TypeScript, Prisma ORM  
**Database:** PostgreSQL (Docker)

## Features

- Portfolio gallery showcasing tattoo work
- About the artist section
- Tattoo styles showcase
- Contact and booking form
- Responsive dark-themed design
- SEO optimized

## Project Structure

```
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/       # Pages and layouts
│   │   ├── components/# Reusable UI components
│   │   ├── lib/       # Utility functions
│   │   └── types/     # TypeScript types
│   └── ...
├── backend/           # Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── lib/
│   ├── prisma/        # Schema and migrations
│   └── ...
└── docker-compose.yml # Database setup
```

## Getting Started

### Prerequisites

- Node.js 18+
- Docker

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd tattoo-studio

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Start the database
cd ..
docker compose up -d

# Run database migrations
cd backend
npm run db:migrate

# Start development servers
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Scripts

### Frontend

| Script     | Description              |
| ---------- | ------------------------ |
| `dev`      | Start dev server         |
| `build`    | Production build         |
| `start`    | Start production server  |
| `lint`     | Run linter               |

### Backend

| Script         | Description              |
| -------------- | ------------------------ |
| `dev`          | Start dev server         |
| `build`        | Compile TypeScript       |
| `start`        | Start production server  |
| `db:migrate`   | Run Prisma migrations    |
| `db:push`      | Push schema to database  |
| `db:seed`      | Seed database            |
| `db:studio`    | Open Prisma Studio       |

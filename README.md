# Teacher Grading Platform

A full-stack web application that allows teachers to grade student assignments and students to submit their work. Built with React, TypeScript, Express, and Bun.

## Features

- **User Authentication**: Support for both teacher and student roles
- **Assignment Management**: Students can submit assignments in different subjects
- **Grading System**: Teachers can grade assignments and provide feedback
- **Real-time Updates**: Instant feedback when assignments are graded
- **Swagger Documentation**: API documentation available at `/api-docs`

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Radix UI Components
- Zustand (State Management)
- Axios

### Backend
- Bun
- Express
- TypeScript
- Swagger UI
- CORS

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine
- Git (for cloning the repository)

### Running the Application

1. Clone the repository:

```bash
git clone https://github.com/robertheo15/homework-app.git
cd homework-app
```

2. Start the application using Docker Compose:

```bash
docker-compose up --build
```

This will:
- Build and start both frontend and backend containers
- Set up the development environment with hot-reload
- Mount local directories for real-time development

3. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/api-docs

### Development

The application is configured with volume mounts, so any changes you make to the source code will automatically trigger a rebuild in the development environment.

To stop the application:

```bash
docker-compose down
```

## Environment Variables

### Frontend (.env)
- `VITE_API_URL`: Backend API URL (default: http://localhost:3000)

### Backend (.env)
- `NODE_ENV`: Environment mode (development/production)
- `PORT`: Server port (default: 3000)

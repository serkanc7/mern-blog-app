# Blog App Project
## Overview

This project is a full-stack web application built with React, Redux Toolkit, TypeScript, and Node.js. It includes user authentication, CRUD operations for posts, and a rating system for comments. The backend is built using Express and MongoDB, while the frontend is developed with Vite.

## Features

- User authentication (login, register, profile update)
- CRUD operations for posts
- Rating system for comments
- Responsive design with Tailwind CSS
- CI/CD pipeline with GitHub Actions
- Docker support for containerized deployment

## Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/serkanc7/mern-blog-app.git
   cd mern-blog-app
   ```

2. **Install dependencies for the backend:**

   ```
   cd backend
   npm install
   ```

3. **Install dependencies for the frontend:**

   ```
   cd ../frontend
   npm install
   ```

## Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    PORT=5001

Create a `.env` file in the `frontend` directory and add the following environment variables:

    VITE_API_URL=http://localhost:5001/api

## Running the Application

1. **Backend:**

   ```
   cd backend
   npm run dev
   ```

2. **Frontend:**

   ```
   cd frontend
   npm run dev
   ```

## Testing

This project uses Jest for testing. To run the tests, use the following commands:

    cd frontend
    npm run test
    

## Docker

The project includes Docker support. You can build and run the Docker containers using the following commands:


    docker-compose up --build


## CI/CD

The project uses GitHub Actions for CI/CD. The configuration is located in the `.github/workflows/ci-cd.yml` file.
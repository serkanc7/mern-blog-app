Personal Assistant Blog Application
This is a full-stack blog application where users can register, login, and create posts. Admin users can create and manage posts, while all users can view posts, leave comments, and rate them. The application is built with React, Redux Toolkit, and TypeScript on the frontend, and Express, Mongoose, and TypeScript on the backend.

Table of Contents
Features
Tech Stack
Installation
Environment Variables
Running the Application
Testing
Docker
CI/CD Pipeline
Project Structure
Contributing
License
Features
User Authentication (Register, Login, Logout)
User Profile Management
Post Creation and Management (Admin only)
Post Listing and Viewing
Commenting on Posts
Rating Posts
Responsive Design
Tech Stack
Frontend:

React
Redux Toolkit
TypeScript
React Router
Tailwind CSS
Vite
Backend:

Node.js
Express
TypeScript
Mongoose
JWT (JSON Web Tokens)
Database:

MongoDB
Testing:

Jest
React Testing Library
Deployment:

Render.com (Backend)
Vercel (Frontend)
Installation
Clone the repository:
bash
Kodu kopyala
git clone https://github.com/yourusername/personal-assistant.git
cd personal-assistant
Install dependencies for the backend:
bash
Kodu kopyala
cd backend
npm install
Install dependencies for the frontend:
bash
Kodu kopyala
cd ../frontend
npm install
Environment Variables
Create a .env file in the backend directory and add the following environment variables:

plaintext
Kodu kopyala
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=5001
Create a .env file in the frontend directory and add the following environment variables:

plaintext
Kodu kopyala
VITE_API_URL=http://localhost:5001/api
Running the Application
Backend:
bash
Kodu kopyala
cd backend
npm run dev
Frontend:
bash
Kodu kopyala
cd frontend
npm run dev
The application will be available at http://localhost:3000.

Testing
To run the tests, use the following commands:

Backend:
bash
Kodu kopyala
cd backend
npm test
Frontend:
bash
Kodu kopyala
cd frontend
npm test
Docker
To build and run the application using Docker, you can use the provided Docker and Docker Compose files.

Build and run the containers:
bash
Kodu kopyala
docker-compose up --build
The backend will be available at http://localhost:5001 and the frontend at http://localhost:3000.

CI/CD Pipeline
This project uses GitHub Actions for CI/CD. The configuration file is located in .github/workflows/ci-cd.yml. The pipeline includes steps for checking out the code, setting up Node.js, installing dependencies, building the project, running tests, and building Docker images.

Project Structure
plaintext
Kodu kopyala
project-root
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── middlewares
│   │   └── index.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── features
│   │   ├── types
│   │   ├── app
│   │   └── main.tsx
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml
└── README.md
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the project's coding standards and passes all tests.

License
This project is licensed under the MIT License. See the LICENSE file for details.
# Task Manager Web App

A full-stack, role-based project and task management application built with Next.js, Express.js, and MongoDB. The application features a beautiful, dark-themed UI built with Tailwind CSS and secure REST APIs for seamless data handling.

## Features

- **Role-Based Access Control (RBAC)**: Supports `Admin` and `Member` roles.
  - **Admin**: Can create projects, add members, assign tasks, and manage the full project lifecycle.
  - **Member**: Can view projects they are assigned to and update the status of their specific tasks.
- **Project & Team Management**: Organize tasks under specific projects.
- **Task Tracking**: Track tasks with statuses (Todo, In Progress, Done) and due dates.
- **Dashboard**: Get a bird's-eye view of task statuses and project progress.
- **Authentication**: Secure JWT-based signup and login system.

## Tech Stack

### Frontend (`client`)
- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Client**: Axios

### Backend (`server`)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens) & bcrypt
- **Language**: TypeScript

## Getting Started

Follow these steps to get the project running locally on your machine.

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or a MongoDB Atlas URI)

### 1. Setup the Backend (Server)

Navigate to the `server` directory, install dependencies, and setup your environment variables.

```bash
cd server
npm install
```

Ensure the `.env` file exists in the `server` root with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_super_secret_jwt_key
```

Start the development server:
```bash
npm run dev
```

### 2. Setup the Frontend (Client)

In a new terminal window, navigate to the `client` directory and install dependencies.

```bash
cd client
npm install
```

Start the Next.js development server:
```bash
npm run dev
```

The application will be running at [http://localhost:3000](http://localhost:3000).

## Usage

1. Open `http://localhost:3000` in your browser.
2. Sign up and choose either the **Admin** or **Member** role.
3. If you signed up as an **Admin**, navigate to the **Projects** tab to create a new project.
4. After creating a project, you can add new tasks and assign them.

## Folder Structure

```
task-manager/
├── client/                 # Next.js Frontend App
│   ├── src/
│   │   ├── app/            # Next.js App Router (Pages & Layouts)
│   │   ├── components/     # Reusable React components (Navbar, etc.)
│   │   ├── context/        # React Context (AuthContext)
│   │   └── lib/            # Utilities (Axios interceptor)
│   └── ...
├── server/                 # Express.js Backend API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth & Role middleware
│   │   ├── models/         # Mongoose schemas
│   │   └── routes/         # Express routes
│   └── ...
└── README.md
```

## License
MIT License

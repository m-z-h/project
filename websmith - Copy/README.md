# Websmith - MERN Stack Project Management System

A modern project management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Recharts** - Charts and data visualization

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up MongoDB

1. Make sure MongoDB is installed on your system
2. Start MongoDB service:
   - **Windows**: MongoDB usually starts automatically as a service
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

3. Verify MongoDB is running:
   ```bash
   mongosh
   ```

### 3. Configure Environment Variables

The `.env` file in the backend directory contains database connection settings:

```env
MONGODB_URI=mongodb://localhost:27017/websmith
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
```

**Important**: Change `JWT_SECRET` to a strong random string in production!

## Running the Application

### Development Mode

Run both frontend and backend concurrently:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Run Separately

**Frontend only:**
```bash
npm run client
```

**Backend only:**
```bash
npm run server
```

## Project Structure

```
websmith/
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware (auth)
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── .env             # Environment variables
│   └── server.js        # Express server entry point
├── src/
│   ├── components/
│   │   ├── layout/      # Layout components (Sidebar)
│   │   └── ui/          # Reusable UI components
│   ├── core/
│   │   └── services/    # API services
│   ├── pages/           # Page components
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get client by ID
- `POST /api/clients` - Create client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Invoices
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/:id` - Get invoice by ID
- `POST /api/invoices` - Create invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/:id` - Get payment by ID
- `POST /api/payments` - Create payment
- `PUT /api/payments/:id` - Update payment
- `DELETE /api/payments/:id` - Delete payment

### Messages
- `GET /api/messages` - Get all messages
- `GET /api/messages/:id` - Get message by ID
- `POST /api/messages` - Create message
- `DELETE /api/messages/:id` - Delete message

### Stats
- `GET /api/stats` - Get dashboard statistics

## Default User Credentials

After seeding the database, you can login with:

**Email**: admin@websmith.com  
**Password**: admin123

(You'll need to create this user through the registration page first)

## Building for Production

### Build Frontend

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Production Deployment

1. Set `NODE_ENV=production` in your backend `.env`
2. Update MongoDB URI to use a production database (e.g., MongoDB Atlas)
3. Use a strong JWT secret
4. Build the frontend
5. Deploy backend to your preferred hosting service
6. Serve the built frontend files through Express or a CDN

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongosh`
- Check the connection string in `backend/.env`
- Verify MongoDB port (default: 27017)

### Port Already in Use
- Change the port in `backend/.env` (for backend)
- Change the port in `vite.config.js` (for frontend)

### Module Not Found Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.

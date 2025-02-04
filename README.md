# Docker and Redis Project
A full-stack **Node.js** web application containerized using **Docker** with **Redis** for session management. The project follows best practices for development and production environments, utilizing **MongoDB** for storage and **Nginx** as a reverse proxy.

## Key Features:
- **User Authentication**: Secure login and session management using Redis.
- **Session Storage**: Redis stores user sessions for persistence across server restarts.
- **REST API**: Express.js backend handles user authentication and data management.
- **Database**: MongoDB stores user and application data.
- **Dockerized Setup**: Uses Docker and Docker Compose for easy deployment.
- **Reverse Proxy**: Nginx routes traffic to the Node.js backend in production.
- **Development & Production Configurations**: Separate `docker-compose.yml` files for flexibility.

## Technologies Used:
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Session Management**: Redis with `express-session`
- **Containerization**: Docker, Docker Compose
- **Reverse Proxy**: Nginx (in production)
- **Version Control**: Git & GitHub for source code management

## Project Walkthrough:

### 1) User Authentication
- **Sign Up**: Users register with a username and password, which is hashed and stored in MongoDB.
- **Login**: Users log in with credentials; on success, a session is created and stored in Redis.
- **Session Handling**: Redis manages user sessions, allowing persistence across app restarts.

### 2) Session Management with Redis
- **Why Redis?**: Redis is used to store session data instead of in-memory storage, making sessions persistent even after the server restarts.
- **Workflow**:
  - User logs in → Session data is stored in Redis.
  - User revisits → Session is retrieved from Redis.
  - User logs out → Session is removed from Redis.

### 3) API Endpoints
- **User Routes**
  - `POST /api/v1/users/signup` → Registers a new user.
  - `POST /api/v1/users/login` → Logs in a user and creates a session.
  - `GET /api/v1/session` → Checks if the session exists.
- **Post Routes**
  - `GET /api/v1/posts` → Fetches all posts.
  - `POST /api/v1/posts` → Creates a new post.

### 4) Docker Workflow
- **Building & Running Containers**
  ```sh
  docker-compose up --build
### This project is licensed under the MIT License.

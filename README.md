# My Express Backend

This project is a simple Express.js backend application that implements JWT authentication. It provides endpoints for user registration and login, allowing users to authenticate and receive a JSON Web Token (JWT) for secure access to protected resources.

## Project Structure

```
my-express-backend
├── src
│   ├── app.js                  # Entry point of the application
│   ├── controllers             # Contains controller files
│   │   └── authController.js   # Handles authentication logic
│   ├── middleware              # Contains middleware files
│   │   └── authMiddleware.js    # Verifies JWT tokens
│   ├── models                  # Contains model files
│   │   └── userModel.js        # Defines user data structure
│   ├── routes                  # Contains route files
│   │   └── authRoutes.js       # Sets up authentication routes
│   └── utils                   # Contains utility files
│       └── jwtUtils.js         # Utility functions for JWT
├── package.json                # NPM configuration file
├── .env                        # Environment variables
└── README.md                   # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my-express-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:
   ```
   JWT_SECRET=<your_jwt_secret>
   DATABASE_URL=<your_database_connection_string>
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The server will run on `http://localhost:3000`.

## API Endpoints

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user and receive a JWT.

## License

This project is licensed under the MIT License.
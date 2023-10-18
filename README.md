# Auth App

This is a simple authentication app built with Node.js and Express.js. It allows users to register, login, and logout.

### Features

- User registration with email and password
- Secure password hashing using bcrypt
- User login and session management using express-session
- Protected routes that require authentication
- User logout

### Installation

Clone the repository: git clone [https://github.com/brixmavu/auth-app.git](https://github.com/brixmavu/auth-app.git)

Navigate to the project directory: cd auth-app

Install dependencies: `npm install`

### Configuration
Create a .env file in the root directory of the project.

Add the following environment variables to the .env file:

```bash
SESSION_SECRET=your-session-secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=auth
```
Replace your-session-secret with a secret key for session encryption and database credentials of your database.

### Usage

Start the app: `npm start`

Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### File Structure

```
├── bin
│   └── www
├── public
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
├── views
│   ├── error.hbs
│   ├── index.hbs
│   ├── layout.hbs
│   ├── login.hbs
│   ├── register.hbs
│   └── welcome.hbs
├── app.js
├── package.json
└── package-lock.json
```

### Dependencies
- bcrypt
- cookie-parser
- debug
- dotenv
- express
- express-session
- hbs
- http-errors
- morgan
- mysql

### Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

### License
This project is licensed under the MIT License.

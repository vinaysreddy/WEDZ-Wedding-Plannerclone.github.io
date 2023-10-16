// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sample user data (replace with actual user data storage)
const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123', // In practice, passwords should be securely hashed and stored.
    },
    // Add more users as needed
];

// Store user sessions (in-memory, replace with a proper session management system)
const userSessions = {};

// Signup route
app.post('/signup', (req, res) => {
    // Extract user data
    console.log(req.body);

    // TODO: Signup logic, like saving user data to a database.

    // Responding to the client
    res.json({ message: 'Signup successful' });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find the user by email (you should validate the password securely in practice)
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
        // Create a session token (for simplicity, using the user's email as the token)
        const sessionToken = email;

        // Store the session token on the server (in-memory, replace with a proper session store)
        userSessions[sessionToken] = user;

        // Respond with the session token
        res.json({ message: 'Login successful', token: sessionToken });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Route to fetch user profile data using the session token
app.get('/api/profile', (req, res) => {
    const sessionToken = req.headers.authorization;

    // Check if the session token is valid
    const user = userSessions[sessionToken];

    if (user) {
        // Respond with the user's profile data
        res.json(user);
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Serve client-side files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

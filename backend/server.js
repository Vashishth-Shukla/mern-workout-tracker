const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Instantiate express app
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add routes
const workoutRoutes = require('./routes/workouts');

// Middleware
app.use(express.json()); // Parses incoming requests with JSON payloads
app.use((req, res, next) => {
    console.log(req.path, req.method); // Logs the request path and method
    next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen to the requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB and listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

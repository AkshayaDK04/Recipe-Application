const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
require('dotenv').config();

const port = 4000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

app.use('/uploads', express.static('uploads'));


// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB connected');
    app.listen(port, () => {
        console.log(`Listening to port ${port}`);
    });
}).catch((err) => {
    console.log('DB connection failed', err);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Route Imports
const qotdRoutes = require('./routes/qotd');
const submitRoutes = require('./routes/submit');

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Connect to Database
connectDB();

// Routes
app.use('/api/qotd', qotdRoutes);
app.use('/api/submit', submitRoutes);

// Health Check (Good for Railway deployments)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'QOTD Backend API is running' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server Error', message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
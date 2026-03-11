const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./helpers/cloudinary');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const filterRoutes = require('./routes/filterRoutes');
const drinkRoutes = require('./routes/drinkRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// routes

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/filters', filterRoutes);
app.use('/api/drinks', drinkRoutes);

// error handler
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;

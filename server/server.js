// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const auth = require('./middleware/auth');
const connectDB = require('./config/db');

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books')); // Ensure this is protected

app.get('/api/books', auth, (req, res) => {
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


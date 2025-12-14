const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const sweetRoutes = require('./routes/sweetRoutes');


const app = express();

/* 🔥 MIDDLEWARE FIRST */
app.use(cors());
app.use(express.json());

/* 🔥 ROUTES AFTER */
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);


/* HEALTH CHECK */
app.get('/', (req, res) => {
  res.send('Sweet Shop API is running');
});

module.exports = app;

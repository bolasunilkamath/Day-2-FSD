const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');        // For creating JSON Web Tokens for authorization
const bcrypt = require('bcryptjs');         // For securely comparing the hashed password.
require('dotenv').config();                 // Loads environment variables from .env (like your JWT_SECRET).

router.post('/', async (req, res) => {
  const { email, password } = req.body;     // Extract email and password from the request body
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);     //Query the database for the user
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {      //Validate the user and compare passwords
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
});

module.exports = router;
const mongoose = require('mongoose');   // import mongoose

// Define schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Compile schema into a model
module.exports= mongoose.model('User', userSchema);
const mongoose = require('mongoose');

// Connect to MongoDB
const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/e-commercedb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1); // Exit the process if DB connection fails
    }
};
//connectToMongoDB();
module.exports = connectToMongoDB;
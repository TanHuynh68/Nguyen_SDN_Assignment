// db.js
const mongoose = require('mongoose');
const uri = "mongodb+srv://nguyen:nguyen123456@cluster0.rcu6c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

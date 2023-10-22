const mongoose = require('mongoose');
require('dotenv').config()
const mongodburl = process.env.MongoDB_URL;

const mongodbConnect = async () => {
    await mongoose.connect(mongodburl)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
}

module.exports = mongodbConnect;

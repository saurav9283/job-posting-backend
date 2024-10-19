const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        const url = process.env.DB_URI;
        await mongoose.connect(url);
        console.log("Connection has been established successfully.");
        return true;

    } catch (error) {
        
        console.log(`Failed to establish connection to the database: ${error.message || error}`);
    }

};

module.exports = {
    connectToDatabase
}

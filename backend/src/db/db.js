require("dotenv").config();
const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('db connected successfully!'))
    .catch(err => console.log(err))
}

module.exports = connectDB;
const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL

const connectDB = async () => {
  try{
    const conn = await mongoose.connect(dbUrl)
    console.log("Database Connected");
  }
  catch (err) {
    console.log(err)
  }
}

module.exports = connectDB;
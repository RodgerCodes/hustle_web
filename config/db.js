const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(
      process.env.MONGO_URL,
      () => {
        console.log("Connected to DB");
      }
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
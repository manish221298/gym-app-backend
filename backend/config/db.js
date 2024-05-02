const mongoose = require("mongoose");

// command to start monngod:  sudo systemctl start mongod
// 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

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected on ${conn.connection.host}`);
  } catch (error) {
    console.log("mongodb error occured", error.message);
    process.exit();
  }
};

module.exports = connectDB;

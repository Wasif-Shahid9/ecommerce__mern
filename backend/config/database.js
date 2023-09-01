const mongoose = require("mongoose");

async function databaseConnect() {
  await mongoose.connect(process.env.DB_URL);
  console.log(`Connected to MongoDB: ${mongoose.connection.host}`);
}

module.exports = databaseConnect;

const mongoose = require("mongoose");

async function databaseConnect() {
  await mongoose.connect(process.env.DB_URL);
  (`Connected to MongoDB: ${mongoose.connection.host}`);
}

module.exports = databaseConnect;


// DB_URL = mongodb+srv://wasif123:wasif123abcmmnpo@cluster0.xjhijzo.mongodb.net/ecommerce?retryWrites=true&w=majority
// DB_URL = mongodb://localhost:27017/Ecommerce
// DB_URL = "mongodb+srv://wasif123:wasif123abcmmnpo@cluster0.xjhijzo.mongodb.net/?retryWrites=true&w=majority";
// mongodb+srv://wasif123:wasif123abcmmnpo@cluster0.xjhijzo.mongodb.net/
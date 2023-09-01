const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");

/// Middelwares
app.use(express.json());
app.use(cookieparser());
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

// Routes
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
module.exports = app;

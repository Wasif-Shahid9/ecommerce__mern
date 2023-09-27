const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

/// Middelwares
// const corsOptions = {
//   origin: [
//     "http://localhost:3001",
//     "http://127.0.0.1:5173",
//     "http://localhost:5173",
//     "http://104.142.122.231",
//   ],
//   credentials: true,
//   exposedHeaders: ["set-cookie"],
// };

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieparser());
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");

dotenv.config({ path: "backend/config/config.env" });
// Routes
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);
module.exports = app;

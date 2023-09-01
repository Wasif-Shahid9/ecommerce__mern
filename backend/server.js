// UnCaught Error
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shuting Down Server due to UnCaught Error ");
  process.exit(1);
});

const app = require("./app");
const dotenv = require("dotenv");
const databaseConnect = require("./config/database");

/// ENV Config
dotenv.config({ path: "backend/config/config.env" });

/////Connect to Database
databaseConnect();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

// UnhandleError
process.on("unhandledRejection", (error) => {
  console.log(`Error ${error}`);
  console.log("Shuting Down the server due to unhandle Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});

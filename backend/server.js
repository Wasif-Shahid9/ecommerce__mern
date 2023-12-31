// UnCaught Error
process.on("uncaughtException", (error) => {
  (`Error: ${error.message}`);
  (
    "Shuting Down Server due to UnCaught Error Something is missing "
  );
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
  (`Server is running on port: ${process.env.PORT}`);
});

// UnhandleError
process.on("unhandledRejection", (error) => {
  (`Error ${error}`);
  ("Shuting Down the server due to unhandle Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});


// DB_URL = mongodb://localhost:27017/Ecommerce
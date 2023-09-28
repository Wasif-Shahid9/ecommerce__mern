// // const multer = require("multer");

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "images/");
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + "-" + file.originalname);
// //   },
// // });

// // const upload = multer({ storage: storage });

// // module.exports = upload;

// // const path = require("path");
// // const router = express.Router();
// const multer = require("multer");
// // app.use("/images", express.static(path.join(__dirname, "images")));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "/images/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });
// const upload = multer({ storage });
// // router.post("/upload", upload.single("file"), (req, res) => {
// //   try {
// //     return res.status(200).json("File uploaded successfully");
// //   } catch (err) {
// //     (err);
// //   }
// // });
// module.exports = upload;

// / Importing Modules
const multer = require("multer");
// const fs = require("fs");

// Multer Functions
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const { generatedId } = req;

    cb(
      null,
      /* 
        if systemRoles exist in req.body then it will be user
        otherwise patient bcz patient doesn't have systemRoles in its schema
      */
      // "./backend/uploads/"
      "./uploads/"
    );
  },
  filename: (req, file, cb) => {
    try {
      // const { generatedId } = req;

      // Create a file path where we have to store the file
      const fullFilePath = `/uploads/${Date.now() + file.originalname}`;

      // If file exists in the given path, then delete the file
      // if (fs.existsSync(fullFilePath)) {
      //   fs.unlinkSync(fullFilePath);
      // }

      // Create the directory, in case if directory not exist
      // fs.mkdirSync(
      //   // see the comment in destination field for below line
      //   `uploads/${req.body.systemRoles ? "users" : "patients"}/` +
      //     generatedId +
      //     "/",
      //   { recursive: true }
      // );

      req.filename = `${Date.now() + file.originalname}`;

      let filename = req.filename;

      req.fullFilePath = fullFilePath;

      cb(null, filename);
    } catch (error) {
      console.error(`error in profile upload`, error);

      cb(new Error("Error occured"));
    }
  },
});

const limits = {
  fileSize: 1024 * 1024, // 1MB
};

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png"];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // Create Multer Error and pass it to cb to catch it in Multer Error Handler
    const error = new multer.MulterError("UNSUPPORTED_FILE_TYPE", "file");
    error.message = "Only jpg & png file type are supported";
    cb(error);
  }
};

// Initializing Multer
const upload = multer({ storage, limits, fileFilter }).single("file");

// For Handling Multer Errors/ Multer Error Handler
const uploadFile = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      // Check error is from Multer or not
      if (error instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ status: "FAILED", description: "Multer: " + error.message });
      } else {
        (error);
        // Default Internal Server Error
        return res.status(500).json({
          status: "INTERNAL_SERVER_ERROR",
          message: "SORRY: Something went wrong",
        });
      }
    }

    next();
  });
};

module.exports = uploadFile;

// Import required packages
var express = require("express");
var cors = require("cors");
var multer = require("multer");
require("dotenv").config();

// Initialize app and configure it
var app = express();
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

// Configure multer to handle file uploads
// The storage engine stores the file in memory as a Buffer
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// Route to serve the form (index.html)
app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html");
});

// Route to handle the file upload
// The middleware "upload.single('upfile')" handles the file upload
// It expects a single file with the input field named 'upfile'
app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
	// Check if a file was submitted
	if (req.file) {
		// Return the file name, type, and size in the JSON response
		res.json({
			name: req.file.originalname,
			type: req.file.mimetype,
			size: req.file.size,
		});
	} else {
		// Send an error if no file was uploaded
		res.status(400).send("No file was uploaded.");
	}
});

// Start the server and listen for incoming requests
const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Your app is listening on port " + port);
});

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS to allow requests from your React app
app.use(cors());

// Define the endpoint to log IP addresses
app.get("/log-ip", (req, res) => {
  // Get the real client IP address, even behind proxies
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || null;

  // Convert "::1" to "127.0.0.1" for better readability (optional)
  const formattedIp = ip === "::1" ? "127.0.0.1" : ip;

  // Define the path for the log file
  const logFilePath = path.join(__dirname, "ip-logs.txt");

  // Prepare the log message
  const logMessage = `IP: ${formattedIp} accessed at ${new Date().toISOString()}\n`;

  // Append the log message to the file
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error writing IP address to file:", err);
      return res.status(500).send("Error logging IP address.");
    }
    res.status(200).send("IP logged successfully.");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

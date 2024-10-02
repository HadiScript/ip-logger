const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const IpLog = require("./models/ipLog");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS (if needed)
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://ascripter70:hadi112233@cluster0.j4vwb4o.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware to log IP addresses
app.use(async (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || null;

  try {
    // Create and save the log entry
    const log = new IpLog({ ip });
    await log.save();
    console.log(`IP Logged: ${ip}`);
  } catch (error) {
    console.error("Error logging IP:", error);
  }

  next(); // Pass control to the next middleware or route handler
});

// Example route
app.get("/react", (req, res) => {
  res.send("");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

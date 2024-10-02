const mongoose = require("mongoose");

// Define the schema
const ipLogSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  accessedAt: { type: Date, default: Date.now },
});

// Create the model
const IpLog = mongoose.model("IpLog", ipLogSchema);

module.exports = IpLog;

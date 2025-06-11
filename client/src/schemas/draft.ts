const mongoose = require("mongoose");

const draftSchema = new mongoose.Schema({
  userId: String,
  title: String,
  content: String,
  contentType: String,
  tone: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Draft", draftSchema);

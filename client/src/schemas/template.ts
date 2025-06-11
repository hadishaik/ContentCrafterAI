const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  userId: String,
  name: String,
  settings: {
    contentType: String,
    tone: String,
    length: String,
    temperature: Number,
    maxTokens: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Template", templateSchema);

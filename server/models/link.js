// models/link.js
const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  expirationDate: { type: Date, required: true },

});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;

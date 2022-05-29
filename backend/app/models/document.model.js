const mongoose = require("mongoose");

const Document = mongoose.model(
    "Document",
    new mongoose.Schema({
      title: String,
      createdAt: Number,
      name: String,
      formData : { type : Array , "default" : [] }
    })
  );
  
  module.exports = Document;
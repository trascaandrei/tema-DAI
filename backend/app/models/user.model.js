const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    documents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document"
      }
    ]
  })
);

module.exports = User;

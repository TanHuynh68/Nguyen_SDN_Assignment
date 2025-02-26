const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    YOB: { type: Number, required: true },
    gender: { type: Boolean, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);


const Member = mongoose.model("member", memberSchema);
module.exports = Member;

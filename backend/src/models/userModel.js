const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    department: {
      type: String,
      // ref: "Department",
    },
    role: {
      type: String,
      enum: ["employee", "admin"],
      default:"employee"
    },
    hireDate: {
      type: Date,      
    },
    dob: {
      type: Date,      
    },

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

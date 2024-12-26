const mongoose = require("mongoose");
const joi = require("joi");
const argon = require("argon2");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: function (email) {
          return joi.assert(email, joi.string().email());
        },
        message: "Incorrect email address",
      },
    },
    password: {
      type: String,
      required: [() => this.provider === "local", "Password is required!"],
      trim: true,
      minLength: 6,
      select: false,
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.isPasswordValid = async function (password) {
  return argon.verify(this.password, password);
};

module.exports = mongoose.model("User", userSchema);

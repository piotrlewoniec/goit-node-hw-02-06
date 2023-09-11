const mongoose = require("mongoose");
const { Schema } = mongoose;
const bCrypt = require("bcryptjs");

const userdb = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userdb.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userdb.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const Userdb = mongoose.model("users", userdb);

module.exports = Userdb;

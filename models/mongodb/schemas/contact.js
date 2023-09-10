const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactdb = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Userdb",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contactdb = mongoose.model("contacts", contactdb);

module.exports = Contactdb;

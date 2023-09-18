require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;
const uriDbENV = process.env.uriDb;

const dbState = [
  {
    value: 0,
    label: "disconnected",
  },
  {
    value: 1,
    label: "connected",
  },
  {
    value: 2,
    label: "connecting",
  },
  {
    value: 3,
    label: "disconnecting",
  },
];

const dbstatus = () =>
  dbState.find((f) => f.value === mongoose.connection.readyState).label;

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
  },
  { versionKey: false, timestamps: true }
);

const Contactdb = mongoose.model("contacts", contactdb);

const connectdb = mongoose.connect(uriDbENV, {
  //   promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "db-contacts",
  //   useCreateIndex: true,
  //   useFindAndModify: false,
});

const disconnectdb = async () => {
  await mongoose.disconnect();
};
// const disconnectdb = mongoose.connection.close();

const listContactsDB = async () => {
  try {
    // const connection = await connectdb;
    // await connectdb;
    // console.log(`Connected to database`);
    // connection.on("error", (error) => {
    //   console.error("Error in MongoDb connection: " + error);
    //   mongoose.disconnect(); // Trigger disconnect on any error
    // });
    // connection.on("connected", () => console.log("Data Db connected"));
    if (mongoose.connection.readyState !== 1) {
      return "error";
    }
    const data = await Contactdb.find();
    // await mongoose.disconnect();
    // await connection.disconnect();
    // disconnectdb();
    return data;
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

const getContactByIdDB = async (contactId) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return "error";
    }
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return "Wrong id number";
    }
    const data = await Contactdb.findOne({ _id: contactId });
    if (data === null) {
      return "Contact not found";
    }
    return data;
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

const removeContactDB = async (contactId) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return "error";
    }
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return "Wrong id number";
    }
    const data = await Contactdb.findOneAndDelete({ _id: contactId });
    if (data === null) {
      return "Contact not found";
    }
    return data;
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

const addContactDB = async (body) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return "error";
    }
    const { name, email, phone, favorite } = body;
    const data = await Contactdb.create({ name, email, phone, favorite });
    return data;
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

const updateContactDB = async (contactId, body) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return "error";
    }
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return "Wrong id number";
    }
    const data = await Contactdb.findOneAndUpdate({ _id: contactId }, body, {
      new: true,
    });
    if (data === null) {
      return "Contact not found";
    }
    return data;
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

const updateStatusContactDB = async (contactId, body) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return "error";
    }
    const { favorite } = body;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return "Wrong id number";
    }
    const data = await Contactdb.findOneAndUpdate(
      { _id: contactId },
      { favorite: favorite },
      {
        new: true,
      }
    );
    if (data === null) {
      return "Contact not found";
    }
    return data;
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

module.exports = {
  connectdb,
  disconnectdb,
  listContactsDB,
  getContactByIdDB,
  removeContactDB,
  addContactDB,
  updateContactDB,
  updateStatusContactDB,
  dbstatus,
};

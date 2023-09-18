const Contactdb = require("./schemas/contact");
const dbstatus = require("./status/dbstate");

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
    if (dbstatus.dbstatusValue() !== 1) {
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

const listContactsAuthDB = async ({ query }) => {
  try {
    if (dbstatus.dbstatusValue() !== 1) {
      return "error";
    }
    // let countUserAuthDocuments;
    const filter = {};
    if (query._id !== undefined) {
      filter.owner = query._id;
      // if (query.page !== undefined) {
      //   countUserAuthDocuments = await Contactdb.countDocuments({
      //     owner: filter.owner,
      //   });
      // }
    }
    if (query.favorite !== undefined) {
      filter.favorite = query.favorite;
    }

    const options = {};
    if (query.limit !== undefined) {
      options.limit = query.limit;
    }
    if (query.limit !== undefined && query.page !== undefined) {
      options.skip = (query.page - 1) * query.limit;
    }

    const data = await Contactdb.find({ ...filter }, null, { ...options });

    return data;
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

const getContactByIdDB = async (contactId) => {
  try {
    if (dbstatus.dbstatusValue() !== 1) {
      return "error";
    }
    if (!dbstatus.isValidId(contactId)) {
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
    if (dbstatus.dbstatusValue() !== 1) {
      return "error";
    }
    if (!dbstatus.isValidId(contactId)) {
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

const addContactDB = async (body, user) => {
  try {
    if (dbstatus.dbstatusValue() !== 1) {
      return "error";
    }
    const { name, email, phone, favorite } = body;
    const dataCreate = { name, email, phone, favorite };
    if (user !== undefined) {
      dataCreate.owner = user._id;
    }
    const data = await Contactdb.create({ ...dataCreate });
    return data;
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

const updateContactDB = async (contactId, body) => {
  try {
    if (dbstatus.dbstatusValue() !== 1) {
      return "error";
    }
    if (!dbstatus.isValidId(contactId)) {
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
    if (dbstatus.dbstatusValue() !== 1) {
      return "error";
    }
    const { favorite } = body;
    if (!dbstatus.isValidId(contactId)) {
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
  listContactsDB,
  listContactsAuthDB,
  getContactByIdDB,
  removeContactDB,
  addContactDB,
  updateContactDB,
  updateStatusContactDB,
};

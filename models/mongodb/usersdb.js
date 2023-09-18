const Userdb = require("./schemas/user");
const dbstatus = require("./status/dbstate");
const auth = require("./auth/auth");
require("dotenv").config();
const secret = process.env.secret;
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const isRegistred = async ({ email }) => {
  try {
    if (dbstatus.dbstatusValue() !== 1) {
      return "error";
    }
    const data = await Userdb.findOne({ email: email }).lean();
    if (data === null) {
      return "Email not found";
    }
    if (data) {
      return "Email found";
    }
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

const registerUser = async ({ email, password, subscription }) => {
  try {
    if (dbstatus.dbstatusValue() !== 1) {
      return "error";
    }
    const avatarURL = gravatar.url(
      email,
      { s: "100", r: "x", d: "retro" },
      true
    );
    const verificationToken = nanoid();
    const newUser = new Userdb({
      email,
      subscription,
      avatarURL,
      verificationToken,
    });
    newUser.setPassword(password);
    await newUser.save();
    return newUser;
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

const loginUser = async ({ email, password }) => {
  try {
    if (dbstatus.dbstatusValue() !== 1) {
      return "error";
    }
    const data = await Userdb.findOne({ email: email });
    // const data = await Userdb.findOne({ email: email }).lean();
    if (!data || !data.validPassword(password)) {
      return "error";
    }
    if (data.verify === false) {
      return "verify email";
    }
    // if (
    //   !data ||
    //   !auth.validPassword({
    //     passwordLogin: password,
    //     passwordDB: data.password,
    //   })
    // ) {
    //   return "error";
    // }
    const payload = {
      id: data._id,
      email: data.email,
    };
    const token = auth.codeJWT({
      payload: payload,
      secret: secret,
      expires: "1h",
    });
    data.token = token;
    const dataUpdated = await Userdb.findOneAndUpdate(
      { _id: data._id },
      { token: token },
      {
        new: true,
      }
    );
    if (dataUpdated === null) {
      return "error";
    }
    return data;
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

const logoutUser = async ({ _id }) => {
  try {
    if (dbstatus.dbstatusValue() !== 1) {
      return "error";
    }
    const data = await Userdb.findOneAndUpdate(
      { _id: _id },
      { token: "" },
      { new: true }
    );
    if (data === null) {
      return "error";
    }
    return data;
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

const currentUser = async ({ _id }) => {
  try {
    if (dbstatus.dbstatusValue() !== 1) {
      return "error";
    }
    const data = await Userdb.findOne({ _id: _id });
    if (data === null) {
      return "error";
    }
    return data;
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

const subscriptionUpdate = async ({ _id, subscription }) => {
  try {
    if (dbstatus.dbstatusValue() !== 1) {
      return "error";
    }
    if (!dbstatus.isValidId(_id)) {
      return "error";
    }
    const data = await Userdb.findOneAndUpdate(
      { _id: _id },
      { subscription: subscription },
      { new: true }
    );
    if (data === null) {
      return "error";
    }
    return data;
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

const avatarUpdate = async ({ _id, avatarPath }) => {
  try {
    if (dbstatus.dbstatusValue() !== 1) {
      return "error";
    }
    const data = await Userdb.findOneAndUpdate(
      { _id: _id },
      { avatarURL: avatarPath },
      { new: true }
    );
    if (data === null) {
      return "error";
    }
    return data;
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

const verifyEmail = async ({ verificationToken }) => {
  try {
    if (dbstatus.dbstatusValue() !== 1) {
      return "error";
    }

    const data = await Userdb.findOneAndUpdate(
      { verificationToken: verificationToken },
      { verificationToken: null, verify: true },
      { new: true }
    );

    if (data === null) {
      return "not found";
    }
    return "ok";
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

const verifyEmailResend = async ({ email }) => {
  try {
    if (dbstatus.dbstatusValue() !== 1) {
      return "error";
    }

    const data = await Userdb.findOne({ email: email });
    if (data === null) {
      return "error";
    }
    if (data.verify === true) {
      return "verified";
    } else {
      return data;
    }
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
};

module.exports = {
  isRegistred,
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  subscriptionUpdate,
  avatarUpdate,
  verifyEmail,
  verifyEmailResend,
};

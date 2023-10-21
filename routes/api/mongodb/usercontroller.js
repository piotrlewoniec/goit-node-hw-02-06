const usersdb = require("../../../models/mongodb/usersdb");
// const User = require("../../../models/mongodb/schemas/user");
const passport = require("passport");

const authmidd = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

const getUserInfoDB = async (req, res, next) => {
  res.status(200).json({
    message: "users handle endpoint. send needed data auth: {email, password}",
    status: "success",
    code: 200,
    auth: [
      {
        register: {
          email: "required",
          password: "required",
          subscription: "starter, pro, business, default starter",
        },
      },
    ],
  });
};

const postUserRegisterDB = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  if (
    email === "" ||
    email === undefined ||
    password === "" ||
    password === undefined
  ) {
    return res.status(400).json({
      message: "missing required field",
      status: "fail",
      code: 400,
    });
  }
  const regexEmailPattern =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const regexEmail = new RegExp(regexEmailPattern);
  const regexPwdPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const regexPwd = new RegExp(regexPwdPattern);
  if (!regexEmail.test(email) || !regexPwd.test(password)) {
    // if (!regexEmail.test(email)) {
    return res.json({
      message:
        "Correct email or password. Password with minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      status: "fail",
      code: 400,
    });
  }
  const user = await usersdb.isRegistred({ email: email });
  if (user === "error") {
    return res.json({
      message: "Server internal error",
      status: "fail",
      code: 500,
    });
  }
  if (user === "Email found") {
    return res.status(409).json({
      status: "conflict",
      code: 409,
      message: "Email in use",
      data: "Conflict",
    });
  }
  try {
    const newUser = await usersdb.registerUser({
      email: email,
      password: password,
      subscription: subscription,
    });
    if (newUser === "error") {
      return res.json({
        message: "Server internal error",
        status: "fail",
        code: 500,
      });
    }
    res.status(201).json({
      status: "Created",
      code: 201,
      message: "Registration successful",
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const postUserLoginDB = async (req, res, next) => {
  const { email, password } = req.body;
  if (
    email === "" ||
    email === undefined ||
    password === "" ||
    password === undefined
  ) {
    return res.status(400).json({
      message: "missing required field",
      status: "fail",
      code: 400,
    });
  }
  const regexEmailPattern =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const regexEmail = new RegExp(regexEmailPattern);
  const regexPwdPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const regexPwd = new RegExp(regexPwdPattern);
  if (!regexEmail.test(email) || !regexPwd.test(password)) {
    // if (!regexEmail.test(email)) {
    return res.json({
      message:
        "Correct email or password. Password with minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      status: "fail",
      code: 400,
    });
  }
  const loggedIn = await usersdb.loginUser({
    email: email,
    password: password,
  });
  if (loggedIn === "error") {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Email or password is wrong",
      data: "Unauthorized",
    });
  }
  return res.status(200).json({
    status: "OK",
    code: 200,
    message: "Authorized",
    data: {
      user: {
        email: loggedIn.email,
        subscription: loggedIn.subscription,
        avatarURL: loggedIn.avatarURL,
      },
      token: loggedIn.token,
    },
  });
};

const getUserLogoutDB = async (req, res, next) => {
  const { _id } = req.user;

  const loggedOut = await usersdb.logoutUser({ _id: _id });
  if (loggedOut === "error") {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Unauthorized",
      data: "Unauthorized",
    });
  } else {
    return res.status(204).json({
      status: "OK",
      code: 204,
      message: "logged out",
      data: "logged out",
    });
  }
};

const getUserCurrentDB = async (req, res, next) => {
  const { _id } = req.user;
  const currentLoggedIn = await usersdb.currentUser({ _id: _id });
  if (currentLoggedIn === "error") {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Unauthorized",
      data: "Unauthorized",
    });
  }
  return res.status(200).json({
    status: "OK",
    code: 200,
    message: "current user info",
    data: {
      email: currentLoggedIn.email,
      subscription: currentLoggedIn.subscription,
      avatarURL: currentLoggedIn.avatarURL,
    },
  });
};

const patchUserSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  if (subscription === undefined) {
    res.json({
      message: "missing field subscription",
      status: "fail",
      code: 400,
    });
    return;
  }
  const subscriptionOptions = ["starter", "pro", "business"];
  if (!subscriptionOptions.some((element) => element === subscription)) {
    res.json({
      message: "field subscription have to be 'starter', 'pro', 'business'",
      status: "fail",
      code: 400,
    });
    return;
  }
  const data = await usersdb.subscriptionUpdate({
    _id: req.params.userId,
    subscription: req.body.subscription,
  });
  if (data === "error") {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Unauthorized",
      data: "Unauthorized",
    });
  } else {
    res.json({
      message: `User subscription type updated`,
      status: "success",
      code: 200,
      data: {
        email: data.email,
        subscription: data.subscription,
      },
    });
  }
};

const patchUserAvatars = async (req, res, next) => {
  const { _id, avatarURL } = req.user;
  const data = await usersdb.avatarUpdate({ _id: _id, avatarPath: avatarURL });
  if (data === "error") {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Unauthorized",
      data: "Unauthorized",
    });
  }
  return res.status(200).json({
    status: "OK",
    code: 200,
    message: "avatarURL",
    data: {
      avatarURL: data.avatarURL,
    },
  });
};

module.exports = {
  getUserInfoDB,
  postUserRegisterDB,
  postUserLoginDB,
  getUserLogoutDB,
  getUserCurrentDB,
  patchUserSubscription,
  patchUserAvatars,
  authmidd,
};

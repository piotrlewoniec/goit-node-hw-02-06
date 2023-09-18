const ctrlUsersDB = require("./usercontroller");
const ctrlFileUpload = require("../../../models/fileupload/multer");

const expressdb = require("express");
const routerUsersdb = expressdb.Router();

routerUsersdb.get("/info", ctrlUsersDB.getUserInfoDB);
routerUsersdb.post("/signup", ctrlUsersDB.postUserRegisterDB);
routerUsersdb.post("/login", ctrlUsersDB.postUserLoginDB);
routerUsersdb.get("/logout", ctrlUsersDB.authmidd, ctrlUsersDB.getUserLogoutDB);
routerUsersdb.get(
  "/current",
  ctrlUsersDB.authmidd,
  ctrlUsersDB.getUserCurrentDB
);
routerUsersdb.patch(
  "/:userId/subscription",
  ctrlUsersDB.authmidd,
  ctrlUsersDB.patchUserSubscription
);
routerUsersdb.patch(
  "/avatars",
  ctrlUsersDB.authmidd,
  ctrlFileUpload.upload.single("avatar"),
  ctrlFileUpload.uploadAvatar,
  ctrlUsersDB.patchUserAvatars
);
routerUsersdb.get("/verify/:verificationToken", ctrlUsersDB.getVerifyEmail);
routerUsersdb.post("/verify", ctrlUsersDB.postVerifyEmailResend);

module.exports = routerUsersdb;

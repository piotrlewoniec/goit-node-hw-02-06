const ctrlUsersDB = require("./usercontroller");

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

module.exports = routerUsersdb;

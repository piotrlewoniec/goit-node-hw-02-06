const ctrlContactsDB = require("./contactscontrollerauth");
const ctrlUsersDB = require("./usercontroller");

const expressdb = require("express");
const routerdbAuth = expressdb.Router();

routerdbAuth.get("/", ctrlUsersDB.authmidd, ctrlContactsDB.getAllContactsDB);
routerdbAuth.get(
  "/:contactId",
  ctrlUsersDB.authmidd,
  ctrlContactsDB.getContactByIDDB
);
routerdbAuth.post("/", ctrlUsersDB.authmidd, ctrlContactsDB.postContactDB);
routerdbAuth.delete(
  "/:contactId",
  ctrlUsersDB.authmidd,
  ctrlContactsDB.deleteContactDB
);
routerdbAuth.put(
  "/:contactId",
  ctrlUsersDB.authmidd,
  ctrlContactsDB.putContactDB
);
routerdbAuth.patch(
  "/:contactId/favorite",
  ctrlUsersDB.authmidd,
  ctrlContactsDB.patchContactFav
);

module.exports = routerdbAuth;

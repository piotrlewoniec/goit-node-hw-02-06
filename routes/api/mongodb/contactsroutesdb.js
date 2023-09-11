const ctrlContactsDB = require("./contactscontroller");

const expressdb = require("express");
const routerdb = expressdb.Router();

routerdb.get("/", ctrlContactsDB.getAllContactsDB);
routerdb.get("/:contactId", ctrlContactsDB.getContactByIDDB);
routerdb.post("/", ctrlContactsDB.postContactDB);
routerdb.delete("/:contactId", ctrlContactsDB.deleteContactDB);
routerdb.put("/:contactId", ctrlContactsDB.putContactDB);
routerdb.patch("/:contactId/favorite", ctrlContactsDB.patchContactFav);

module.exports = routerdb;

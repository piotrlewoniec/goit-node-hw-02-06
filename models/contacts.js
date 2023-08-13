// const fs = require('fs/promises')

const listContacts = async () => {};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

// import { nanoid } from "nanoid/async";
// const { nanoid } = require("nanoid/non-secure");
// const n = import("nanoid");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = "./db/contacts.json";
const { nanoid } = require("nanoid");
// global.name = "test app";

async function loadFile(path) {
  let file;
  try {
    file = await fs.readFile(path);
  } catch (err) {
    console.log(err.message);
  }
  return JSON.parse(file.toString());
}

async function saveFile(path, data) {
  fs.writeFile(path, JSON.stringify(data))
    .then(() => console.log("File saved"))
    .catch((err) => console.log(err.message));
}

async function listContacts() {
  const data = await loadFile(contactsPath);
  console.table(data);
}

async function getContactById(contactId) {
  const data = await loadFile(contactsPath);
  const filteredData = data.filter((element) => element.id === contactId);
  console.table(filteredData);
}

async function removeContact(contactId) {
  const data = await loadFile(contactsPath);
  const index = data.findIndex((element) => element.id === contactId);
  if (index === -1) {
    console.log("Contact not found");
  } else {
    data.splice(index, 1);
    console.log("Contact removed");
    saveFile(contactsPath, data);
  }
}

async function addContact({ name, email, phone }) {
  const data = await loadFile(contactsPath);
  data.push({ id: nanoid(), name: name, email: email, phone: phone });
  console.log("Contact added");
  saveFile(contactsPath, data);
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

/*
path:
basename()	Returns the last part of a path
delimiter	Returns the delimiter specified for the platform
dirname()	Returns the directories of a path
extname()	Returns the file extension of a path
format()	Formats a path object into a path string
isAbsolute()	Returns true if a path is an absolute path, otherwise false
join()	Joins the specified paths into one
normalize()	Normalizes the specified path
parse()	Formats a path string into a path object
posix	Returns an object containing POSIX specific properties and methods
relative()	Returns the relative path from one specified path to another specified path
resolve()	Resolves the specified paths into an absolute path
sep	Returns the segment separator specified for the platform
win32	Returns an object containing Windows specific properties and methods
*/

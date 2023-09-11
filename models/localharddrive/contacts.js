const contactsPath = "./models/localharddrive/data/contacts.json";
const fs = require("fs").promises;
// const path = require("path");
const { nanoid } = require("nanoid");

async function loadFile(path) {
  let file;
  try {
    file = await fs.readFile(path);
  } catch (err) {
    return "error";
  }
  try {
    return JSON.parse(file.toString());
  } catch (err) {
    return "error";
  }
}

async function saveFile(path, data) {
  fs.writeFile(path, JSON.stringify(data))
    .then(() => "ok")
    .catch(() => "error");
}

const listContacts = async () => {
  const data = await loadFile(contactsPath);
  return data;
};

const getContactById = async (contactId) => {
  const data = await loadFile(contactsPath);
  if (data === "error") {
    return "error";
  } else {
    const filteredData = data.filter((element) => element.id === contactId);
    return filteredData;
  }
};

const removeContact = async (contactId) => {
  const data = await loadFile(contactsPath);
  if (data === "error") {
    return "error";
  } else {
    const index = data.findIndex((element) => element.id === contactId);
    if (index === -1) {
      return [];
    } else {
      data.splice(index, 1);
      saveFile(contactsPath, data);
      return ["deleted"];
    }
  }
};

const addContact = async (body) => {
  const data = await loadFile(contactsPath);
  if (data === "error") {
    return "error";
  } else {
    body.id = nanoid();
    data.push(body);
    const dataNew = saveFile(contactsPath, data);
    if (dataNew === "error") {
      return "error";
    } else {
      return [body];
    }
  }
};

const updateContact = async (contactId, body) => {
  const data = await loadFile(contactsPath);
  if (data === "error") {
    return "error";
  } else {
    const index = data.findIndex((element) => element.id === contactId);
    if (index === -1) {
      return [];
    } else {
      if (body.name !== undefined) {
        data[index].name = body.name;
      }
      if (body.email !== undefined) {
        data[index].email = body.email;
      }
      if (body.phone !== undefined) {
        data[index].phone = body.phone;
      }
      const dataNew = saveFile(contactsPath, data);
      if (dataNew === "error") {
        return "error";
      } else {
        return [data[index]];
      }
    }
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

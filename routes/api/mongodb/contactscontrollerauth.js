const contactsdb = require("../../../models/mongodb/contactsdb");

// ?page=1&limit=3&favorite=true

const getAllContactsDB = async (req, res, next) => {
  const { page: p, limit: lim, favorite: fav } = req.query;
  const { _id } = req.user;
  let page, limit, favorite;
  if (p !== undefined) {
    page = JSON.parse(p);
  }
  if (lim !== undefined) {
    limit = JSON.parse(lim);
  }
  if (fav !== undefined) {
    favorite = JSON.parse(fav);
  }
  const query = {
    page,
    limit,
    favorite,
    _id,
  };
  const data = await contactsdb.listContactsAuthDB({ query: query });
  if (data === "error") {
    res.json({
      message: "Server internal error",
      status: "fail",
      code: 500,
    });
  } else {
    res.json({
      message: "Selected contacts list",
      status: "success",
      code: 200,
      data: {
        contacts: data,
      },
    });
  }
};

const getContactByIDDB = async (req, res, next) => {
  const data = await contactsdb.getContactByIdDB(req.params.contactId);
  if (data === "error") {
    res.json({
      message: "Server internal error",
      status: "fail",
      code: 500,
    });
  } else if (data === "Wrong id number") {
    res.json({
      message: "Wrong id number",
      status: "fail",
      code: 400,
    });
  } else if (data.length === 0) {
    res.json({ message: "Contact not found", status: "fail", code: 404 });
  } else if (data === "Contact not found") {
    res.json({ message: "Contact not found", status: "fail", code: 404 });
  } else {
    res.json({
      message: `Contact found id: ${req.params.contactId}`,
      status: "success",
      code: 200,
      data: {
        contacts: data,
      },
    });
  }
};

const postContactDB = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  if (
    name === "" ||
    name === undefined ||
    email === "" ||
    email === undefined ||
    phone === "" ||
    phone === undefined ||
    favorite === "" ||
    favorite === undefined
  ) {
    res.json({
      message: "missing required field",
      status: "fail",
      code: 400,
    });
  } else {
    const regexNamePattern = /^[a-zA-Za]+(([' -][a-zA-Za])?[a-zA-Za]*)*$/;
    const regexPhonePattern =
      /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    const regexEmailPattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const regexName = new RegExp(regexNamePattern);
    const regexPhone = new RegExp(regexPhonePattern);
    const regexEmail = new RegExp(regexEmailPattern);
    if (
      !regexName.test(name) ||
      !regexPhone.test(phone) ||
      !regexEmail.test(email)
    ) {
      res.json({
        message:
          "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +. Correct email.",
        status: "fail",
        code: 400,
      });
      return;
    }
    const data = await contactsdb.addContactDB(req.body, req.user);
    if (data === "error") {
      res.json({
        message: "Server internal error",
        status: "fail",
        code: 500,
      });
    } else {
      res.json({
        message: `Contact added`,
        status: "success",
        code: 201,
        data: {
          contacts: data,
        },
      });
    }
  }
};

const deleteContactDB = async (req, res, next) => {
  const data = await contactsdb.removeContactDB(req.params.contactId);
  if (data === "error") {
    res.json({
      message: "Server internal error",
      status: "fail",
      code: 500,
    });
  } else if (data === "Wrong id number") {
    res.json({
      message: "Wrong id number",
      status: "fail",
      code: 400,
    });
  } else if (data === "Contact not found") {
    res.json({ message: "Contact not found", status: "fail", code: 404 });
  } else if (data.length === 0) {
    res.json({ message: "Contact not found", status: "fail", code: 404 });
  } else {
    res.json({
      message: `Contact deleted`,
      status: "success",
      code: 200,
    });
  }
};

const putContactDB = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  if (
    name === undefined &&
    email === undefined &&
    phone === undefined &&
    favorite === undefined
  ) {
    res.json({ message: "missing fields", status: "fail", code: 400 });
  } else {
    const regexNamePattern = /^[a-zA-Za]+(([' -][a-zA-Za])?[a-zA-Za]*)*$/;
    const regexPhonePattern =
      /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    const regexEmailPattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    const regexName = new RegExp(regexNamePattern);
    const regexPhone = new RegExp(regexPhonePattern);
    const regexEmail = new RegExp(regexEmailPattern);
    if (
      (name !== "" && name !== undefined && !regexName.test(name)) ||
      (phone !== "" && phone !== undefined && !regexPhone.test(phone)) ||
      (email !== "" && email !== undefined && !regexEmail.test(email))
    ) {
      res.json({
        message:
          "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +. Correct email.",
        status: "fail",
        code: 400,
      });
      return;
    }
    const data = await contactsdb.updateContactDB(
      req.params.contactId,
      req.body
    );
    if (data === "error") {
      res.json({
        message: "Server internal error",
        status: "fail",
        code: 500,
      });
    } else if (data.length === 0) {
      res.json({ message: "Contact not found", status: "fail", code: 404 });
    } else if (data === "Wrong id number") {
      res.json({
        message: "Wrong id number",
        status: "fail",
        code: 400,
      });
    } else if (data === "Contact not found") {
      res.json({ message: "Contact not found", status: "fail", code: 404 });
    } else {
      res.json({
        message: `Contact updated`,
        status: "success",
        code: 200,
        data: {
          contacts: data,
        },
      });
    }
  }
};

const patchContactFav = async (req, res, next) => {
  const { favorite } = req.body;
  if (favorite === undefined) {
    res.json({ message: "missing field favorite", status: "fail", code: 400 });
    return;
  }
  if (typeof favorite !== "boolean") {
    res.json({
      message: "field favorite have to be boolean type",
      status: "fail",
      code: 400,
    });
    return;
  }
  const data = await contactsdb.updateStatusContactDB(
    req.params.contactId,
    req.body
  );
  if (data === "error") {
    res.json({
      message: "Server internal error",
      status: "fail",
      code: 500,
    });
  } else if (data === "Wrong id number") {
    res.json({
      message: "Wrong id number",
      status: "fail",
      code: 400,
    });
  } else if (data === "Contact not found") {
    res.json({ message: "Contact not found", status: "fail", code: 404 });
  } else if (data.length === 0) {
    res.json({ message: "Contact not found", status: "fail", code: 404 });
  } else {
    res.json({
      message: `Contact status updated`,
      status: "success",
      code: 200,
      data: {
        contacts: data,
      },
    });
  }
};

module.exports = {
  getAllContactsDB,
  getContactByIDDB,
  postContactDB,
  deleteContactDB,
  putContactDB,
  patchContactFav,
};

const contacts = require("../../models/contacts");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await contacts.listContacts();
  if (data === "error") {
    res.json({
      message: "Server internal error",
      status: "fail",
      code: 500,
    });
  } else {
    res.json({
      message: "Complete contacts list",
      status: "success",
      code: 200,
      data: {
        contacts: data,
      },
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const data = await contacts.getContactById(req.params.contactId);
  if (data === "error") {
    res.json({
      message: "Server internal error",
      status: "fail",
      code: 500,
    });
  } else {
    if (data.length === 0) {
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
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (
    name === "" ||
    name === undefined ||
    email === "" ||
    email === undefined ||
    phone === "" ||
    phone === undefined
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
    const data = await contacts.addContact(req.body);
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
});

router.delete("/:contactId", async (req, res, next) => {
  const data = await contacts.removeContact(req.params.contactId);
  if (data === "error") {
    res.json({
      message: "Server internal error",
      status: "fail",
      code: 500,
    });
  } else {
    if (data.length === 0) {
      res.json({ message: "Contact not found", status: "fail", code: 404 });
    } else {
      res.json({
        message: `Contact deleted`,
        status: "success",
        code: 200,
      });
    }
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name === undefined && email === undefined && phone === undefined) {
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
    const data = await contacts.updateContact(req.params.contactId, req.body);
    if (data === "error") {
      res.json({
        message: "Server internal error",
        status: "fail",
        code: 500,
      });
    } else {
      if (data.length === 0) {
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
  }
});

module.exports = router;

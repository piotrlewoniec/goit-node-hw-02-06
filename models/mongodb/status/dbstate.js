const mongoose = require("mongoose");

const dbState = [
  {
    value: 0,
    label: "disconnected",
  },
  {
    value: 1,
    label: "connected",
  },
  {
    value: 2,
    label: "connecting",
  },
  {
    value: 3,
    label: "disconnecting",
  },
];

const dbstatus = () =>
  dbState.find((f) => f.value === mongoose.connection.readyState).label;

const dbstatusValue = () => mongoose.connection.readyState;

const isValidId = (contactId) => mongoose.Types.ObjectId.isValid(contactId);

module.exports = { dbstatus, dbstatusValue, isValidId };

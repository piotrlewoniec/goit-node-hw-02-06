const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const db = require("./models/mongodb/status/dbstate");

const contactsRouter = require("./routes/api/localharddrive/contactsroutes");
const contactsDBRouter = require("./routes/api/mongodb/contactsroutesdb");
const usersDBRouter = require("./routes/api/mongodb/userroutesdb");
const contactsDBrouterAuth = require("./routes/api/mongodb/contactsroutesauthdb");

const app = express();
// const appdb = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// const formatsLoggerdb = appdb.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// appdb.use(logger(formatsLoggerdb));
// appdb.use(cors());
// appdb.use(express.json());

app.use("/api/v1/contacts", contactsRouter);
app.use("/api/v2/contacts", contactsDBRouter);
app.use("/api/v3/users", usersDBRouter);
app.use("/api/v3/contacts", contactsDBrouterAuth);

app.use("/css", express.static(path.join(__dirname, "views/pages/css")));
app.use("/js", express.static(path.join(__dirname, "views/pages/js")));
app.use("/images", express.static(path.join(__dirname, "views/pages/images")));
app.use("/avatars", express.static(path.join(__dirname, "public/avatars")));

app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.render("./pages/index");
});

app.get("/uptime/db", function (req, res) {
  res.status(200).json({
    message: "DB status",
    status: db.dbstatus(),
    code: 200,
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
    data: "Not found",
  });
});

// appdb.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });

});

// appdb.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

module.exports = app;

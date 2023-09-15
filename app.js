const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const db = require("./models/contactsdb");

const contactsRouter = require("./routes/api/contacts");
const contactsDBRouter = require("./routes/api/contactsdb");

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


app.use("/css", express.static(path.join(__dirname, "views/pages/css")));
app.use("/js", express.static(path.join(__dirname, "views/pages/js")));
app.use("/images", express.static(path.join(__dirname, "views/pages/images")));

app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.render("./pages/index");
});

app.get("/uptime/db", function (req, res) {
  res.json({
    message: "DB status",
    status: db.dbstatus(),
    code: 200,
  });
});


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// appdb.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });


app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// appdb.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });


module.exports = app;

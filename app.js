const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/v1/contacts", contactsRouter);

app.use("/css", express.static(path.join(__dirname, "views/pages/css")));
app.use("/js", express.static(path.join(__dirname, "views/pages/js")));
app.use("/images", express.static(path.join(__dirname, "views/pages/images")));

app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.render("./pages/index");
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

const app = require("./app");

require("dotenv").config();
const uriDbENV = process.env.uriDb;
const secret = process.env.secret;
const dbname = "db-contacts";
// const appdb = require("./app");
const Userdb = require("./models/mongodb/schemas/user");

const db = require("./models/mongodb/status/dbconnections");
const auth = require("./models/mongodb/auth/auth");

auth.strategyJWT({ secret: secret, User: Userdb });

(async () => {
  try {
    await db.connectdb({ uriDbENV: uriDbENV, dbname: dbname });
    console.log(`Connected to database`);
  } catch (err) {
    console.log(`Connection to database faild: ${err.message}`);
    return "error";
  }
})();

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

// appdb.listen(3001, () => {
//   console.log("Server running. Use our API on port: 3001");
// });

const dbConnectionClose = function (msg, callback) {
  db.disconnectdb();
  console.log("Mongoose disconnected through " + msg);
  callback();
};
// For nodemon restarts
process.once("SIGUSR2", function () {
  dbConnectionClose("nodemon restart", function () {
    process.kill(process.pid, "SIGUSR2");
  });
});
// For app termination
process.on("SIGINT", function () {
  dbConnectionClose("app termination", function () {
    process.exit(0);
  });
});
// For Heroku app termination
process.on("SIGTERM", function () {
  dbConnectionClose("Heroku app termination", function () {
    process.exit(0);
  });
});
// For process exit
process.on("exit", function () {
  dbConnectionClose("process exit", function () {
    process.exit(0);
  });
});

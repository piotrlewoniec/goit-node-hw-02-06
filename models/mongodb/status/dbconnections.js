const mongoose = require("mongoose");

const connectdb = ({ uriDbENV, dbname }) =>
  mongoose.connect(uriDbENV, {
    //   promiseLibrary: global.Promise,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbname,
  });

const disconnectdb = async () => {
  await mongoose.disconnect();
};

// const disconnectdb = mongoose.connection.close();

module.exports = {
  connectdb,
  disconnectdb,
};

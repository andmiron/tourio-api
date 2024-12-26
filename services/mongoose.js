const mongoose = require("mongoose");
const config = require("../config/config");

module.exports = async () => {
  try {
    await mongoose.connect(config.MONGO_CONN_STRING);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
};

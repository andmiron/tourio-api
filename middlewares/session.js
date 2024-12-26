const session = require("express-session");
const config = require("../config/config");
const MongoStore = require("connect-mongo");

module.exports = session({
  name: config.SESSION_NAME,
  secret: config.SESSION_SECRET,
  store: new MongoStore({ mongoUrl: config.MONGO_CONN_STRING }),
  resave: true,
  saveUninitialized: true,
  rolling: true,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
});

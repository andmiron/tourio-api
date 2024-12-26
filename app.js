const express = require("express");
const logger = require("./middlewares/logger");
const connectMongo = require("./services/mongoose");
const session = require("./middlewares/session");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const passport = require("./services/passport");
const authRoutes = require("./components/auth/authRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(logger);
(async () => {
  await connectMongo();
})();
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

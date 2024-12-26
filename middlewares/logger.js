const pinoHttp = require("pino-http");
const pino = require("pino");
const { randomUUID } = require("node:crypto");

module.exports = pinoHttp({
  logger: pino({
    transport: {
      target: "pino-pretty",
      colorize: true,
    },
  }),
  genReqId: function (req, res) {
    const existingID = req.id ?? req.headers["x-request-id"];
    if (existingID) return existingID;
    const id = randomUUID();
    res.setHeader("X-Request-Id", id);
    return id;
  },
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
      query: req.query,
      params: req.params,
      headers: req.headers,
    }),
    res: (res) => ({
      status: res.statusCode,
      headers: res.headers,
    }),
  },
  customAttributeKeys: {
    req: "request",
    res: "response",
    err: "error",
    responseTime: "timeTaken",
  },
  customSuccessMessage: function (req) {
    return `Request completed: ${req.method} ${req.url} ${req.id}`;
  },
});

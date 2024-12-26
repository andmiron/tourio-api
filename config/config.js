const joi = require("joi");
require("dotenv").config();

const envVarSchema = joi
  .object({
    PORT: joi.number().positive().default(3000),
    MONGO_DB_CONN_STRING: joi.string().required(),
    NODE_ENV: joi.string().valid("development", "production").required(),
    SESSION_SECRET: joi.string().required(),
    SESSION_NAME: joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarSchema.validate(process.env);

if (error) {
  console.error(`Config validation error: ${error.message}`);
}

module.exports = {
  PORT: envVars.PORT,
  MONGO_CONN_STRING: envVars.MONGO_DB_CONN_STRING,
  NODE_ENV: envVars.NODE_ENV,
  SESSION_SECRET: envVars.SESSION_SECRET,
  SESSION_NAME: envVars.SESSION_NAME,
};

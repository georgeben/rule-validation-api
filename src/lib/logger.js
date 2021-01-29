/**
 * Configures a custom logger for logging errors, and results of certain operations.
 */

const winston = require("winston");

const { format } = winston;

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: format.combine(
        winston.format.colorize(),
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.simple(),
      ),
    }),
  ],
  // Stores all uncaught exceptions
  exceptionHandlers: [
    new winston.transports.File({
      filename: "exceptions.log",
      dirname: "./logs",
    }),
  ],
});

module.exports = logger;

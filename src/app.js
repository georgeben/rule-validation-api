const http = require("http");
const express = require("express");
const helmet = require("helmet");
const HTTP_STATUS_CODES = require("http-status-codes");
const cors = require("cors");
const expressRequestId = require("express-request-id");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const config = require("./config");
const routes = require("./routes");
const notFoundHandler = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const ResponseManager = require("./helpers/response");

const { bodyLimit, allowedOrigins, logFormat } = config;

const app = express();
app.use(helmet());

app.use(
  cors({
    origin: (origin, cb) => {
      if (allowedOrigins.trim() === "*") {
        cb(null, true);
      } else {
        const origins = allowedOrigins.split(",");
        if (origins.indexOf(origin) !== -1 || !origin) {
          cb(null, true);
        } else {
          cb(new Error(`Origin('${origin}') not allowed`, false));
        }
      }
    },
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }),
);

app.use(expressRequestId());

// Parse application/json
app.use((req, res, next) => {
  bodyParser.json({
    limit: bodyLimit,
  })(req, res, (err) => {
    if (err) {
      return ResponseManager.respondWithError(
        res,
        "Invalid JSON payload passed.",
        null,
        HTTP_STATUS_CODES.BAD_REQUEST,
      );
    }
    return next();
  });
});

app.use(morgan(logFormat));

app.use("/", routes);
app.use(notFoundHandler);
app.use(errorHandler);

const server = http.createServer(app);

module.exports = server;

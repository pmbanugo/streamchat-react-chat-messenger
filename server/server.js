const express = require("express");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");

const router = express.Router();

const PORT = 3005;
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${config.AUTH0_DOMAIN}.well-known/jwks.json`
  }),
  audience: [config.AUDIENCE],
  issuer: config.AUTH0_DOMAIN,
  algorithm: config.ALGORITHM
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
  // When the application is built, this file will be created.
  // It currently is not created.
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));

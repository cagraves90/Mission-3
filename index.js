const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const http = require("http");
const server = http.createServer(app);
module.exports = server;

/* ============== Middleware ================== */
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

/* =============== Default root route ========== */
app.get("/", (req, res) => {
  res.send("Server Connected!");
});

app.get("/carInfo", (req, res) => {
  res.send({});
});

// --------------------------------------------------------------- API ENDPOINT 1 --------------------------------------------------//

app.post("/carValueInput", (req, res) => {
  const { model, year } = req.body;

  if (!model || !year) {
    res.sendStatus(400).json({ error: "Invalid input" });
    return;
  } else if (year < 0) {
    return res.sendStatus(400).json({ error: "Invalid input" });
  } else if (typeof year != "number") {
    return res.sendStatus(400).json({ error: "Invalid input" });
  } else if (typeof model != "string") {
    return res.sendStatus(400).json({ error: "Invalid input" });
  }

  res.sendStatus(200);
});

module.exports = app;

/* ========================== PORT ============================= */

const port = process.env.MYSQL_PORT;

const serverPort = app
  .listen(port, () => {
    console.log(`The server is listening at http://localhost:${port}`);
  })
  .on("error", (error) => {
    console.log(error);
  });

module.exports = serverPort;

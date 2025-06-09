const express = require("express");
require("dotenv").config();
const { printjwtSecret } = require("./utils/authentication");

const app = express();
app.get("/", (req, res) => {
  printjwtSecret();
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

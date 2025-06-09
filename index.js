const express = require("express");
require("dotenv").config();
const userRoutes = require("./routes/user");
const gadgetRoutes = require("./routes/gadget");

const app = express();
app.use(express.json());
app.use("/user", userRoutes);
app.use("/gadget", gadgetRoutes);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Gadget Management API" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

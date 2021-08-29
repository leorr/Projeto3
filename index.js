const express = require("express");
const userController = require("./controller/userController");
const InitiateMongoServer = require("./config/db");

InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API ✓" });
});

/**
 * Router Middleware
 * Router - /userController/*
 * Method - *
 */
app.use("/userController", userController);


app.listen(PORT, (req, res) => {
  console.log(`Node server started at ${PORT}`);
});

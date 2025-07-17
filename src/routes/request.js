const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();

requestRouter.post("/sendconnectionrequest", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user.firstName + " sent the connection request");
  } catch (error) {
    res.status(400).send("error saving the user:" + error.message);
  }
});

module.exports = requestRouter;

const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("error saving the user:" + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("invalid Edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.send(`${loggedInUser.firstName}, your profile Edit was Successfull`);
  } catch (error) {
    res.status(400).send("error saving the user:" + error.message);
  }
});

module.exports = profileRouter;

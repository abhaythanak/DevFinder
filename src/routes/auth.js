const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationSignUpData } = require("../../utils/validation");

authRouter.post("/login", async (req, res) => {
  // "password":"Gta@2015",
  //   "emailId":"Abhay@gmail.com",
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
      throw new Error("Invalid Credentials");
    }
    if (user || validPassword) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successful !!!");
    }
  } catch (error) {
    res.status(400).send("error saving the user:" + error.message);
  }
});
authRouter.post("/signup", async (req, res) => {
  try {
    //  validation of data
    validationSignUpData(req);

    // Encrypt  the password
    const { password, firstName, lastName, emailId } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // creating new instances of the user model
    // const user = new Users(req.body);
    const user = new Users({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send(" added succefully");
  } catch (error) {
    res.status(400).send("error saving the user:" + error.message);
  }
});
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout Successful");
});

module.exports = authRouter;

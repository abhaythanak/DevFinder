// @ts-nocheck
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// const middleAuth = (req, res, next) => {
//   const token = "xyz";
//   const isAuth = token === "xyz";
//   if (!isAuth) {
//     res.status(401).send("wrong token added");
//   } else {
//     next();
//   }
// };
const userAuth = async (req, res, next) => {
  //  read the token from the req of cookies
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    // read the valid token
    if (!token) {
      throw new Error("Invalid Token");
    }

    const decodedObj = await jwt.verify(token, "edght87etgh7se96t");
    const { _id } = decodedObj;

    // find the user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not Found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("user Auth : " + error.message);
  }
};

module.exports = {
  // middleAuth,
  userAuth,
};
// try {
//     const cookies = req.cookies;
//     const { token } = cookies;
//     if (!token) {
//       throw new Error("Invalid token");
//     }
//     const decodedMessage = await jwt.verify(token, "edght87etgh7se96t");
//     console.log(decodedMessage);
//     //  u can get data of that user
//     // @ts-ignore
//     const { _id } = decodedMessage;
//     // console.log("loggined user is: " + _id);
//     const user = await User.findById(_id);
//     if (!user) {
//       throw new Error("User Not Found");
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(400).send("error saving the user:" + error.message);
//   }

// @ts-nocheck
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const useRouter = require("./routes/user");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", useRouter);

// app.use("/user", (req, res, next) => {
//   console.log("1 response");
//   res.send({ name: "abhay", lastname: "thanak" });
//   next();
// });
// app.use("/user", middleAuth);

// app.get("/user", (req, res) => {
//   res.send("alldata fetch");
// });
// app.get("/user/id", (req, res) => {
//   res.send("alldata fetch in id");
// });
//  get user by there email
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     console.log(userEmail);
//     const user = await Users.findOne({ emailId: userEmail });
//     if (!user) {
//       res.status(404).send("user not found");
//     } else {
//       res.send(user);
//     }
//   } catch (error) {
//     res.send(error);
//   }
// });

//  feed api GET feed api - get all users from the database

// app.get("/feed", async (req, res) => {
//   try {
//     const user = await Users.find({});
//     res.send(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// app.get("/profile", userAuth, async (req, res) => {
//   try {
//     const user = req.user;

//     res.send(user);
//   } catch (error) {
//     res.status(400).send("error saving the user:" + error.message);
//   }
// });

// app.post("/sendconnectionrequest", userAuth, async (req, res) => {
//   try {
//     const user = req.user;

//     res.send(user.firstName + " sent the connection request");
//   } catch (error) {
//     res.status(400).send("error saving the user:" + error.message);
//   }
// });

// app.post("/login", async (req, res) => {
//   // "password":"Gta@2015",
//   //   "emailId":"Abhay@gmail.com",
//   try {
//     const { emailId, password } = req.body;
//     const user = await User.findOne({ emailId: emailId });
//     if (!user) {
//       throw new Error("Invalid Credentials");
//     }
//     const validPassword = await user.validatePassword(password);
//     if (!validPassword) {
//       throw new Error("Invalid Credentials");
//     }
//     if (user || validPassword) {
//       // create a JWT Token
//       const token = await user.getJWT();
//       // const token = await jwt.sign({ _id: user._id }, "edght87etgh7se96t", {
//       //   expiresIn: "1d", // expire token 1d or add 1h -> hour
//       // }); // 1 what u wont to hide and 2 is secreate key
//       // console.log(token);

//       //  Add the token to cookie and send the response back to the user
//       // res.cookie("token", "fgkujhorig57ger57sg");
//       res.cookie("token", token, {
//         expires: new Date(Date.now() + 8 * 3600000),
//       });
//       res.send("Login Successful !!!");
//     }
//   } catch (error) {
//     res.status(400).send("error saving the user:" + error.message);
//   }
// });
// app.post("/signup", async (req, res) => {
//   try {
//     //  validation of data
//     validationSignUpData(req);

//     // Encrypt  the password
//     const { password, firstName, lastName, emailId } = req.body;
//     const passwordHash = await bcrypt.hash(password, 10);

//     // creating new instances of the user model
//     // const user = new Users(req.body);
//     const user = new Users({
//       firstName,
//       lastName,
//       emailId,
//       password: passwordHash,
//     });

//     await user.save();
//     res.send(" added succefully");
//   } catch (error) {
//     res.status(400).send("error saving the user:" + error.message);
//   }
// });

// app.patch("/user/:userId", async (req, res) => {
//   // const updateUserId = req.body.userId;   // never trust req.body
//   const updateUserId = req.params?.userId;
//   const data = req.body;
//   try {
//     const allowedUpdate = ["about", "gender", "age", "skills", "photoUrl"];
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       allowedUpdate.includes(k)
//     );
//     if (!isUpdateAllowed) {
//       throw new Error("update not allowed");
//     }
//     if (data?.skills.length > 10) {
//       throw new Error("Skills cannot be more than 10");
//     }
//     //  const user = await Users.findByIdAndUpdate(updateUserId, data); or add 1 more field document view
//     const user = await Users.findByIdAndUpdate(updateUserId, data, {
//       returnDocument: "after", // after or before
//       runValidators: true,
//     });

//     res.send(" update succefully" + user);
//     console.log(user);
//   } catch (error) {
//     res.status(400).send("error saving the user:" + error.message);
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;

//   try {
//     // const user = await Users.findByIdAndDelete({_id:userId}) or
//     const user = await Users.findByIdAndDelete(userId);
//     res.send(" deleted succefully");
//   } catch (error) {
//     res.status(400).send("error saving the user:" + error.message);
//   }
// });

connectDB()
  .then(() => {
    console.log("database connected");
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("dataBase cannot connected");
  });

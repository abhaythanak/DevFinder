const express = require("express");
const connectDB = require("./config/database");
const { middleAuth } = require("./middleware/auth");
const Users = require("./models/user");

const app = express();

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

app.post("/signup", async (req, res) => {
  const user = new Users({
    firstName: "sachin",
    lastName: "purohit",
    emailId: "abhaythanak@gmail.com",
    password: "abhay@123",
    age: 28,
    gender: "male",
  });

  await user.save();
  res.send(user);
});

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

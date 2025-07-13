const express = require("express");
const connectDB = require("./config/database");
const { middleAuth } = require("./middleware/auth");
const Users = require("./models/user");

const app = express();

app.use(express.json());

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
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    console.log(userEmail);
    const user = await Users.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.send(error);
  }
});

//  feed api GET feed api - get all users from the database

app.get("/feed", async (req, res) => {
  try {
    const user = await Users.find({});
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/signup", async (req, res) => {
  const user = new Users(req.body);

  try {
    await user.save();
    res.send(" added succefully");
  } catch (error) {
    res.status(400).send("error saving the user:" + error.message);
  }
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

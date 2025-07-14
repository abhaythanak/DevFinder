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

app.patch("/user/:userId", async (req, res) => {
  // const updateUserId = req.body.userId;   // never trust req.body
  const updateUserId = req.params?.userId;
  const data = req.body;
  try {
    const allowedUpdate = ["about", "gender", "age", "skills", "photoUrl"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowedUpdate.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    //  const user = await Users.findByIdAndUpdate(updateUserId, data); or add 1 more field document view
    const user = await Users.findByIdAndUpdate(updateUserId, data, {
      returnDocument: "after",
      runValidators: true,
    }); // after or before
    res.send(" update succefully" + user);
    console.log(user);
  } catch (error) {
    res.status(400).send("error saving the user:" + error.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    // const user = await Users.findByIdAndDelete({_id:userId}) or
    const user = await Users.findByIdAndDelete(userId);
    res.send(" deleted succefully");
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

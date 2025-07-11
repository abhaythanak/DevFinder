const express = require("express");
const { middleAuth } = require("./middleware/auth");

const app = express();

// app.use("/user", (req, res, next) => {
//   console.log("1 response");
//   res.send({ name: "abhay", lastname: "thanak" });
//   next();
// });
// app.use("/user", middleAuth);

app.get("/user", (req, res) => {
  res.send("alldata fetch");
});
app.get("/user/id", (req, res) => {
  res.send("alldata fetch in id");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

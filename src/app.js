const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("1 response");

    next();
    res.send("res1");
  },
  (req, res, next) => {
    console.log("2 response");
    res.send("res2");
  }
);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

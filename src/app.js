const express = require("express");

const app = express();

// app.use("/", (req, res) => {
//   res.send("hello 3000 server 12223");
// });

app.get("/user", (req, res) => {
  res.send({ firstName: "abhay", lastName: "thanak" });
});

app.post("/user", (req, res) => {
  res.send("data added succesfully to database");
});
app.delete("/user", (req, res) => {
  res.send("data deleted succesfully");
});

app.use("/hello", (req, res) => {
  res.send("hello 3000 server from route");
});
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

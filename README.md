# DevFinder

app.use ("",()=>{}) ==> arrow function is is route handler inside

for dynamic
http://localhost:3000/user/7775464684
console.log(req.params);

default
http://localhost:3000/user?userId=101&password=testing
console.log(req.query);



routing in using /ab+x  /ab?c  //ab*c  /a(bb)c

// for dynamic
// http://localhost:3000/user/7775464684
// console.log(req.params);

// default
// http://localhost:3000/user?userId=101&password=testing
// console.log(req.query);

app.get("/user/:userId", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "abhay", lastName: "thanak" });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

app.use() diffrenc app.all\()

CIFFAKNUJPHsrd5G

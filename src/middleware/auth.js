const middleAuth =  (req, res, next) => {
  const token = "xyz";
  const isAuth = token === "xyz";
  if (!isAuth) {
    res.status(401).send("wrong token added");
  } else {
    next();
  }
}

module.exports = {
    middleAuth,
}
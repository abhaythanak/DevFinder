const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://abhaythanak:CIFFAKNUJPHsrd5G@namaste.qggnvhl.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

// connectDB()
//   .then(() => {
//     console.log("database connected");
//   })
//   .catch((err) => {
//     console.log("dataBase cannot connected");
//   });

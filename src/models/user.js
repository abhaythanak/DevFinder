const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("emailId data is not valid " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("password data is not valid " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid " + value);
        }
      },
    },
    about: {
      type: String,
    },
    skills: {
      type: [String],
    },
    photoUrl: {
      type: String,
      default:
        "https://imgs.search.brave.com/hvsVs1zdxUk2jL3FWMW3W4fJ5hjsBtiABakTKIqqvZs/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly93d3cu/dmx2LmF0L3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE2LzAxL3Bv/cnRyYWl0LWRlZmF1/bHQuanBn",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "edght87etgh7se96t", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const validPassword = await bcrypt.compare(passwordInputByUser, passwordHash);
  return validPassword;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
//       or
// module.exports = mongoose.model("User",userSchema)
//"about","gender","age","skills","photoUrl"

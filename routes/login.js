const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/", async (req, res) => {
  console.log("attempting to sign in");
  console.log(req.body);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    user.comparePassword(password, async (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      //   Generating JWT token
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });

      //   const sessionUser = {
      //     id: user._id,
      //     club: user.club,
      //     username: user.username,
      //     email: user.email,
      //   };
      //   req.session.user = sessionUser;
      //   res.send(req.session.sessionID)

      //   console.log("stored in session:", req.session.user);
      //   console.log(token)
      //   res.cookie("jwtBackend", token, {
      //     httpOnly: true,
      //     maxAge: 2 * 60 * 60 * 1000,
      //     // signed: true,
      //     // secure: process.env.NODE_ENV === "production", // Set to true in production to ensure the cookie is sent only over HTTPS
      //   });

      //   Respond with the token
      //   res.status(200).json({ message: "Login success" });

      //   .cookie("jwtBackend", token, {
      //     httpOnly: true,
      //     maxAge: 2 * 60 * 60 * 1000,
      //     // signed: true,
      //     // secure: process.env.NODE_ENV === "production", // Set to true in production to ensure the cookie is sent only over HTTPS
      //   })
      return res.status(200).json({
        _id: user._id,
        club: user.club,
        username: user.username,
        email: user.email,
        token,
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;

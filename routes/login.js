const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const session = require("express-session");

// we initialise the session middleware
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      sameSite: false,
      httpOnly: true,
      maxAge: parseInt(process.env.SESSION_MAX_AGE),
      secure: false,
    },
  })
);


// checks if the user has entered correct email and password and if they have generated JWT token 
router.post("/", async (req, res) => {
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

      req.session.user = {
        _id: user._id,
        club: user.club,
        username: user.username,
        email: user.email
      };

      return res.status(200).json({
        _id: user._id,
        club: user.club,
        username: user.username,
        email: user.email
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// destroy session when user hits logout
router.post("/logout", async (req, res) => {
  try {
    req.session.destroy(); // Clear the session data
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;

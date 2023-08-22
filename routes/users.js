const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middleware/authentication");

// registering a user
router.post("/", async (req, res) => {
  const user = new User({
    club: req.body.club,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// gets a users club
router.get("/club", auth.reqAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    const club = user.club;
    res.json({ club });
  } catch (err) {
    res.status(500).json({ message: "error interaction with db" });
  }
});

module.exports = router;

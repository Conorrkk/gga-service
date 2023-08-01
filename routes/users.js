const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require('../middleware/authentication')

// registering a user
router.post("/", async (req, res) => {
  console.log("registering user");
  console.log(req.body);
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

router.get("/club", auth.reqAuth, async (req, res) => {
  console.log("trying to get club")
    try {
        const userId = req.userId;

        const user = await User.findById(userId);

        // from chatgpt
        if (!user) {
            // If the user is not found (which shouldn't happen if auth.reqAuth is correctly implemented), respond with an error
            return res.status(404).json({ message: "User not found" });
          }

          const club = user.club;
          res.json({ club });
          console.log(club)

    } catch (err) {
        res.status(500).json({ message: "error interaction with db"})
    }
  
  
  
//   if (req.session.user) {
//     const userClub = req.session.user.club;
//     res.json({ club: userClub });
//     console.log(userClub);
//   } else {
//     res.json({ club: null });
//     console.log("user not logged in or club unavailable");
//   }
});

module.exports = router;

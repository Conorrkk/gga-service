const express = require('express')
const router = express.Router()
const Player = require('../models/player')
const auth = require("../middleware/authentication");

router.post("/", auth.reqAuth, async (req, res) => {
    const player = new Player({
      playerName: req.body.playerName,
      playerPosition: req.body.playerPosition,
      teamId: req.body.teamId,
    });
  
    console.log("creating player with:", player);
  
    try {
      const newPlayer = await player.save();
      res.status(201).json(newPlayer);
    } catch (err) {
      // mongodb error 11000 is a dublicate key error - might not need this here - what if there is a team with 2 players with same name and position?
    //   if (err.code === 11000) {
    //     return res
    //       .status(400)
    //       .json({ message: "player already created" });
    //   }
      res.status(400).json({ message: err.message });
    }
  });


module.exports = router
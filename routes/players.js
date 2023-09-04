const express = require("express");
const router = express.Router();
const Player = require("../models/player");


// method to create a new player
router.post("/", async (req, res) => {
  const player = new Player({
    playerName: req.body.playerName,
    playerPosition: req.body.playerPosition,
    teamId: req.body.teamId,
  });
  try {
    const newPlayer = await player.save();
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// method to get all players for a specific team
router.get("/", async (req, res) => {
  const { teamId } = req.query;
  try {
    const players = await Player.find({ teamId });
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ message: "error interacting with db" });
  }
});

// method to get a single player
router.get("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (player == null) {
      return res.status(404).json({ message: "Cannot find player" });
    }
    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

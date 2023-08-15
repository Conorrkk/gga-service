const express = require("express");
const router = express.Router();
const Player = require("../models/player");
const auth = require("../middleware/authentication");

router.post("/", auth.reqAuth, async (req, res) => {
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

router.get("/", auth.reqAuth, async (req, res) => {
  const { teamId } = req.query;
  try {
    const players = await Player.find({ teamId : teamId });
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: "error interacting with db" });
  }
});

router.get("/:id", auth.reqAuth, async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (player == null) {
      return res.status(404).json({ message: "Cannot find player" });
    }
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

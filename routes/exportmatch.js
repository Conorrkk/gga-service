const express = require("express");
const router = express.Router();
const Player = require("../models/player");
const Match = require("../models/match");

// gets the data for the matchexport csv
router.post("/", async (req, res) => {
  const matchId = req.body.matchId;
  const match = await Match.findById(matchId);
  const matchStats = [];

  // mapping through all players within the match, getting the req data and will await this below
  const promises = match.teams.players.map(async (p) => {
    const player = await Player.findById(p.playerId);
    console.log;
    const playerData = {
      playerName: player.playerName,
      goalPlay: p.stats.goal_from_play,
      pointPlay: p.stats.point_from_play,
      goalDead: p.stats.goal_from_dead,
      pointDead: p.stats.point_from_dead,
      wide: p.stats.wide,
      catchMade: p.stats.catch_made,
      catchMissed: p.stats.catch_missed,
      block: p.stats.block_hook,
    };
    matchStats.push(playerData);
  });
  // use promise.all to ensure we iterate over each player before finishing execution
  try {
    await Promise.all(promises);
    const newExportDoc = {
      matchId: matchId,
      players: matchStats,
    };
    
    res.status(201).json(newExportDoc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

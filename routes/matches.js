const express = require("express");
const router = express.Router();
const Match = require("../models/match");
const auth = require("../middleware/authentication");

// getting all
router.get("/", async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// getting one
router.get("/:id", auth.reqAuth, async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (match == null) {
      return res.status(404).json({ message: "Cannot find match" });
    }
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// creating one
router.post("/", auth.reqAuth, async (req, res) => {
  console.log("adding match");
  console.log(req.body);
  const match = new Match({
    teams: {
      oppositionTeam: req.body.opponent,
      teamId: req.body.team._id,
    },
    userId: req.userId,
  });
  try {
    const newMatch = await match.save();
    res.status(201).json(newMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// adding players to a match based on id
router.patch("/:id/addPlayers", auth.reqAuth, async (req, res) => {
  try {
    const matchId = req.params.id;
    const playerId = req.body.playerId;
    console.log("player to add:", playerId);
    const updatedMatch = await Match.findOneAndUpdate(
      // matching the match id with the one passed in
      { _id: matchId },
      { $push: { "teams.players": { playerId } } }, // Add the players to the specific team
      { new: true } // Return the updated match
    );

    res.json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// deleting one
router.delete("/:id", getMatch, async (req, res) => {
  try {
    await res.match.deleteOne();
    res.json({ message: "Deleted Match" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMatch(req, res, next) {
  let match;
  try {
    match = await Match.findById(req.params.id);
    if (match == null) {
      return res.status(404).json({ message: "Cannot find match" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.match = match;
  next();
}

module.exports = router;

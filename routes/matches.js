const express = require("express");
const router = express.Router();
const Match = require("../models/match");

// get all matches
router.get("/", async (req, res) => {
  const userId = req.session.user._id;
  try {
    const matches = await Match.find({ userId });
    res.status(200).json({ matches });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one match by id
router.get("/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (match == null) {
      return res.status(404).json({ message: "Cannot find match" });
    }
    res.status(200).json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create new match
router.post("/", async (req, res) => {
  const match = new Match({
    teams: {
      oppositionTeam: req.body.opponent,
      teamId: req.body.team._id,
    },
    userId: req.session.user._id,
  });
  try {
    const newMatch = await match.save();
    res.status(201).json(newMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// add players to match by id
router.patch("/:id/addPlayers", async (req, res) => {
  try {
    const matchId = req.params.id;
    const playerId = req.body.playerId;
    const updatedMatch = await Match.findOneAndUpdate(
      // matching the match id with the one passed in
      { _id: matchId },
      { $push: { "teams.players": { playerId } } }, // Add players to specific team
      { new: true } // Return the updated match
    );

    res.status(200).json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete match by id
router.delete("/:id", getMatch, async (req, res) => {
  try {
    await res.match.deleteOne();
    res.json({ message: "Deleted Match" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add a goal from play to specific player
router.patch("/:id/addGoal", async (req, res) => {
  try {
    const matchId = req.params.id;
    const playerId = req.body.playerId;

    // Update the goal_from_play statistic for the specified player
    // $inc is for incrementing - can be used for all stats
    const updatedMatch = await Match.findOneAndUpdate(
      {
        _id: matchId,
        "teams.players.playerId": playerId,
      },
      {
        $inc: { "teams.players.$.stats.goal_from_play": 1 },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// add a goal from dead to specific player
router.patch("/:id/addGoalDead", async (req, res) => {
  try {
    const matchId = req.params.id;
    const playerId = req.body.playerId;

    // Update the goal_from_play statistic for the specified player
    // $inc is for incrementing - can be used for all stats
    const updatedMatch = await Match.findOneAndUpdate(
      {
        _id: matchId,
        "teams.players.playerId": playerId,
      },
      {
        $inc: { "teams.players.$.stats.goal_from_dead": 1 },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// add a point from play to specific player
router.patch("/:id/addPoint", async (req, res) => {
  try {
    const matchId = req.params.id;
    const playerId = req.body.playerId;

    // Update the point_from_play statistic for the specified player
    // $inc is for incrementing - can be used for all stats
    const updatedMatch = await Match.findOneAndUpdate(
      {
        _id: matchId,
        "teams.players.playerId": playerId,
      },
      {
        $inc: { "teams.players.$.stats.point_from_play": 1 },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// add a point from dead to specific player
router.patch("/:id/addPointDead", async (req, res) => {
  try {
    const matchId = req.params.id;
    const playerId = req.body.playerId;

    // Update the point_from_play statistic for the specified player
    // $inc is for incrementing - can be used for all stats
    const updatedMatch = await Match.findOneAndUpdate(
      {
        _id: matchId,
        "teams.players.playerId": playerId,
      },
      {
        $inc: { "teams.players.$.stats.point_from_dead": 1 },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// add a wide to specific player
router.patch("/:id/addWide", async (req, res) => {
  try {
    const matchId = req.params.id;
    const playerId = req.body.playerId;

    // Update the goal_from_play statistic for the specified player
    // $inc is for incrementing - can be used for all stats
    const updatedMatch = await Match.findOneAndUpdate(
      {
        _id: matchId,
        "teams.players.playerId": playerId,
      },
      {
        $inc: { "teams.players.$.stats.wide": 1 },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// add a block to specific player
router.patch("/:id/addBlock", async (req, res) => {
  try {
    const matchId = req.params.id;
    const playerId = req.body.playerId;

    // Update the goal_from_play statistic for the specified player
    // $inc is for incrementing - can be used for all stats
    const updatedMatch = await Match.findOneAndUpdate(
      {
        _id: matchId,
        "teams.players.playerId": playerId,
      },
      {
        $inc: { "teams.players.$.stats.block_hook": 1 },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// add catch to specific player
router.patch("/:id/addCatch", async (req, res) => {
  try {
    const matchId = req.params.id;
    const playerId = req.body.playerId;

    // Update the goal_from_play statistic for the specified player
    // $inc is for incrementing - can be used for all stats
    const updatedMatch = await Match.findOneAndUpdate(
      {
        _id: matchId,
        "teams.players.playerId": playerId,
      },
      {
        $inc: { "teams.players.$.stats.catch_made": 1 },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// add dropped catch to specific player
router.patch("/:id/addDrop", async (req, res) => {
  try {
    const matchId = req.params.id;
    const playerId = req.body.playerId;

    // Update the goal_from_play statistic for the specified player
    // $inc is for incrementing - can be used for all stats
    const updatedMatch = await Match.findOneAndUpdate(
      {
        _id: matchId,
        "teams.players.playerId": playerId,
      },
      {
        $inc: { "teams.players.$.stats.catch_missed": 1 },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get total goals scored by a team in one match
router.get("/:id/totalGoals", async (req, res) => {
  try {
    const matchId = req.params.id;

    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    } else {
      // using Array.reduce method because an async forEach was causing loop to iterate and complete before
      // totalGoals was updated.
      // ensures each player will be iterated over and the total updated before the loop terminates
      const totalGoals = match.teams.players.reduce((goalCount, player) => {
        const playerGoals =
          player.stats.goal_from_play + player.stats.goal_from_dead;
        return goalCount + playerGoals;
      }, 0);
      res.status(200).json({ totalGoals });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get total goals scored by a team in one match
router.get("/:id/totalPoints", async (req, res) => {
  try {
    const matchId = req.params.id;

    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    } else {
      const totalPoints = match.teams.players.reduce((pointCount, player) => {
        const playerPoints =
          player.stats.point_from_play + player.stats.point_from_dead;
        return pointCount + playerPoints;
      }, 0);

      res.status(200).json({ totalPoints });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// record opponents points scored in a match
router.patch("/:id/addOpponentPoints", async (req, res) => {
  try {
    const id = req.params.id;
    const points = req.body.pointsAgainst;

    const updatedMatch = await Match.findOneAndUpdate(
      { _id: id },
      { $set: { pointAgainst: points } },
      { new: true }
    );

    res.status(200).json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// record opponents goals scored in a match
router.patch("/:id/addOpponentGoals", async (req, res) => {
  try {
    const id = req.params.id;
    const goals = req.body.goalsAgainst;

    const updatedMatch = await Match.findOneAndUpdate(
      { _id: id },
      { $set: { goalAgainst: goals } },
      { new: true }
    );

    res.status(200).json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get matches that a certain player was in
router.get("/player/:id", async (req, res) => {
  try {
    const playerId = req.params.id;
    const matches = await Match.find({ "teams.players.playerId": playerId });
    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// function to get a match - call in requests
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

const express = require("express");
const router = express.Router();
const Match = require("../models/match");
const auth = require("../middleware/authentication");

// getting all
router.get("/", auth.reqAuth, async (req, res) => {
  const userId = req.userId;
  try {
    const matches = await Match.find({ userId });
    res.json({ matches });
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

router.patch("/:id/addGoal", auth.reqAuth, async (req, res) => {
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
    res.json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id/addPoint", auth.reqAuth, async (req, res) => {
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
    res.json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id/addWide", auth.reqAuth, async (req, res) => {
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
    res.json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get total goals scored by a player in all their matches
// router.get("/:id/totalGoals", auth.reqAuth, async (req, res) => {
//   try {
//     const matchId = req.params.id;

//     const match = await Match.findById(matchId);

//     if (!match) {
//       return res.status(404).json({ message: "Match not found" });
//     } else {
//       // using Array.reduce method because an async forEach was causing loop to iterate and complete before
//       // totalGoals was updated. This ensures a value will accumulate before the loop terminates
//       const totalGoals = match.teams.players.reduce((accumulator, player) => {
//         // if a player has no recorded goals yet then count this as an int of 0
//         const playerGoals = player.stats.goal_from_play || 0;
//         return accumulator + playerGoals;
//       }, 0);
//       res.json({ totalGoals });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// get total goals scored by a team in one match
router.get("/:id/totalGoals", auth.reqAuth, async (req, res) => {
  try {
    const matchId = req.params.id;

    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    } else {
      // using Array.reduce method because an async forEach was causing loop to iterate and complete before
      // totalGoals was updated. This ensures a value will accumulate before the loop terminates
      const totalGoals = match.teams.players.reduce((accumulator, player) => {
        // if a player has no recorded goals yet then count this as an int of 0
        const playerGoals = player.stats.goal_from_play || 0;
        return accumulator + playerGoals;
      }, 0);
      res.json({ totalGoals });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get total goals scored by a team in one match
router.get("/:id/totalPoints", auth.reqAuth, async (req, res) => {
  try {
    const matchId = req.params.id;

    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    } else {
      // using Array.reduce method because an async forEach was causing loop to iterate and complete before
      // totalGoals was updated. This ensures a value will accumulate before the loop terminates
      const totalPoints = match.teams.players.reduce((accumulator, player) => {
        // if a player has no recorded points yet then count this as an int of 0
        const playerPoints = player.stats.point_from_play || 0;
        return accumulator + playerPoints;
      }, 0);

      res.json({ totalPoints });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id/addOpponentPoints", auth.reqAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const points = req.body.pointsAgainst;

    const updatedMatch = await Match.findOneAndUpdate(
      { _id: id },
      { $set: { pointAgainst: points } },
      { new: true }
    );

    res.json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id/addOpponentGoals", auth.reqAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const goals = req.body.goalsAgainst;

    const updatedMatch = await Match.findOneAndUpdate(
      { _id: id },
      { $set: { goalAgainst: goals } },
      { new: true }
    );

    res.json(updatedMatch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/player/:id", auth.reqAuth, async (req, res) => {
  try {
    console.log("start")
    const playerId = req.params.id;
    const matches = await Match.find({ "teams.players.playerId": playerId });
    res.json({ matches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

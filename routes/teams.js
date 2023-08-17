const express = require("express");
const router = express.Router();
const Team = require("../models/team");
const auth = require("../middleware/authentication");

router.post("/", auth.reqAuth, async (req, res) => {
  const team = new Team({
    teamName: req.body.club,
    teamLevel: req.body.teamLevel,
    userId: req.userId,
  });
  try {
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (err) {
    // mongodb error 11000 is a dublicate key error
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: team.teamLevel + "team already created" });
    }
    res.status(400).json({ message: err.message });
  }
});

router.get("/", auth.reqAuth, async (req, res) => {
  const userId = req.userId
  try {
    const teams = await Team.find({ userId });
    res.json({ teams })
  } catch (err) {
    res.status(500).json({ message: "error interacting with db" });
  }
});

router.get("/getTeamName", auth.reqAuth, async (req, res) => {
  const { teamId } = req.query;
  try {
    const team = await Team.find({ _id : teamId })
    const nameToReturn = team[0].teamName
    res.json(nameToReturn)
  } catch (err) {
    res.status(500).json({ message: "error interacting with db" });
  }
})

// deleting one
router.delete("/:id", getTeam, async (req, res) => {
  try {
    await res.team.deleteOne();
    res.json({ message: "Deleted Team" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one team
router.get("/:id", auth.reqAuth, getTeam, async (req, res) => {
  try {
    res.json(res.team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// gets one team function
async function getTeam(req, res, next) {
  let team;
  try {
    team = await Team.findById(req.params.id);
    if (team == null) {
      return res.status(404).json({ message: "Cannot find team" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.team = team;
  next();
}

module.exports = router;

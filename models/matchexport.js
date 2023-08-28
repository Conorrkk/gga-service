const mongoose = require("mongoose");

const matchexportSchema = new mongoose.Schema({
  players: [
    {
      playerName: {
        type: String,
        required: true,
      },
      goalPlay: {
        type: Number,
        default: 0,
      },
      pointPlay: {
        type: Number,
        default: 0,
      },
      goalDead: {
        type: Number,
        default: 0,
      },
      pointDead: {
        type: Number,
        default: 0,
      },
      wide: {
        type: Number,
        default: 0,
      },
      catchMade: {
        type: Number,
        default: 0,
      },
      catchMissed: {
        type: Number,
        default: 0,
      },
      block: {
        type: Number,
        default: 0,
      },
    },
  ],
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
  },
});

module.exports = mongoose.model("MatchExport", matchexportSchema);

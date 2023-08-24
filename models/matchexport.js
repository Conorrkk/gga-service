const mongoose = require("mongoose");

const matchexportSchema = new mongoose.Schema({
  player: {
    playerName: {
      type: String,
      required: true,
    },
    stats: {
      goal_from_play: {
        type: Number,
        default: 0,
      },
      point_from_play: {
        type: Number,
        default: 0,
      },
      goal_from_dead: {
        type: Number,
        default: 0,
      },
      point_from_dead: {
        type: Number,
        default: 0,
      },
      wide: {
        type: Number,
        default: 0,
      },
      catch_made: {
        type: Number,
        default: 0,
      },
      catch_missed: {
        type: Number,
        default: 0,
      },
      block_hook: {
        type: Number,
        default: 0,
      },
    },
  },
});

module.exports = mongoose.model("MatchExport", matchexportSchema);

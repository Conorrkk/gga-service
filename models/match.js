const mongoose = require('mongoose')

const matchSchema = new mongoose.Schema({
    matchDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    goalAgainst: {
        type: Number
    },
    pointAgainst: {
        type: Number
    },
    teams: {
        oppositionTeam: {
            type: String,
            required: true
        },
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        },
        players: [{
            playerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player'
            },
            stats: {
                goal_from_play: {
                    type: Number,
                    default: 0
                },
                point_from_play: {
                    type: Number,
                    default: 0
                },
                goal_from_dead: {
                    type: Number,
                    default: 0
                },
                point_from_dead: {
                    type: Number,
                    default: 0
                },
                wide: {
                    type: Number,
                    default: 0
                },
                saved: {
                    type: Number,
                    default: 0
                },
                catch_made: {
                    type: Number,
                    default: 0
                },
                catch_missed:{
                    type: Number,
                    default: 0
                },
                pass_made: {
                    type: Number,
                    default: 0
                },
                pass_missed: {
                    type: Number,
                    default: 0
                },
                turnover_won: {
                    type: Number,
                    default: 0
                },
                free_conceded: {
                    type: Number,
                    default: 0
                },
                block_hook: {
                    type: Number,
                    default: 0
                },
                yellow_card: {
                    type: Number,
                    default: 0
                },
                red_card: {
                    type: Number,
                    default: 0
                }
            }
        }]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Match', matchSchema)

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
                    type: Number
                },
                point_from_play: {
                    type: Number
                },
                goal_from_dead: {
                    type: Number
                },
                point_from_dead: {
                    type: Number
                },
                wide: {
                    type: Number
                },
                saved: {
                    type: Number
                },
                catch_made: {
                    type: Number
                },
                catch_missed:{
                    type: Number
                },
                pass_made: {
                    type: Number
                },
                pass_missed: {
                    type: Number
                },
                turnover_won: {
                    type: Number
                },
                free_conceded: {
                    type: Number
                },
                block_hook: {
                    type: Number
                },
                yellow_card: {
                    type: Number
                },
                red_card: {
                    type: Number
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

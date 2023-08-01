const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true
    },
    playerPosition: {
        type: String,
        required: true
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }
})

module.exports = mongoose.model('Player', playerSchema)
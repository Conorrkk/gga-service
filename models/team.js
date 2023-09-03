const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    teamLevel: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// ensures each user enters a unique teamLevel for their teams, sorts in ascending order (1)
teamSchema.index({ userId: 1, teamLevel: 1 }, { unique: true });

module.exports = mongoose.model('Team', teamSchema)
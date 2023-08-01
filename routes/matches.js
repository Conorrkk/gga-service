const express = require('express')
const router = express.Router()
const Match = require('../models/match')

// getting all
router.get('/', async (req, res) => {
    try {
        const matches = await Match.find()
        res.json(matches)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})
// getting one
router.get('/:id', getMatch, (req, res) => {
    res.send(res.match.team_1.team_name)
})
// creating one
router.post('/', async (req, res) => {
    console.log('adding matches')
    console.log(req.body)
    const match = new Match({
        teams: {
            oppositionTeam: req.body.opponent,
            teamId: req.body.teamId,
            userId: req.body.userId
        }
    })
    try {
        const newMatch = await match.save()
        res.status(201).json(newMatch)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// updating one
router.patch('/:id', getMatch, async (req, res) => {
    if (req.body.teamOneName != null) {
        res.match.team_1.team_name = req.body.teamOneName
    }
    if (req.body.teamTwoName != null) {
        res.match.team_2.team_name = req.body.teamTwoName
    }
    try {
        const updatedMatch = await res.match.save()
        res.json(updatedMatch)
    } catch (err){
        res.status(400).json({ message: err.message})
    }

})

// deleting one
router.delete('/:id', getMatch, async (req, res) => {
    try {
        await res.match.deleteOne()
        res.json({ message: 'Deleted Match'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getMatch (req, res, next) {
    let match 
    try {
        match = await Match.findById(req.params.id)
        if (match==null) {
            return res.status(404).json({ message: 'Cannot find match'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }
    res.match = match
    next()
}

module.exports = router
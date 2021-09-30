const express = require('express')
const { check, validationResult } = require('express-validator')

const Match = require('../models/Match')

const router = express.Router()

// Validation 
const validate = [
    check('matchNumber')
        .isLength({ min: 3, max: 10 })
        .withMessage('Match Number should be between 3 and 10 characters.'),
    check('')
]

// /api/matches
router.post('/', validate, (req, res) => {

    const errors = validationResult(req)

    if( !errors.isEmpty() ) {
        return res.status(422).send({ errors: errors.array() })
    }

    const match = new Match({
        matchNumber: req.body.matchNumber,
        date: req.body.date,
        customer: req.body.customer,
        product: req.body.product,
        base: req.body.base,
        size: req.body.size,
        color1: req.body.color1,
        color2: req.body.color2,
        color3: req.body.color3,
        color4: req.body.color4,
        color5: req.body.color5,
        colorJobName: req.body.colorJobName,
    })

    match.save()
        .then(result => {
            res.send({
                message: "Match data created successfully",
                data: result
            })
        })
        .catch(err => console.log(err))

})

// handles api/matches GET request
// shows all

router.get('/', (req, res) => {
    Match.find()
        .then(matches => {
            res.send(matches)
        })
        .catch(err => console.log(err))
})

// get one by id
router.get('/:id', (req, res) => {
    const matchId = req.params.id;

    Match.findById(matchId)
        .then(match => {
            res.send(match)
        })
        .catch(err => console.log(err))
})

// UPDATE
router.put('/:id', validate, (req,res) => {
    const matchId = req.params.id;

    const errors = validationResult(req)

    if( !errors.isEmpty() ) {
        return res.status(422).send({ errors: errors.array() })
    }

    Match.findById(matchId)
    .then(match => {
        match.matchNumber = req.body.matchNumber;
        match.date = req.body.date;
        match.customer = req.body.customer;
        match.product = req.body.product;
        match.base = req.body.base;
        match.size = req.body.size;
        match.color1 = req.body.color1;
        match.color2 = req.body.color2;
        match.color3 = req.body.color3;
        match.color4 = req.body.color4;
        match.color5 = req.body.color5;
        match.colorJobName = req.body.colorJobName;

        return match.save()
    })
    .then(result => {
        res.send(result)
    })
    .catch(err => console.log(err))
})


//  DELETE
router.delete('/:id', (req, res) => {
    const matchId = req.params.id

    Match.findByIdAndRemove(matchId)
        .then(result => {
            res.send(result)
        })
        .catch(err => console.log(err))
})

module.exports = router
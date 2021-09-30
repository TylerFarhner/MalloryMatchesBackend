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
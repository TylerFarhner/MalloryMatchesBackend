const mongoose = require('mongoose')

const MatchSchema = new mongoose.Schema({
    matchNumber: { type: String, required: true },
    date: { type: String, required: true },
    customer: { type: String, required: true },
    product: { type: String, required: true },
    base: { type: String, required: true },
    size: { type: String, required: true },
    color1: String,
    color2: String,
    color3: String,
    color4: String,
    color5: String,
    colorJobName: { type: String, required: true },
})

module.exports = mongoose.model('Match', MatchSchema)
const express = require('express')
const mongoose = require('mongoose')
// ------------------------------------------

const matches = require('./routes/matches')

const app = express()
// ------------------------------------------
// Middleware

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to the Mallory Matches API!')
})

app.use('/api/matches', matches)

require('dotenv').config()

const port = process.env.port || 3000


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
}).then(result => {
    app.listen(port, () => console.log(`Server is listening on port ${port}`))
})
.catch(err => console.log(err))
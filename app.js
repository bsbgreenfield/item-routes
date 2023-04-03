const express = require('express')
const app = express()
const routes = require('./routes')


app.use(express.json())
app.use("/items", routes)

// error handler

app.use((req, res, next) => {
    return res.status(404).send('page not found')
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({error: err.message})
})

module.exports = app
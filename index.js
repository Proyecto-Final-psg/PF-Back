const express = require('express');
const app = express()
const cors = require("cors")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// const User = require('./models/user')
//////////DB///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { sequelize } = require('./db/db')
////////SERVIDOR////////
let port = process.env.PORT || 8280
app.listen(port, () => {
    console.log('Server run on Port =>  ' + port)
    sequelize.sync({ alter: true })
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////USER////////////
app.get('/show', async (req, res) => {

       res.json({ "done": "soy rama martin "})
})
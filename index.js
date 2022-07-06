const express = require('express');
const app = express()
const cors = require("cors")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const User = require('./models/Users.js')
//////////DB///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { sequelize } = require('./db/db.js')

////////SERVIDOR////////
let port = process.env.PORT || 8280
app.listen(port, () => {
    console.log('Server run on Port =>  ' + port)
    sequelize.sync({ alter: true })
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////USER////////////
app.get('/getAllUsers', async (req, res) => {
        const user = await User.findAll()
       res.json({ "no muestro nada ": user})
})

app.post('/createUser', async(req, res) => {
    const user = await User.create({
        user_name:"test",
        user_lastname:"test",
        user_username:"test",
        user_password:"test",
        user_email:"test@jaja.com",
        user_phone:"test",
    })

    res.json({created: user})
})


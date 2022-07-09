const {Router} = require('express')
const {findAllUsers, findOrCreate} = require('../controller/functionsUser')
const router = Router();

router.get('/getAllUsers', async (req, res) => {
    try {
        res.json(await findAllUsers())
    } catch (error) {
        res.status(401).json(error.message)
    }
})

router.post('/ath0log', async (req, res) => {
    try {
        let { email, name, token } = req.body
        console.log(token)
        let user_email = email
        let user_name = name
        let creado = await findOrCreate(user_email, user_name)
        res.json(creado)
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})

module.exports = router
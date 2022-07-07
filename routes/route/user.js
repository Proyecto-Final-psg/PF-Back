const {Router} = require('express')
const {findAllUsers, createUser, findOneUser} = require('../controller/functionsUser')

const router = Router()

router.get('/users', async (req, res) => {
    let { name } = req.body
    if(name){
        try {
            res.status(201).json(await findOneUser(name))
        } catch (error) {
            res.status(401).json(error.message)
        }
    } else {
        try {
            res.status(201).json(await findAllUsers())
        } catch (error) {
            res.status(401).json(error.message)
        }
    }
})

router.post('/users', async (req, res) => {
    let { name, lastname, username, email, phone } = req.body
    try {
        console.log(req.body)
        res.status(201).json(await createUser(name, lastname, username, email, phone))
    } catch (error) {
        res.status(401).json(error.message)
    }
})

module.exports = router
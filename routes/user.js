const { Router } = require('express')
const { findAllUsers, findOrCreate, changeRole, addToCart, removeFromCart, userById } = require('../controllers/users/functionsUser')
const router = Router();

router.get('/users/:id', async (req, res) => {
    let{id} = req.params
    try {
        res.json(await userById(id))
    } catch (error) {
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})

router.get('/getAllUsers', async (req, res) => {
    try {
        res.json(await findAllUsers())
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
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
router.put('/changeRoles', async (req, res) => {
    try {
        let { user_id, roll } = req.body
        let change = await changeRole(user_id, roll)
        res.json(change)
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }

})


router.post('/cart', async (req, res) => {
    let {user_id, product_id} = req.body
    try {
        const cart = await addToCart(user_id, product_id)
        console.log(cart)
        res.json('ruta cart')
    } catch (error) {
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})

router.delete('/cart', async (req, res) => {
    let {user_id, product_id} = req.body
    try {
        const cart = await removeFromCart(user_id, product_id)
        console.log(cart)
        res.json('ruta cart')
    } catch (error) {
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})




module.exports = router
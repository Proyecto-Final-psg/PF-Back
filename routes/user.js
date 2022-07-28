const { Router } = require('express')
const { findAllUsers, findOrCreate, changeRole, addToCart, changeNotification,  removeFromCart, userById, removeUser, getUserCart, blockUser } = require('../controllers/users/functionsUser')
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

router.post('/users/subscribe', async (req, res) => {
    let {user_id, product_id} = req.body
    
    try {
        res.json(await changeNotification(user_id, product_id))
    } catch (error) {
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})

router.delete('/users/:id', async (req, res) => {
    let{id} = req.params
    try {
        res.json(await removeUser(id))
    } catch (error) {
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})

router.put('/users/:id', async (req, res) => {
    let{id} = req.params
    try {
        res.json(await blockUser(id))
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
    let { email, name, token, img } = req.body
    try {
        let creado = await findOrCreate(email, name, img)
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
router.get('/cart/:id',async (req, res) => {
    let {id} = req.params
    try {
        const cart = await getUserCart(id)
        console.log(cart)
        res.json(cart)
    } catch (error) {
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
        res.json(cart)
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
        res.json(cart)
    } catch (error) {
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})

module.exports = router
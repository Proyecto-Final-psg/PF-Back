const {Router} = require('express')
const {createOrder, getOrders, getAllOrders, getOrderItem} = require('../controllers/orders/functionOrders')
const router = Router();

router.post('/addOrder', async (req, res) => {
    let { user_id, address, status, arrayItems } = req.body
    try {
        res.json(await createOrder(user_id, address, status, arrayItems))

        // res.json("Order cargada correctamente")
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})

router.get('/getAllOrders', async (req, res) => {
  try {
    res.json(await getAllOrders())
  } catch (error) {
    res.status(400).send({
        name: error.name,
        msg: error.message
    })
  }
})
router.get('/getOrderItems', async (req, res) => {
    try {
        res.json(await getOrderItem())
    } catch (error) {
        res.status(400).send({
            name: error.name,
            msg: error.message
        })  
    }
})

router.get('/getOrders/:user_id', async (req, res) => {
    let { user_id } = req.params
    try {
        res.json(await getOrders(user_id))
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})

module.exports = router
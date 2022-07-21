const { Router } = require('express')

const { createOrder, getOrders, getOrderById, getAllOrders, getOrderItem, getItemsByOrder, getTotalByUserByOrder, changeOrderStatus, deleteOrder } = require('../controllers/orders/functionOrders')

const router = Router();

router.post('/addOrder', async (req, res) => {
    let { user_id, address, status, email, arrayItems } = req.body
    try {
        res.json(await createOrder(user_id, address, status, email, arrayItems))
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
router.get('/getTotalByUserByOrder', async (req, res) => {
    try {
        res.json(await getTotalByUserByOrder())
    } catch (error) {
        res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})
//
router.get('/getItemsByOrder/:orderid', async (req, res) => {
    let { orderid } = req.params
    try {
        res.json(await getItemsByOrder(orderid))
    } catch (error) {
        res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})
//
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
router.get('/getOrdersByid/:order_id', async (req, res) => {
    let { order_id } = req.params
    try {
        res.json(await getOrderById(order_id))
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})
router.get('/stateOrder', function (req, res) {
    console.log(req.query.payment_id)
    console.log(req.query.status)
    console.log(req.query.merchant_order_id)
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
});
router.post('/respuestaMercado', function (req, res) {
    console.log(req.query)
    res.json(req.query);
});

router.put('/update-order', async (req, res) => {
    console.log('updating order');
    const { id, status } = req.query
    // console.log(id, status);
    res.json(await changeOrderStatus(id, status))
})

router.delete('/deleteOrder/:id', async (req, res) => {

    const { id } = req.params
    try {
        res.json(await deleteOrder(id))
    } catch (error) {
        res.status(400).json(error.message)
    }
    
})

module.exports = router
const { Router } = require('express')
const { payOrder } = require('../controllers/mercadoPago/mercadoPago')
const router = Router();

router.post("/orderMercadoPago", async (req, res) => {
    let { title, unit_price, quantity } = req.body
    let respuesta = await payOrder(title, unit_price, quantity)
    let urlPago = respuesta.body.init_point
    let restorna = {
        url: urlPago
    }
    res.json(respuesta)
});

router.get('/feedback', function (req, res) {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
});



module.exports = router
const { Router } = require('express')
const { payOrder } = require('../controllers/mercadoPago/mercadoPago')
const router = Router();
////////////////////////////////////////////////////////////////////////////////////////////
const mercadopago = require("mercadopago");
// Agrega credenciales  //
mercadopago.configure({
    access_token: "TEST-1335334086093673-071419-a275ed33eb74f65ce28d3a8055396def-129803944",
});
////////////////////////////////////////////////////////////////////////////////////////////
router.post("/orderMercadoPago", async (req, res) => {
    let preference = {

        "items": [
            {
                "id": "item-ID-1234",
                "title": "Mi producto",
                "currency_id": "ARS",
                "picture_url": "https://i.ibb.co/yQPq6bK/7.jpg",
                "description": "aca es donde ponemos toda la description del item puede ser larga",
                "category_id": "art",
                "quantity": 1,
                "unit_price": 75.76
            }
        ],
        "payer": {
            "name": "martin",
            "surname": "barreiro",
            "email": "barreiromartinj@email.com",
            "phone": {
                "area_code": "11",
                "number": 4444 - 4444
            },
            "identification": {
                "type": "DNI",
                "number": "33605763"
            },
            "address": {
                "street_name": "jose marni ",
                "street_number": 666,
                "zip_code": "1236"
            }
        },
        "back_urls": {
            "success": "https://weedical.netlify.app/",
            "failure": "https://weedical.netlify.app/",
            "pending": "https://weedical.netlify.app/"
        },
        "statement_descriptor": "MINEGOCIO",
    }
    const respuesta = await mercadopago.preferences.create(preference)
    res.json(respuesta)
});

router.get('/feedback', function (req, res) {


    console.log(req.query.payment_id)
    console.log(req.query.status)
    console.log(req.query.merchant_order_id)
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
});

router.post('/notification', function (req, res) {
console.log(req)
  res.json("done")
});


module.exports = router
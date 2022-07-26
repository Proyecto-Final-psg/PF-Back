const { Router } = require('express')
const { payOrder } = require('../controllers/mercadoPago/mercadoPago')
const router = Router();
////////////////////////////////////////////////////////////////////////////////////////////

const axios = require('axios')
const mercadopago = require("mercadopago");
// Agrega credenciales  //
mercadopago.configure({
    access_token: "TEST-1335334086093673-071419-a275ed33eb74f65ce28d3a8055396def-129803944",
});


////////////////////////////////////////////////////////////////////////////////////////////
router.post("/orderMercadoPago", async (req, res) => {
    let preference = {
        "external_reference": "12345",
        "items": [
            {
                "id": "item-ID-1234",
                "title": "Mi producto",
                "currency_id": "ARS",
                "picture_url": "https://i.ibb.co/yQPq6bK/7.jpg",
                "description": "aca es donde ponemos toda la description del item puede ser larga",
                "category_id": "art",
                "quantity": 1,
                "unit_price": 200
            }
        ],
        "payer": {
            "name": "testing",
            "surname": "novedoza",
            "email": "juliaNovedosa@email.com",
            "phone": {
                "area_code": "11",
                "number": 4957 - 0342
            },
            "identification": {
                "type": "DNI",
                "number": "33605763"
            },
            "address": {
                "street_name": "jose marmol",
                "street_number": 692,
                "zip_code": "1236"
            }
        },
        "back_urls": {
            "success": "https://weedical.netlify.app/",
            "failure": "https://weedical.netlify.app/",
            "pending": "https://weedical.netlify.app/"
        },
        "statement_descriptor": "MINEGOCIO",
        "notification_url": "https://testing-mjb.herokuapp.com/notification",
    }
    const respuesta = await mercadopago.preferences.create(preference)
    res.json(respuesta)
});

router.post('/notification', function (req, res) {

    let id = req.body.data.id
    console.log(id)
    if (id) {
        axios.get(`https://api.mercadopago.com/v1/payments/${req.body.data.id}`, {
            headers: {
                authorization: `Bearer ${"TEST-1335334086093673-071419-a275ed33eb74f65ce28d3a8055396def-129803944"}`
            }
        })
            .then(data => console.log(data.data))
            .catch(err => console.log(err));
    }
    res.status(200).send("OK")
});

router.get('/seacrhPayment', function (req, res) {
    let { id } = req.query
    console.log(id)
    axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
            authorization: `Bearer ${"TEST-1335334086093673-071419-a275ed33eb74f65ce28d3a8055396def-129803944"}`
        }
    })
        .then(data => res.json(data.data))
        .catch(err => console.log(err));
})
module.exports = router
///////////////////////////-----Mercado Pago------//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const mercadopago = require("mercadopago");
// Agrega credenciales  //
mercadopago.configure({
    access_token: "TEST-1335334086093673-071419-a275ed33eb74f65ce28d3a8055396def-129803944",
});

module.exports = {
    payOrder: async (arrayItems) => {
        let items = arrayItems.map((e) => {
            return {
                "id": e.product_id,
                "title": "Mi producto",
                "currency_id": "ARS",
                "picture_url": "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
                "description": "Descripción del Item",
                "category_id": "art",
                "quantity": e.quantity,
                "unit_price": e.price
            }
        })
        let preference = {
            items,
            "back_urls": {
                "success": "https://weedical.netlify.app",
                "failure": "https://weedical.netlify.app",
                "pending": "https://weedical.netlify.app"
            },
            "notification_url": "https://desarrollo-back.herokuapp.com/notification",
        }
        const mercadoPado = await mercadopago.preferences.create(preference)
        let retornaUrl = mercadoPado.body.init_point
        let retorna = {
            url: retornaUrl,
            referencialId: mercadoPado.body.collector_id
        }
        return retorna
    },

    paymentData: async () => {
        
        var payment_data = {
            transaction_amount: Number(req.body.transactionAmount),
            token: req.body.token,
            description: req.body.description,
            installments: Number(req.body.installments),
            payment_method_id: req.body.paymentMethodId,
            issuer_id: req.body.issuer,
            notification_url: "https://desarrollo-back.herokuapp.com/notification",
            payer: {
                email: req.body.email,
                identification: {
                    type: req.body.docType,
                    number: req.body.docNumber
                }
            }
        };

        mercadopago.payment.save(payment_data)
            .then(function (response) {
                res.status(response.status).json({
                    status: response.body.status,
                    status_detail: response.body.status_detail,
                    id: response.body.id
                });
            })
            .catch(function (error) {
                res.status(response.status).send(error);
            });
    }


}




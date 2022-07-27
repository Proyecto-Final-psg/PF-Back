///////////////////////////-----Mercado Pago------//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const mercadopago = require("mercadopago");
// Agrega credenciales  //
mercadopago.configure({
    access_token: "TEST-1335334086093673-071419-a275ed33eb74f65ce28d3a8055396def-129803944",
});

module.exports = {
    payOrder: async (arrayItems, external_reference) => {





        let total = 0
        arrayItems.map((e) => {
            total += e.price * e.quantity

        })
        let items = [{
            "id": 1,
            "title": "Mi producto",
            "currency_id": "ARS",
            "picture_url": "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
            "description": "Descripción del Item",
            "category_id": "art",
            "quantity": 1,
            "unit_price": total
        }]
        let reference = external_reference.toString()
        let preference = {
            "external_reference": reference,
            items,
            "payer": {
                "name": "juan",
                "surname": "papeli",
                "email": "barreiromart@email.com",
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
                },

            },
            "back_urls": {
                "success": "https://weedical.netlify.app",
                "failure": "https://weedical.netlify.app",
                "pending": "https://weedical.netlify.app"
            },
            "notification_url": "https://testing-mjb.herokuapp.com/notification",
        }
        const respuesta = await mercadopago.preferences.create(preference)
        let retornaUrl = respuesta.body.init_point
        return retornaUrl
    }
}




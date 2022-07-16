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
                "success": "https://weedical.netlify.app/#/cart",
                "failure": "https://weedical.netlify.app/#/cart",
                "pending": "https://weedical.netlify.app/#/cart"
            },
        }
        const respuesta = await mercadopago.preferences.create(preference)
        let retornaUrl = respuesta.body.init_point
        return retornaUrl
    }
}




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
                title: "id" + e.product_id,
                unit_price: e.price,
                quantity: e.quantity,
            }
        })
        let preference = {
            items
        }
        const respuesta = await mercadopago.preferences.create(preference)
        let retornaUrl = respuesta.body.init_point
        return retornaUrl
    }
}




const Product = require("../models/Product")

module.exports = {
    getAllProducts: async () => {
        let products = await Product.findAll();
        return products
    },
    createProduct: async (name, stock, price, img, type, description, thc, cbd, cannabis, hashOil) => {
        const newProduct = await Product.create({name, stock, price, img, type, description, thc, cbd, cannabis, hashOil})
        return newProduct
    }
}
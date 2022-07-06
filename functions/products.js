const Product = require("../models/Product")

module.exports = {
    getProducts: async (name) => {
        if(name){
            let nameProduct = await Product.findOne({where: {name: name}})
            return nameProduct
        }
        let products = await Product.findAll();
        return products
    },
    createProduct: async (name, stock, price, img, type, description, thc, cbd, cannabis, hashOil) => {
        const newProduct = await Product.create({name, stock, price, img, type, description, thc, cbd, cannabis, hashOil})
        return newProduct
    },
    getProductById: async (id) => {
        const productId = await Product.findByPk(id)
        return productId
    },
    deleteProduct: async (id) => {
        const productDeleted = await Product.destroy({
            where: {id: id}
        })
        return `the product was successfully deleted`
    }
}
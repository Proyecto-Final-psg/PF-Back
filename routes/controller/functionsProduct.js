const Product = require("../../models/Product")
const Category = require("../../models/Category")

module.exports = {
    getProducts: async (name) => {
        if(name){
            let nameProduct = await Product.findOne({where: {name: name}})
            return nameProduct
        }
        let products = await Product.findAll({
            include:{
                model: Category,
                through: {attributes: [] },
                attributes: ["category"],
              }
        });

        const productsData = products.map(d => d.dataValues)
      
        const allProducts = productsData.map(d =>{
            d.categories = d.categories.map(t => t.dataValues.category)   /// modifico los types para quitarlos del objeto
            return d
        })

        return allProducts
    },
    createProduct: async (name, stock, price, img, type, description, thc, cbd, categories) => {
        const newProduct = await Product.create({name, stock, price, img, type, description, thc, cbd})
      

        for (let i = 0; i < categories.length; i++){  // creo la relacion en productCategory
            let id = await Category.findAll({where : {category : categories[i]}, attributes : ['id']})
            await newProduct.addCategory(id)
        }

        let productCreated = await Product.findByPk(newProduct.id,{
            include : [
                {
                    model : Category,
                    attributes: ['category'],
                    through:{
                        attributes :[]
                    }
                }
            ]
             }) 
        
        const dataProd = productCreated.dataValues
        dataProd.categories = dataProd.categories.map(t => t.dataValues.category)  
      
        return dataProd
    },
    getProductById: async (id) => {
        const productId = await Product.findByPk(id)
        return productId
    },
    deleteProduct: async (id) => {
        await Product.destroy({
            where: {id: id}
        })
        return `the product was successfully deleted`
    }
}

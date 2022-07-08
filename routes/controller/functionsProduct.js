const Product = require("../../models/Product")
const Category = require("../../models/Category");
const { get } = require("lodash");


 const getProducts = async () => {
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
    }
 const getProductByName = async(name) => {
            let allProducts = await getProducts()
            const productFound = allProducts.find(p => p.name === name)
            if(productFound) return productFound
            return 'No se encontro el producto buscado'
    }
const createProduct = async (name, stock, price, img, type, description, thc, cbd, categories) => {
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
    }
const getProductById = async (id) => {
        let allProducts = await getProducts()
        const productId = allProducts.find(p => p.id === parseInt(id))
       
        if(productId) return productId
        return 'No se encontro el producto buscado'
    }
 const deleteProduct = async (id) => {
        await Product.destroy({
            where: {id: id}
        })
        return `the product was successfully deleted`
    }

    module.exports = {
        getProducts, createProduct, getProductById, deleteProduct, getProductByName
    }

const Product = require("../../models/Product")
const Category = require("../../models/Category");
const {oils} = require('../../db.json')
const { createCategory } = require('../categories/functionCategory');



const uploadProducts = async () => {
    oils.forEach(p => createProduct(p.name, p.stock, p.price, p.img, p.type, p.description, p.thc, p.cbd, p.categories) )
}

const uploadCategories = async () => {
    const categ = ['thc', 'cbd', 'bho']
    let array = []
    categ.forEach((c)=>{
       array.push( createCategory(c)) 
    } )   // se cargan las categorias en la base de dato
    const retur = await Promise.all(array)
    return retur.length  
}

 const getProducts = async () => {
        let products = await Product.findAll({
            include:[{
                model: Category,
                through: {attributes: [] },
                attributes: ["category"],
              }]
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
        const productFound = allProducts.filter(p => p.name.toLowerCase().includes(name))
        if(productFound) return productFound
        return 'No se encontro el producto buscado'
}

const updateProduct = async (id, name, stock, price, img, type, description, thc, cbd, categories) => {
    const productos = await Product.findAll()
    const idFound = productos.find(e => parseInt(e.id) === parseInt(id))
    if(idFound){
            await Product.update({name, stock, price, img, type, description, thc, cbd},
        {
            where : {
                id : id
            }
        })
        for (let i = 0; i < categories.length; i++){  // creo la relacion en productCategory
            let idCategory = await Category.findAll({where : {category : categories[i]}, attributes : ['id']})
            await idFound.addCategory(idCategory)
        }
        return 'El producto fue modificado correctamente'
    }
    return 'No se encuentra ese producto'
}


const createProduct = async (name, stock, price, img, type, description, thc, cbd, categories) => {
        const newProduct = await Product.create({name, stock, price, img, type, description, thc, cbd})
      

        for (let i = 0; i < categories.length; i++){  // creo la relacion en productCategory
            //let id = await Category.findAll({where : {category : categories[i]}, attributes : ['id']})
            let [newCategory, created] = await Category.findOrCreate({
                where: {category : categories[i]},
                attributes : ['id'],
                defaults :{category : categories[i]}
            })
            
            await newProduct.addCategory(newCategory.id)
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
         id = parseInt(id)
         let allProducts = await getProducts()
        const productId = allProducts.find(p => p.id === id)
        return productId
    }
 const deleteProduct = async (id) => {
        await Product.destroy({
            where: {id: id}
        })
        return `the product was successfully deleted`
    }

    module.exports = {
        getProducts, 
        createProduct, 
        getProductById, 
        deleteProduct, 
        getProductByName, 
        uploadProducts,
        uploadCategories,
        updateProduct
    }

const {favorites} = require('../../db/db')
const User = require('../../models/Users')
const Product = require('../../models/Product')

module.exports = {
    getAllFavorites: async () => {
        const favorite = await favorites.findAll()
        return favorite
    },
    getFavoritesUser : async (user_id) => {
        const favorite = await favorites.findAll({where : {
            userUserId : user_id
        }})
        
        return favorite
    },
    addFavorite : async(product_id, user_id) =>{
        let product = await Product.findByPk(product_id)
        const user = await User.findByPk(user_id)
        product = parseInt(product.dataValues.id)
        const favoriteAdded = await favorites.create({product: product})
        favoriteAdded.setUser(user)
        return favoriteAdded
    },
    removeFavorite : async(id) =>{
        const item = await favorites.findByPk(id, {includes : ['product']})
        await favorites.destroy({where : {id : id}})
        return `The product ${item.dataValues.product} has been removed from your wishlist`
    },
    ///  funcion prueba
    myfunct : async() =>{
        let products = await Product.findAll()
        const pro = products.map((product) => {
            let p = {
                id : product.dataValues.id,
                name : product.dataValues.name,
                stock : product.dataValues.stock,
            }
            if(p.stock === 0) return true; return false
        })
        return pro
    }
    /// funcion prueba
}
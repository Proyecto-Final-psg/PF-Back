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
        const favoriteProductsByUser = []
        for(let i=0; i < favorite.length; i++){
            const proFav = await Product.findByPk(favorite[i].dataValues.product)
            const proFinal = {
                id : proFav.dataValues.id,
                name : proFav.dataValues.name,
                description : proFav.dataValues.description,
                img : proFav.dataValues.img,
                price : proFav.dataValues.price,
                stock : proFav.dataValues.stock
            }
            favoriteProductsByUser.push(proFinal)

        }
        return favoriteProductsByUser
    },
    addFavorite : async(product_id, user_id) =>{
        const user = await User.findByPk(user_id)
        const prodFav = await favorites.findAll({where: {product: product_id, userUserId : user_id}})
     
        if(prodFav.length === 0){
          const favoriteAdded = await favorites.create({product: product_id})
          favoriteAdded.setUser(user)  
        }
        return 'Added to favorites'
    },
    removeFavorite : async(product_id, user_id) =>{
        await favorites.destroy({where : {product : product_id,  userUserId : user_id}})
        return `The product  has been removed from your wishlist`
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
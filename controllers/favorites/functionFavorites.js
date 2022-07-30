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
            // console.log(await Product.findByPk(favorite[i].dataValues.product))
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
        let product = await Product.findByPk(product_id)
        const user = await User.findByPk(user_id)
        product = parseInt(product.dataValues.id)
        const favoriteAdded = await favorites.create({product: product})
        favoriteAdded.setUser(user)
        return favoriteAdded
    },
    removeFavorite : async(id) =>{
        const item = await favorites.findByPk(id, {includes : ['product']})
        await favorites.destroy({where : {product : id}})
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
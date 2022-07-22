const {reviews} = require("../../db/db")
const Product = require("../../models/Product")
const User = require("../../models/Users")

const postReview = async (product_id, user_id, name, score, review, aaa) => {
   const product = await Product.findByPk(product_id) 
   const user = await User.findByPk(user_id) 

    if(product){
        const reviewCreated = await reviews.create({name, score: parseInt(score), review})
        reviewCreated.setProduct(product)
        reviewCreated.setUser(user)
        return 'review created successfully'
    }else{
        return "The product doesn't exist"
    }
}

const validateExistingReview = async (product_id, user_id) =>{
   const review = await reviews.findAll()
   const a = review.find((r) =>r.dataValues.userUserId === user_id && r.dataValues.productId === product_id)
   return (a ? true : false)
}

const getReviews = async (product_id) => {
    const product = await Product.findByPk(product_id) 
     if(product){
         const productReviews = await product.getReviews()
         return productReviews
     }else{
         return "The product doesn't exist"
     }
 }

const deleteReview = async (id) => {
    const review = await reviews.findByPk(id) 
     if(review){
         await reviews.destroy({
            where: {id: id}
        })
         return 'Review deleted successfully'
     }else{
         return "The review doesn't exist"
     }
}

const getReviewsUser = async (id) => {
    const user = await User.findByPk(id) 
    console.log(user)
     if(user){
         const userReviews = await user.getReviews()
         console.log(userReviews)
         return userReviews
     }else{
         return "The product doesn't exist"
     }
}


module.exports = { postReview, getReviews, deleteReview, getReviewsUser, validateExistingReview };
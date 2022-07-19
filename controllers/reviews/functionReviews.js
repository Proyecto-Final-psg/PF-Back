const {reviews} = require("../../db/db")
const Product = require("../../models/Product")

const postReview = async (product_id, name, score, review) => {
   const product = await Product.findByPk(product_id) 
    if(product){
        const reviewCreated = await reviews.create({name, score: parseInt(score), review})
        reviewCreated.setProduct(product)
        return 'review created successfully'
    }else{
        return "The product doesn't exist"
    }
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


module.exports = { postReview, getReviews, deleteReview };
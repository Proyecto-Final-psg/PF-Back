const {Router} = require('express')
const {postReview, getReviews, deleteReview, getReviewsUser, validateExistingReview, getAllReviews} = require ('../controllers/reviews/functionReviews')

const router = Router();

router.post('/reviews', async (req, res) => {
    const { product_id, user_id, name, score, review, review_id } = req.body
   
    try {
        res.status(200).json(await postReview(product_id, user_id, name,score, review, review_id))
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})

router.get('/reviews', async(req, res) => {
    try {
        res.status(200).json(await getAllReviews())
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})

router.get('/validatereview', async (req, res) => {
    let {product_id, user_id} = req.body
    try {
        res.status(200).json(await validateExistingReview(product_id, user_id))
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})

router.get('/reviewsUser/:id', async (req, res) => {
    const { id } = req.params
    try {
        res.status(200).json(await getReviewsUser(id))
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})

router.get('/reviews/:id', async (req, res) => {
    const { id } = req.params
    try {
        res.status(200).json(await getReviews(id))
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})

router.delete('/reviews/:id', async (req, res) => {
    const { id } = req.params
    try {
        res.status(200).json(await deleteReview(id))
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})

module.exports = router;
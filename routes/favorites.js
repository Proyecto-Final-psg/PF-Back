const {Router} = require('express')
const router = Router();
const {getAllFavorites, addFavorite, removeFavorite} = require('../controllers/favorites/functionFavorites')

router.get('/favorites', async (req, res) => {
    try {
        res.json(await getAllFavorites())
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})

router.post('/addfavorites', async (req, res) => {
    let {product_id, user_id} = req.body
    try {
        res.json(await addFavorite(product_id, user_id))
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})
router.delete('/removefavorites/:id', async (req, res) => {
    let {id} = req.params
    try {
        res.json(await removeFavorite(id))
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})
module.exports = router
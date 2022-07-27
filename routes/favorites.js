const {Router} = require('express')
const router = Router();
const {getAllFavorites, addFavorite, removeFavorite, getFavoritesUser, myfunct} = require('../controllers/favorites/functionFavorites')

router.get('/favorites', async (req, res) => {
    try {
        res.json(await getAllFavorites())
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})
///// ruta prueba
router.get('/myfunct', async (req, res) => {
    try {
        res.json(await myfunct())
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})
//////
router.get('/favoritebyuser/:user_id', async (req, res) => {
    let {user_id} = req.params
    try {
        res.json(await getFavoritesUser(user_id))
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})
router.post('/addfavorites/:product_id', async (req, res) => {
    let {product_id} = req.params
    let {user_id} = req.body
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
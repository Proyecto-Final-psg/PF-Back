const {Router} = require('express')
const { getProducts, createProduct, getProductById, deleteProduct, getProductByName } = require('../controller/functionsProduct')

const router = Router();

router.get('/products', async (req, res) => {
    try {
        res.json(await getProducts())
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.get('/products/name', async (req, res) => {
    let { name } = req.query
    try {
        res.json(await getProductByName(name))
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.post('/products', async (req, res) => {
    try {
        let { name, stock, price, img, type, description, thc, cbd, categories } = req.body
        res.json(await createProduct(name, stock, price, img, type, description, thc, cbd, categories))
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.get('/products/:id', async (req, res) => {
    try {
        let { id } = req.params
        res.json(await getProductById(id))
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.delete('/products/:id', async (req, res) => {
    try {
        let { id } = req.params
        res.json(await deleteProduct(id))
    } catch (error) {
        res.status(401).json(error.message)
    }
})

module.exports = router

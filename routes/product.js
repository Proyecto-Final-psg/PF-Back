const { Router } = require('express')
const { getProducts, createProduct, getProductById, deleteProduct, getProductByName, uploadProducts, uploadCategories, updateProduct } = require('../controllers/products/functionsProduct')
const { getCategories } = require('../controllers/categories/functionCategory')
const { orderCbd, orderThc, orderPrice } = require('../controllers/products/orders')
const { filterByCategory } = require('../controllers/products/orders')
const { set } = require('lodash')
const router = Router();

////  --   RUTA PARA CARGAR CATEGORIAS Y PRODUCTOS A LA BD ----
const chargeDb = async () => {
    let busqueda = await getCategories()
    if (busqueda.length == 0) {
        let categoriesUpload = await uploadCategories()
        if (categoriesUpload > 0) {
            uploadProducts()
            console.log('se cargaron todos los productos')
        } else {
            console.log('No se cargaron los productos')
        }
    }
    console.log("base de datos cargada")
}
chargeDb()
router.get('/uploadDb', async (req, res) => {
    try {
        let categoriesUpload = await uploadCategories()
        if (categoriesUpload > 0) {
            uploadProducts()
            res.json('se cargaron')
        } else {
            res.json('No se cargaron')
        }
    } catch (error) {
        res.status(401).json(error.message)
    }
})
///////////////////////////////////////////////////////////////

router.get('/', async (req, res) => {
    try {
        res.json(await getProducts())
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.get('/search', async (req, res) => {
    let { name } = req.query
    try {
        res.json(await getProductByName(name))
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.post('/', async (req, res) => {
    try {
        let { name, stock, price, img, type, description, thc, cbd, categories } = req.body

        res.json(await createProduct(name, stock, price, img, type, description, thc, cbd, categories))
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.put('/:id', async (req, res) => {
    let { id } = req.params
    let { name, stock, price, img, type, description, thc, cbd, categories } = req.body
    try {
        res.json(await updateProduct(id, name, stock, price, img, type, description, thc, cbd, categories))
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.post('/orderCbd/', async (req, res) => {
    let { category, setOrder } = req.body
    try {
        res.json(await orderCbd(category, setOrder))

    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.post('/orderThc/', async (req, res) => {
    let { category, setOrder } = req.body
    try {
        res.json(await orderThc(category, setOrder))

    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.post('/orderPrice/', async (req, res) => {
    let { category, setOrder } = req.body
    try {
        res.json(await orderPrice(category, setOrder))

    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.get('/:id', async (req, res) => {
    try {
        let { id } = req.params
        res.json(await getProductById(id))
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.delete('/:id', async (req, res) => {
    try {
        let { id } = req.params
        res.json(await deleteProduct(id))
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.get('/filter/:category', async (req, res) => {
    try {
        const { category } = req.params
        res.json(await filterByCategory(await getProducts(), category))
    } catch (error) {
        res.status(401).json(error.message)
    }
})


module.exports = router

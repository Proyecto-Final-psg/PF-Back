const {Router} = require('express')
const { getProducts, createProduct, getProductById, deleteProduct, getProductByName, uploadProducts, uploadCategories } = require('../controller/functionsProduct')
const { getCategories } = require('../controller/functionCategory')
const { filterByCategory } = require('../filters/filterProducts')
const router = Router();

////  --   RUTA PARA CARGAR CATEGORIAS Y PRODUCTOS A LA BD ----
router.get('/uploadDb', async (req, res) => {   
    try {
       let categoriesUpload = await uploadCategories()
      
        if(categoriesUpload > 0){
            uploadProducts()
            res.json('se cargaron')
        }else{
           res.json('No se cargaron') 
        }
        
    } catch (error) {
        res.status(401).json(error.message)
    }
})
 
///////////////////////////////////////////////////////////////

router.get('/products', async (req, res) => {
    try {
        res.json(await getProducts())
    } catch (error) {
        res.status(401).json(error.message)
    }
})
router.get('/products/search/', async (req, res) => {
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

////  ----------- FILTERS --------------------------------

router.get('/products/filter/:category', async (req, res) => {
    try {
        const {category} = req.params
        res.json(await filterByCategory(category))
    } catch (error) {
        res.status(401).json(error.message)
    }
})


module.exports = router

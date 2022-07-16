const {Router} = require('express')
const {getCategories, createCategory, deleteCategory, modifyCategory} = require ('../controllers/categories/functionCategory')

const router = Router();

router.get('/category', async (req, res) => {
    try {
        res.status(200).json(await getCategories())
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})
router.post('/category', async (req, res) => {
    let { category } = req.body
    try {
        res.status(200).json(await createCategory(category))
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})
router.delete('/category/:id', async (req, res) =>{
    let { id } = req.params
    try {
        res.status(201).json(await deleteCategory(id))
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})
// update category routes
router.put('/category/:id', async (req, res) =>{
    let { id } = req.params
    let { category} = req.body
    try {
        res.status(201).json(await modifyCategory(category,id))
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message)
    }
})

module.exports = router
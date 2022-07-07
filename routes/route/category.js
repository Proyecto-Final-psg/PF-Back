const {Router} = require('express')
const {getCategories, createCategory, deleteCategory} = require ('../controller/functionCategory')

const router = Router();

router.get('/category', async (req, res) => {
    try {
        res.status(200).json(await getCategories())
    } catch (error) {
        console.log(error)
    }
})

router.post('/category', async (req, res) => {
    let { category } = req.body
    try {
        res.status(200).json(await createCategory(category))
    } catch (error) {
        console.log(error)
    }
})

router.delete('/category/:id', async (req, res) =>{
    let { id } = req.params
    try {
        res.status(201).json(await deleteCategory(id))
    } catch (error) {
        console.log(error)
    }
})

// update category routes
router.put('/category/:id', async (req, res) =>{
    let { id } = req.params
    try {
        res.status(201).json(await deleteCategory(id))
    } catch (error) {
        console.log(error)
    }
})



module.exports = router
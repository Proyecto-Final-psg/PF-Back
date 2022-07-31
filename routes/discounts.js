const {Router} = require('express');
const { createDiscount } = require('../controllers/discounts/functionDiscounts');
const Discounts = require('../models/Discounts');
// const {getCategories, createCategory, deleteCategory, modifyCategory} = require ('../controllers/categories/functionCategory')

const router = Router();

router.get('/discounts', async(req, res)=>{
    try {
        const discount = await Discounts.findAll()
        res.json({msg:discount})
    } catch (error) {
        res.json({error:'error'})
        
    }
})

router.post('/add-discount', async(req, res)=>{
    try {
        const {randomCode} = req.body
        const addDiscount = await createDiscount(randomCode)
        res.json({msg:'Discount created'})
    } catch (error) {
        res.json({error:error})
    }
})

module.exports = router
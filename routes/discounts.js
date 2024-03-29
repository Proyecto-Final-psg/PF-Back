const { Router } = require('express');
const { createDiscount, getDiscountByCode, getDiscountByCodeAndUseIt, getDiscount } = require('../controllers/discounts/functionDiscounts');
const Discounts = require('../models/Discounts');
// const {getCategories, createCategory, deleteCategory, modifyCategory} = require ('../controllers/categories/functionCategory')

const router = Router();

router.get('/discounts', async (req, res) => {
    try {
        const discount = await Discounts.findAll()
        res.json({ msg: discount })
    } catch (error) {
        res.json({ error: 'error' })
    }
})

router.post('/add-discount', async (req, res) => {
    try {
        const { code, percentage } = req.body
        const addDiscount = await createDiscount(code, percentage)
        res.json({ addDiscount })
    } catch (error) {
        res.json({ error: error })
    }
})

router.get('/get-discount', async (req, res) => {
    try {
        const { code } = req.query
        // console.log(code);
        const discount = await getDiscount(code)
        res.json({ discount })
    } catch (error) {
        res.json({ error: error })
    }
})

router.put('/discount-used', async (req, res) => {
    try {
        // console.log('usando descuento');
        const { code } = req.body
        // console.log('el codigo a usar',code)
        const discount = await getDiscountByCodeAndUseIt(code)
        // console.log(discount);
        res.json({ code: discount })
    } catch (error) {
        res.json({ error: error })
    }
})

module.exports = router
const { Router } = require('express')
const {message1, message2, message3} = require('../controllers/mailer/msgMailer')
const router = Router();

router.post('/mail', async (req, res) => {
    let {userid, order, status, address, arrayItems} = req.body
    if(status === 'create' || status === 'inprogress'){
        try {
            await message1(userid, order, arrayItems)
            res.json('mail send')
        } catch (error) {
            console.log(error)
        }
    } else if (status === 'canceled'){
        try {
            await message2(userid, order, status)
            res.json('mail send')
        } catch (error) {
            console.log(error)
        }
    } else if(status === 'completed'){
        try {
            await message3(userid, order, status, address, arrayItems)
            res.json('mail send')
        } catch (error) {
            console.log(error)
        }
    }
})

module.exports = router
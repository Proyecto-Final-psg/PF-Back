const { Router } = require('express')
const {message1, message2, message3} = require('../controllers/mailer/msgMailer')
const router = Router();

router.post('/mail', async (req, res) => {
    let {email, user, order, status} = req.body
    if(status === 'create'){
        try {
            await message1(email, user, order, status)
            res.json('mail send')
        } catch (error) {
            console.log(error)
        }
    } else if (status === 'in process'){
        try {
            await message2(email, user, order, status)
            res.json('mail send')
        } catch (error) {
            console.log(error)
        }
    } else if(status === 'completed'){
        try {
            await message3(email, user, order, status)
            res.json('mail send')
        } catch (error) {
            console.log(error)
        }
    }
})

module.exports = router
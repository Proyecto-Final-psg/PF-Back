const { Router } = require('express')
const {message1, message2, message3} = require('../controllers/mailer/msgMailer')
const router = Router();

router.post('/mail', async (req, res) => {
    let {userid, email, order, status, address, arrayItems} = req.body
    console.log(userid, email, order, status, address, arrayItems);
    console.log('EL ESTADO ES ',status);
    if(status === 'create' || status === 'inprogress'){
        try {
            console.log('entre create o inprogress');
            await message1(email, order, arrayItems)
            res.json('mail send')
        } catch (error) {
            console.log(error)
        }
    } else if (status === 'canceled'){
        try {
            console.log('entre canceled');
            await message2(userid, order, status, email)
            res.json('mail send')
        } catch (error) {
            console.log(error)
        }
    } else if(status === 'completed'){
        try {
            console.log('entre completed');
            await message3(userid, order, status, address, arrayItems, email)
            res.json('mail send')
        } catch (error) {
            console.log(error)
        }
    }
})

module.exports = router
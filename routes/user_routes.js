const { User } = require('../models');
const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/user/add', async (req, res) => {
    let details = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }
    let result = await User.findOne({ where: { email: details.email } })
    if (result){
            res.render('signupagain')
           
    }
    else{
        let result1 = await User.create(details)
    console.log(result1)
    res.render('successlogin')}
    


})

router.post('/user/login', async (req, res) => {

    let email = req.body.email
    let password = req.body.password

    let result = await User.findOne({ where: { email: email } })
    if (result) {
        let validpassword = await bcrypt.compareSync(password, result.password)
        if (!validpassword) {
            res.render('loginagain')
        }
        else {
            const token = await jwt.sign({ id: result.id }, 'helloecommerce', { expiresIn: '1h' })
            
            res.cookie('token', token, { httpOnly: true })
           res.send('<h1>Login successfull can access Blog in home page</h1>')
            //res.render('index')
            
        }
    }
    else {
        res.render('loginagain')
    }

})
module.exports = {
    Userrouter: router
}
const router = require('express').Router();
const {checktoken} = require('../middleware/auth')

router.get('/',(req,res)=>{
    res.render('index')
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/blog',[checktoken],(req,res)=>{
    res.render('blog')
})
router.get('/signup',(req,res)=>{
    res.render('signup')
})

module.exports = {
    webrouter: router
}
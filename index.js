require('dotenv').config()
const express = require('express');

const {sequelize} = require('./models')
const {webrouter} = require('./routes/webpages');
const {Userrouter}= require('./routes/user_routes');

const cookieParser = require('cookie-parser');



const app= express();


app.use(express.json())
app.use(express.urlencoded({extended: true }))
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(cookieParser())

app.use(webrouter)
app.use(Userrouter)
app.listen((process.env.PORT || 5000),()=>{
    console.log('server running')
    sequelize.sync({force:false})
}) 
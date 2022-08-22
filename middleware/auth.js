//token verify
const jwt = require('jsonwebtoken')
async function checktoken(req,res,next){
let token = req.cookies.token
if (token) {
    //verify
    const user = await jwt.verify(token,'helloecommerce')
    if(user){
      // req.user =result.id
        next();
    }else{
       res.status(401).send({msg : 'auth token expired'})
       //res.render('login')
		return;
    }

} else {
   // res.clearCookies('token')
 // res.status(401).send({msg : 'auth token is missing'})
    //res.render('login')

    return res.render('login');
}



}




module.exports ={
    checktoken
}
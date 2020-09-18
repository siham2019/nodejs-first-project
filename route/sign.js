const routerH = require('express').Router();
const auth=require('../controller/auth')
const check = require('express-validator').check;
const bodyParser = require('body-parser').urlencoded(
    {
      extended:true
    }
)
const o = require('./protect/auth1');

routerH.get("/",o.isNotAuth,auth.signController)
routerH.post("/",o.isNotAuth,bodyParser
,check("username").not().isEmpty().withMessage('username is required')
,check("email").not().isEmpty().withMessage('email is required').isEmail().withMessage('invalid format')
,check("password").not().isEmpty().withMessage('password is required'),
check("cpassword").not().isEmpty().withMessage('password is required').custom((cpassword,{req})=>{
   if (cpassword===req.body.password) {
       return true
   } else {
       return false
   }
}).withMessage('password does not match'),auth.newUser)

module.exports =routerH;
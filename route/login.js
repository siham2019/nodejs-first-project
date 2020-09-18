const routerH = require('express').Router();
const auth=require('../controller/auth')
const check = require('express-validator').check;
const o = require('./protect/auth1');

const bodyParser = require('body-parser').urlencoded(
    {
      extended:true
    }
)


routerH.get("/",o.isNotAuth,auth.loginController);
routerH.post("/",o.isNotAuth,bodyParser,
check("username").not().isEmpty().withMessage("username is required"),
check("password").not().isEmpty().withMessage("password is required")
,auth.login);

module.exports =routerH;
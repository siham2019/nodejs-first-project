const routerH = require('express').Router();
const auth=require('../controller/auth')
const o = require('./protect/auth1');


routerH.all("/",o.isAuth,auth.logoutController);
module.exports =routerH;
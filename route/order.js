const routerH = require('express').Router();
const ord=require('../controller/order_c')
const check = require('express-validator').check;
const o = require('./protect/auth1');


const bodyParser = require('body-parser').urlencoded(
    {
      extended:true
    }
)
routerH.get("/",o.isAuth,ord.OrderController)
routerH.post("/demand",o.isAuth,bodyParser,ord.addOrderController)
routerH.post("/add",o.isAuth,bodyParser,ord.newOrderController)
module.exports =routerH;
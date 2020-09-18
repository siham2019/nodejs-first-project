const routerH = require('express').Router();
const cart=require('../controller/cart_c')
const check = require('express-validator').check;
const o = require('./protect/auth1');

const bodyParser = require('body-parser').urlencoded(
    {
      extended:true
    }
)
routerH.get("/",o.isAuth,cart.cartController);

routerH.post("/",o.isAuth,bodyParser
,check("quantity").not().isEmpty().withMessage("quantity is required")
.isInt({min:1}).withMessage("quantity must be greater than 0")
,cart.setCartController);

routerH.post("/save",o.isAuth,bodyParser
,check("quantity").not().isEmpty().withMessage("quantity is required")
.isInt({min:1}).withMessage("quantity must be greater than 0")
,cart.saveCartController)

routerH.post("/delete",o.isAuth,bodyParser
,cart.deleteCartController)



module.exports =routerH;
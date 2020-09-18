const routerH = require('express').Router();

const product=require('../controller/product_controller')

routerH.get("/",(req,res,next)=>{
    res.render('errorF')
});


routerH.get("/:id",product.productController);
module.exports =routerH;
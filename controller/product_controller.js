 const Product = require('../model/productModel');


exports.productController=(req,res,next)=>{
Product.getByIdPro(req.params.id).then((product)=>{
       res.render('product',{
           product:product,
           sid:req.session.sid,
        isAdmin:req.session.isAdmin
       } )
   }
  )
}
const Product = require('../model/productModel');


exports.homeController=(req,res,next)=>{
  /*  Product.getAllProduct().then((product)=>{
       res.render('index',{
           product:product,
        id:req.session.sid,
        c:req.flash("c")
        
       })
    })*/
    let cat=['eye','lip','face'];
    let c=req.query.category;
    let prodct;
    if(c && cat.includes(c)) prodct=Product.getAllCategory(c)
    else prodct=Product.getAllProduct()

    prodct.then((product)=>{
        res.render('index',{
            product:product,
            sid:req.session.sid,
           isAdmin:req.session.isAdmin,
           c:req.flash("c")[0],
           title:"home"
        } )
      }
    ).catch((err) => {
     console.log("khraaaaaaaaaaaaaaaaaaa")
      next(err)
    })
}

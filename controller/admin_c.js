const product=require("../model/productModel")
const v = require('express-validator').validationResult;
exports.addController=(req,res,next)=>{
    res.render("addProduct",{
        sid:req.session.sid,
        isAdmin:req.session.isAdmin,
        pro:req.flash("pro"),
        title:"add product"
    })
}
exports.addpController=(req,res,next)=>{
    if (v(req).isEmpty()) {
        product.addProduct({
            name:req.body.name,
            price:req.body.price,
            category:req.body.category,
            description:req.body.description,
            image:req.file.filename
        }).then(()=>{
            res.redirect("/")
        }).catch(err=> {
            console.log(err)
    
        })
    } else {
        req.flash("pro",v(req).array())
        res.redirect("/admin/add")
    }
}
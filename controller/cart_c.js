const v = require('express-validator').validationResult;
const cc = require('../model/cart_m');

exports.cartController=(req,res,next)=>{
    cc.getCart(req.session.sid).then((ca)=>{
        res.render('cart',{
            sid:req.session.sid,
            isAdmin:req.session.isAdmin,
            ca:ca,
            up:req.flash("up")[0],
            title:"cart"
        })
    }).catch((err)=>{
        console.log(err)
        
    })
 
}


exports.saveCartController=(req,res,next)=>{
    if (v(req).isEmpty()){
        cc.updateCart(req.body.quantity,req.body.idc).then(()=>{
            res.redirect("/cart")
          }).catch((err)=>{
               console.log(err)
          })
    }else{
        req.flash("up",v(req).array())
        res.redirect("/cart")
    }

}

exports.deleteCartController=(req,res,next)=>{
    cc.deleteCart(req.body.idc).then(()=>{
        res.redirect("/cart")
    }).catch((err)=> console.log(err))
}
exports.setCartController=(req,res,next)=>{
      if (!v(req).isEmpty()) {
           req.flash("c",v(req).array())
           res.redirect('/')
      }else{
          cc.addCart({
              name:req.body.name,
              price:req.body.price,
              sid:req.body.idu,
              pid:req.body.idpro,
              amount:req.body.quantity,
              timea:Date.now()
          }).then(()=>{
              res.redirect("/cart")
          }).catch((err)=>{
                console.log(err)
          })
      }
}
const v = require('express-validator').validationResult;
const order=require("../model/order_m")

exports.OrderController=(req,res,next)=>{
    order.getOrder(req.session.sid).then(data=>{
        res.render("order1",{
          d:data,
          sid:req.session.sid,
          isAdmin:req.session.isAdmin,
          title:"order"
        })
    }).catch(err => console.log(err))
}
exports.addOrderController=(req,res,next)=>{
      res.render("order",{
          m:req.body,
          sid:req.session.sid,
          isAdmin:req.session.isAdmin,
          title:"request for order"
      })
}
exports.newOrderController=(req,res,next)=>{
      order.addOrder(req.body).then(()=>{
        res.redirect("/order")
      }).catch((err)=>{
          console.log(err)
        

      })
}
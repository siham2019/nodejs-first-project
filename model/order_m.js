
const mongoose = require('mongoose');
const cart=require("./cart_m")
const schemaPro=mongoose.Schema({
name:String,
price:Number,
sid:String,
pid:String,
status:String,
amount:Number,
adress:String,
timea:Date
})
const Order=mongoose.model('order',schemaPro)

exports.getOrder=(sid)=>{
    return new Promise((resolve,reject)=>{
        console.log("khraaaaaaaaaaaaaaaerzz")
        mongoose.connect("mongodb+srv://ulta:sisi2018@cluster0.rby9s.mongodb.net/makeup_shop?retryWrites=true&w=majority")
        .then(()=>{
            return Order.find({sid:sid}).sort({timea:1})
        }).then(data=>{
            mongoose.disconnect()
            resolve(data)
        }).catch(err=>reject(err))
    })
}
exports.addOrder=(data)=>{
      return new Promise((resolve,reject)=>{
          mongoose.connect("mongodb+srv://ulta:sisi2018@cluster0.rby9s.mongodb.net/makeup_shop?retryWrites=true&w=majority")
          .then(()=>{
              console.log(data)
             return new Order({
                name:data.name,
                price:data.price,
                sid:data.idu,
                pid:data.idpro,
                status:"pending",
                amount:data.quantity,
                adress:data.adress,
                timea:Date.now()
             }).save()
          }).then(()=>{
              mongoose.disconnect()
              console.log(" mongooses ")
             cart.deleteCart(data.idc)
             console.log(" mongooses2 ")
          }).then(()=>{
            console.log(" mongooses3")
              resolve()
          }).catch(err=> reject(err))
      })
}






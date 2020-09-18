
const mongoose = require('mongoose');

const schemaPro=mongoose.Schema({
name:String,
price:Number,
sid:String,
pid:String,
amount:Number,
timea:Date
})
const Cart=mongoose.model('cart',schemaPro)


exports.updateCart=(a,id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect("mongodb+srv://ulta:sisi2018@cluster0.rby9s.mongodb.net/makeup_shop?retryWrites=true&w=majority")
        .then(()=>{
            return Cart.updateOne({_id:id},{amount:a})

        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.deleteCart=(id)=>{
    return new Promise((resolve,reject)=>{
           mongoose.connect("mongodb+srv://ulta:sisi2018@cluster0.rby9s.mongodb.net/makeup_shop?retryWrites=true&w=majority")
           .then(()=>{
               return Cart.remove({_id:id})
           }).then(()=>{
               mongoose.disconnect()
               resolve()
           }).catch(err=> reject(err))  
    
    
    })
}






exports.getCart=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect("mongodb+srv://ulta:sisi2018@cluster0.rby9s.mongodb.net/makeup_shop?retryWrites=true&w=majority")
        .then(()=>{
              return Cart.find({sid:id}).sort({timea:1})
        }).then((ca)=>{
             mongoose.disconnect()
             resolve(ca)
        }).catch((err)=>{
             mongoose.disconnect()
             reject(err)
             console.log(err)
        })
    })
}
exports.addCart=(data)=>{
    return new Promise((resolve,reject)=>{

         mongoose.connect("mongodb+srv://ulta:sisi2018@cluster0.rby9s.mongodb.net/makeup_shop?retryWrites=true&w=majority")
           .then(()=>{
             return new Cart(data).save()
           })
           .then(()=>{
               mongoose.disconnect()
               resolve()
           })
           .catch(()=>{
               mongoose.disconnect()
               reject()
           })
    })
}


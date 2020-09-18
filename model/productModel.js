const mongoose = require('mongoose');

const schemaPro=mongoose.Schema({
name:String,
price:Number,
category:String,
description:String,
image:String
})
const Product=mongoose.model('product',schemaPro)

exports.getByIdPro=(id)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb+srv://ulta:sisi2018@cluster0.rby9s.mongodb.net/makeup_shop?retryWrites=true&w=majority").then(()=>{

              return Product.findById(id)

            }
            
        ).then((Product)=>{
            resolve(Product)
            mongoose.disconnect()
        }).catch((err)=>{
            reject(err)
        })
    })
    
}

exports.getAllCategory=(category)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb+srv://ulta:sisi2018@cluster0.rby9s.mongodb.net/makeup_shop?retryWrites=true&w=majority").then(()=>{

              return Product.find({category:category})

            }
            
        ).then((Product)=>{
            resolve(Product)
            mongoose.disconnect()
        }).catch((err)=>{
            reject(err)
        })
    })
    
}
exports.addProduct=(data)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect("mongodb+srv://ulta:sisi2018@cluster0.rby9s.mongodb.net/makeup_shop?retryWrites=true&w=majority")
        .then(()=>{
            return new Product(data).save()
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(err=>reject(err))
    })
}
/*
"mongodb+srv://ulta:sisi2018@cluster0.rby9s.mongodb.net/makeup_shop?retryWrites=true&w=majority"
*/

exports.getAllProduct=()=>{
    
    return new Promise((resolve, reject) => {
        mongoose.connect("mongodb+srv://ulta:sisi2018@cluster0.rby9s.mongodb.net/makeup_shop?retryWrites=true&w=majority").then(()=>{

              return Product.find({})

            }
            
        ).then((Product)=>{
            resolve(Product)
            mongoose.disconnect()
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
    
}

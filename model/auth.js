const mongoose = require('mongoose');

const schemaPro=mongoose.Schema({
username:String,
password:String,
email:String,
isAdmin:Boolean

})
const User=mongoose.model('user',schemaPro)


exports.login=(username,password)=>{
  return new Promise((resolve,reject)=>{
      mongoose.connect("mongodb+srv://ulta:sisi2018@cluster0.rby9s.mongodb.net/makeup_shop?retryWrites=true&w=majority").then(()=>{
         return User.findOne({username:username})
      }).then((usern)=>{
        
          if (!usern) {
            mongoose.disconnect()
             reject("username incorrect")
          } else {
           
             return User.findOne({_id:usern._id,password:password})
          }
      }).then((pass)=>{
        if (pass) {
  
            resolve(pass)
            mongoose.disconnect()
        } else {

       
         reject("password incorrect")
         mongoose.disconnect()
        }
      }).catch((err)=>{
         reject(err)
      })
   })
}



exports.newUser=(email,password,username)=>{
   return new Promise((resolve,reject)=>{
      mongoose.connect("mongodb+srv://ulta:sisi2018@cluster0.rby9s.mongodb.net/makeup_shop?retryWrites=true&w=majority").then(()=>{
        return User.findOne({email:email})
     }).then((user)=>{
        if (user) {
            mongoose.disconnect()
          reject('email exist')
       
        } else {
             let u = new User({
                 username:username,
                 password:password,
                 email:email,
                 isAdmin:false
             })
            return  u.save()
           
        }
     }).then(()=>{
         console.log("fgfhhfhh")
      
        mongoose.disconnect()
        resolve()
     }).catch((err)=>{
           
           mongoose.disconnect()
           reject(err)
     })
   })
}
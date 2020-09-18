const express = require('express');
const app=express()
const path = require('path');
const session = require('express-session');
const connectSession = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

/* const bodyParser = require('body-parser').urlencoded(
    {
      extended:true
    }
) */
const od=require('./route/order')
const h = require('./route/home');
const s= require('./route/sign')
const p = require('./route/product');
const l = require('./route/login');
const lo = require('./route/logout');
const c = require('./route/cart');
const j = require('./route/admin');

let ses= new connectSession({
    url:"mongodb://localhost:27017/makeup_shop",
    collection:"sessions"
})
app.use(session({
    secret:"khra2a kharayo kharyatan",
    saveUninitialized:false,
    resave:true,
    store:ses
}))

app.use(flash())
app.set('view engine','ejs')
app.set('views','view')
app.use('/',express.static(path.join(__dirname,'asset')))
app.use('/',express.static(path.join(__dirname,'images')))

app.get("/errors",(req,res,next,err)=>{
    res.status(500)
    res.render('e',{
        sid:req.session.sid,
        isAdmin:req.session.isAdmin
    })
})

app.get("/not-admin",(req,res,next)=>{
    res.status(403)
    res.render('ea',{
        sid:req.session.sid,
        isAdmin:req.session.isAdmin
    })
})
const port=process.env.port||3000
app.use('/order',od)
app.use('/cart',c)
app.use('/admin',j)
app.use('/logout',lo)
app.use('/login',l)
app.use('/signup',s)
app.use('/product',p)
app.use('/',h)
app.listen(port,()=>{
    console.log("online shop")
})
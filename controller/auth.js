const auth = require('../model/auth');
const v = require('express-validator').validationResult;

exports.loginController=(req,res,next)=>{
    res.render('login',{
        validate: req.flash('validate')[0],
        validatel:req.flash('validatel'),
        sid:req.session.sid,
        isAdmin:req.session.isAdmin,
        title:"login"
    })
}

exports.logoutController=(req,res,next)=>{
 req.session.destroy(()=>{
     res.redirect('/')
 })
}

exports.login=(req,res,next)=>{
  if (v(req).isEmpty()) {
    auth.login(req.body.username,req.body.password)   
    .then((msg)=>{
 
        req.session.sid=msg._id
        req.session.isAdmin=msg.isAdmin
        res.redirect('/')
 
    }).catch((ms)=>{
    
     req.flash('validate',ms)
     
    res.redirect('/login')
    })
  } else {
    req.flash('validatel',v(req).array())
    res.redirect('/login')
  }
}


exports.signController=(req,res,next)=>{
    res.render('signup',{
        auth:req.flash('sign')
        ,
        sid:req.session.sid,
        isAdmin:req.session.isAdmin,
        title:"signup"
    })
}

exports.newUser=(req,res,next)=>{
   
    if (v(req).isEmpty()) {
        auth.newUser(req.body.email,req.body.password,req.body.username)
        .then(()=>{
             res.redirect('/login')
        }).catch(()=>{
            res.redirect('/signup')
        })
    } else {
        req.flash('sign',v(req).array())
        res.redirect('/signup')
    }
   
}
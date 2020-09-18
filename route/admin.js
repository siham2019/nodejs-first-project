const routerH = require('express').Router();
const check = require('express-validator').check;
const multer = require('multer');
const o = require('./protect/auth1');
const i = require('./protect/isAdmin');
const f=require("../controller/admin_c");
const { diskStorage } = require('multer');

routerH.get("/add",o.isAuth,i.isAdmin,f.addController)
routerH.post("/add",o.isAuth,i.isAdmin,
multer({
    storage:diskStorage({
        destination:(req,file,cb)=>{
             cb(null,"images")
        },
        filename:(req,file,cb)=>{
            cb(null,file.originalname)
        }
    })
    }).single("image")
    ,check("name").not().isEmpty().withMessage("name is required"),
    check("price").not().isEmpty().withMessage("price is required")
    ,
    check("description").not().isEmpty().withMessage("description is required")
    ,
    check("image").custom((value,{req})=>{
        if (req.file) {
            return true
        } else {
            return false
        }

    }).withMessage("please choose image")
    ,
    f.addpController)
module.exports =routerH;
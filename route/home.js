const routerH = require('express').Router();
const home=require('../controller/home_controller')
//get controller home


routerH.get("/",home.homeController);
module.exports =routerH;
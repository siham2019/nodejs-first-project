exports.isNotAuth=(req,res,next)=>{
    if (req.session.sid) {
        res.redirect("/")
        
    } else {
        next()
    }
}
exports.isAuth=(req,res,next)=>{
    if (req.session.sid) {
        next()
    } else {
        res.redirect("/")
    }
}
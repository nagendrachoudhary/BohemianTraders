
const isAuth= (req,res,next)=>{
    let token = req.headers.token;
    next();
    }
module.exports=isAuth
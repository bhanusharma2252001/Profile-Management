const jwt=require('jsonwebtoken');
const User=require('../models/User');
const verifyToken=async(req,res,next)=>
{
    if(req.body.firstName&&req.body.password)
    {
        role=req.body.role;
    }
    else if(req.body.firstName)
    {
        const RequestedUser=await User.findOne({firstName:req.body.firstName});
        // console.log(RequestedUser);
        var role= RequestedUser.role;
    }
    if(req.headers.token)
    {
        jwt.verify(req.headers.token,process.env.JWT_KEY,(err,User)=>
        {
            if(err)
            {
                res.status(400).json("Invalid Token!!")
            }
            else
            {
                if(role==="admin")
                {
                    User.role!=="admin"&&res.status(401).json("You're not authorized to do this!!");
                    next();
                }
                else
                {
                    next();
                }
            }
            
        })
    }
    else
    {
        res.status(401).json("You don't have acess!!")
    }
}

const verifyTokenAndAdmin=(req,res,next)=>
{
    verifyToken(req,res,()=>
    {
        console.log(req.user.role);
        if(req.user.role==="Admin")
        next();
        else
        res.status(401).json("not authenticated!!")
    })
}

module.exports={verifyToken,verifyTokenAndAdmin}
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const cryptoJS=require('crypto-js');

// Add Admin or User
const addAdminAndUser= async (req,res)=>
{    
   if(req.body.password.length>12&&req.body.password.length<6)
   {
       res.status(501).json("Enter password between 6 to 12 characters");
   }
   else if(req.body.confirmPassword)
   {
       if(req.body.password!==req.body.confirmPassword)
       res.status(501).json("confirm password doesn't match!!");
   }
   else
   {
       res.status(401).json("please enter confirm password!");
   }
   const newUser=new User(
       {
       firstName:req.body.firstName,
       middleName:req.body.middleName,
       lastName:req.body.lastName,
       email:req.body.email,
       password:cryptoJS.AES.encrypt(req.body.password, process.env.JWT_KEY),
       role:req.body.role,
       department:req.body.department
       }
   )
   try {
       
       const savedUser=await newUser.save();
       
       const token=jwt.sign(
           {
               firstName:savedUser.firstName,
               role:savedUser.role
           },
           process.env.JWT_KEY,
           {
               expiresIn:"3d"
           }
       )
       
       res.status(200).json({savedUser,token})

       } catch (error) {
       
       res.status(401).json(error);
   }
  
}

// Update Admin or User
const updateAdminAndUser=async (req,res)=>
{
    
 User.updateOne({firstName:req.body.firstName},{$set:req.query},(err,doc)=>{
     if(!err)
     res.status(200).json(doc);
 });
 }


 //  View Admin or User
const viewAdmiAndUser=async (req,res)=>
{

    let OtherfoundedUser;
   if(req.query.field)
   {
       User.findOne({firstName:req.body.firstName},(err,foundedUser)=>
       {
           if(!err)
           res.status(200).json(foundedUser[req.query.field])
       });
   }
   else
   {
   OtherfoundedUser=await User.findOne({firstName:req.body.firstName});
       const {password,...others}=OtherfoundedUser._doc;
   res.status(200).json(others);
   }
}

module.exports=({addAdminAndUser,updateAdminAndUser,viewAdmiAndUser})
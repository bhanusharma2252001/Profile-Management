const mongoose=require('mongoose');
const userSchema=new mongoose.Schema(
    {
        firstName:{type:String,required:true,unique:true},
        middleName:{type:String},
        lastName:{type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true,unmodifiable: true},
        confirmPassword:{type:String},
        role:{type:String,default:'User',required:true},
        department:{type:String}
    },
    {
        timestamps:true,
    }
)
module.exports=mongoose.model("User",userSchema);
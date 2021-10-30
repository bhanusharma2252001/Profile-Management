const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
app.use(express.json());
const userRoute=require('./routes/users');
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(process.env.mongo_url)
.then(()=>
{
    console.log('connected sucessfully!')
})
.catch((err)=>
{
    console.log(err);
})

app.use("/api/user",userRoute);

app.listen(3000,(err)=>
{
    if(!err)
    console.log("Server is listening on port 3000")
})
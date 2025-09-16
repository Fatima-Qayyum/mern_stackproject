const express=require('express');
const app=express();
const mongoose=require('mongoose');
const port=8080;
const Listing=require("./models/listing.js")
const path=require('path');
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));

const Mongoose_Url="mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    
    await mongoose.connect(Mongoose_Url);
}


main().then(()=>{
    console.log('connected to db')
}).catch((err)=>{
    console.log(err)
})

    
app.listen(port,(req,res)=>{
   
    console.log('your code is working');
});

app.get('/',(req,res)=>{
    res.send('hi i am a root')
})

/*
app.get("/testListing",async(req,res)=>{
    const sampleListing=new Listing({
title:"my new villa",
description:'by the beach',
price:1200,
location:"lahore",
country:'Pakistan',



    })
    await sampleListing.save();
    console.log('sample listing saved');
    res.send('sample listing is already saved');
    
})*/

//index Route

app.get('/listings',async(req,res)=>{
const allListing= await Listing.find({});
res.render('listings/index',{allListing});

})
const express=require('express');
const methodOverride = require("method-override");
const app=express();
const mongoose=require('mongoose');
const port=8080;
const Listing=require("./models/listing.js");
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
const path=require('path');
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));



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





// New listing

app.get('/listings/new', (req, res) => {
    res.render('listings/new');
});




//index Route

app.get('/listings',async(req,res)=>{
const allListing= await Listing.find({});
res.render('listings/index',{allListing});

})

//show route
app.get('/listings/:id',async(req,res)=>{
    let{id}=req.params;
   const listing= await Listing.findById(id);
   res.render('listings/show',{listing})


})
//create

app.post('/listings',async(req,res)=>{
   // let {title,description,image,location,country}=req.body;
   const newListing=new Listing (req.body.Listing);
   await newListing.save();
    res.redirect('/listings')
})

//edit route
app.get('/listings/:id/edit',async(req,res)=>{

    let {id}=req.params;
    const listing=await Listing.findById(id);
   
    res.render('listings/edit',{listing});
})

app.put('/listings/:id',async(req,res)=>{
    let{id}=req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.Listing});
    res.redirect(`/listings/${id}`)


})


// delete route

app.delete('/listings/:id',async(req,res)=>{
    let {id}=req.params;
    let deltedListing=await Listing.findByIdAndDelete(id);
    res.redirect('/listings')
})




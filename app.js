let express=require('express');
let app=express();
const mongoose =require('mongoose');
let Mongo_url='mongodb://127.0.0.1:27017/wanderlust';
const Listing=require('./models/listing')



async function main(){
    await mongoose.connect(Mongo_url);
    console.log("MongoDB is connected");
}
main().then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})



app.get('/',(req,res)=>{
    res.send('hello world');
})


app.get('/testlisting',async(req,res)=> {
    let sampleListing=new Listing({
        title:"Sample Listing",
        description:"This is a sample listing",
        price:100,  
        location:"New York",
        country:"USA"


    })
})
 
app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000");
})
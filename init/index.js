const mongoose=require('mongoose');
const initData=require('./data.js');
const Listing=require('../models/listing.js');
let Mongo_url='mongodb://127.0.0.1:27017/wanderlust';




async function main(){
    await mongoose.connect(Mongo_url);
    console.log("MongoDB is connected");
}
main().then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})

const initDB=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log('data was initialized');
    
    
}
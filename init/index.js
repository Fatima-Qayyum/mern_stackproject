const mongoose =require("mongoose");
const  data=require('./data.js');
const Listing=require('../models/listing.js')
const Mongoose_Url="mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    
    await mongoose.connect(Mongoose_Url);
}


main().then(()=>{
    console.log('connected to db')
}).catch((err)=>{
    console.log(err)
})

const initDb =async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(data.data);
    console.log('data was initialized')
}

initDb();

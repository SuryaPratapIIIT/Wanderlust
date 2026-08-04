const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
 .then((res)=>{
    console.log("Connection Successfull");
})
 .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB=async () =>{
    await Listing.deleteMany({});
   initData.data =  initData.data.map((obj)=>
    ({
      ...obj,
      owner:"688450de71edd68244734a28"
    }));
    await Listing.insertMany(initData.data);
    console.log("Data Was initialized");
};

initDB();
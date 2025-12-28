const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL=process.env.MONGO_URI;
async function main() {
  await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
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

main()
 .then(async () => {
   console.log("Connection Successful");
   await initDB();
   process.exit(0);
 })
 .catch(err => {
   console.error(err);
   process.exit(1);
 });
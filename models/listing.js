const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: String,
    url: {
      type: String,
      default: "https://plus.unsplash.com/premium_photo-1748894837513-e52e18135365?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0",
      set: (v) =>
        v === undefined || v === null || v.trim() === ""
          ? "https://plus.unsplash.com/premium_photo-1748894837513-e52e18135365?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0"
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  reviews:[
    {
      type: Schema.Types.ObjectId,
      ref:"Review"
    }
  ],
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  }
});

listingSchema.post("findOneAndDelete",async(listing) =>{
  if(listing)
  {
       await Review.deleteMany({_id :{$in:listing.reviews}});
  }
});


const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
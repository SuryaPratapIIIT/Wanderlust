const Listing = require("../../models/listing");
const geocodeAddress = require("../../utils/geocoder");

module.exports.index=async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
};

module.exports.renderNewForm = (req, res) => {
  console.log(req.user);
  res.render("listings/new.ejs");
};

module.exports.showListing=async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" } // populate author inside reviews
    })
    .populate("owner"); // only populate owner, not author
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist !");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing=async (req, res, next) => {
   // Ensure image field is always present for Joi validation
   let imageObj = req.body.listing.image || {};
   imageObj.url = req.file ? req.file.path : imageObj.url || "https://plus.unsplash.com/premium_photo-1748894837513-e52e18135365?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0";
   imageObj.filename = req.file ? req.file.filename : imageObj.filename || "default.jpg";
   req.body.listing.image = imageObj;

   // Geocode the location with specific location and country
   const location = req.body.listing.location;
   const country = req.body.listing.country;
   
   if (!location || !country) {
     req.flash("error", "Location and country are required!");
     return res.redirect("/listings/new");
   }
   
   const locationString = `${location}, ${country}`;
   console.log(`Creating listing with location: ${locationString}`);
   const geometry = await geocodeAddress(locationString);

   const newListing = new Listing({
     ...req.body.listing,
     owner: req.user._id,
     image: imageObj,
     geometry: geometry
   });
   
   await newListing.save();
   console.log(`Created listing with coordinates: ${JSON.stringify(geometry)}`);
   req.flash("success", "New Listing Created !");
   res.redirect("/listings");
 };

  module.exports.renderEditForm=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
     if(!listing)
    {
      req.flash("error","Listing you requested for does not exist !");
      res.redirect("/listings");
    }
    let originalImageUrl= listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", { listing,originalImageUrl });
  };

  module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
    
    // Geocode the updated location with validation
    const location = req.body.listing.location;
    const country = req.body.listing.country;
    
    if (!location || !country) {
      req.flash("error", "Location and country are required!");
      return res.redirect(`/listings/${id}/edit`);
    }
    
    const locationString = `${location}, ${country}`;
    console.log(`Updating listing with location: ${locationString}`);
    const geometry = await geocodeAddress(locationString);
    req.body.listing.geometry = geometry;
    
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file!="undefined"){
      let url=req.file.path;
      let filename=req.file.filename;
      listing.image={url,filename};
      await listing.save();
    }
    
    console.log(`Updated listing with coordinates: ${JSON.stringify(geometry)}`);
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
  };

  module.exports.destroyListing=async (req, res) => {
  const { id } = req.params;
  let deletedListing= await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success"," Listing Deleted!");
  res.redirect("/listings");
};


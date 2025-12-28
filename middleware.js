const Listing=require("./models/listing");
const {listingSchema,reviewSchema}=require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated())
    {
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be Logged in to Create Listing");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req,res,next) =>{
    let { id } = req.params;
  let listing= await  Listing.findById(id);
  if( ! listing.owner.equals(res.locals.currUser._id))
  {
    req.flash("error","You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validateListing = (req, res, next) => {
  if (!req.body.listing.image) {
    req.body.listing.image = {
      url: "https://plus.unsplash.com/premium_photo-1748894837513-e52e18135365?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0"
    };
  }
  let { error } = listingSchema.validate(req.body.listing); // validate req.body.listing
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
  else
  {
    next();
  }
}

module.exports.isReviewAuthor = async(req,res,next) =>{
    let { id , reviewId } = req.params;
  let review= await  Review.findById(reviewId);
  if( ! review.author.equals(res.locals.currUser._id))
  {
    req.flash("error","You are not the Author of this Review");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
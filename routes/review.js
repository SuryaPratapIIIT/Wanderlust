const express=require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js").default;
const Review=require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js");

 
const reviewController=require("../init/controllers/reviews.js");



router.post(
    "/",
    isLoggedIn,
    validateReview,wrapAsync(reviewController.createReview));

// DELETE  REVIEW  Route 
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview));

module.exports=router;




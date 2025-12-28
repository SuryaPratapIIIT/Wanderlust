const express=require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js").default;
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");

const ListingController=require("../init/controllers/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});



router.route("/")
.get(wrapAsync(ListingController.index))
.post(
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(ListingController.createListing)
);

// NEW Route - Show form to create new listing
router.get("/new",isLoggedIn, ListingController.renderNewForm );

router.route("/:id")
.get(wrapAsync(ListingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingController.updateListing))
    .delete(
      isLoggedIn,
  isOwner,
   wrapAsync(ListingController.destroyListing)
  );   
  


// EDIT Route - Show edit form
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.renderEditForm));



module.exports=router;


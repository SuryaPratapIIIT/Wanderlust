const Joi = require("joi");

const listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.object({
    url: Joi.string()
      .uri()
      .allow('')
      .default('https://plus.unsplash.com/premium_photo-1748894837513-e52e18135365?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0')
  }).required(),
  price: Joi.number().required(),
  location: Joi.string().required(),
  country: Joi.string().required()
});

module.exports = { listingSchema };

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating  : Joi.number().required().min(1).max(5),
        comment : Joi.string().required(),
    }).required()
});
const Joi = require("joi");
// auth schema
const authSchema = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .min(3),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .lowercase()
    .required(),
  phone_number: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});
// bus schema
busSchema = Joi.object({
  id: Joi.string()
    .length(10)
    .pattern(/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/)
    .required(),
  bus_name: Joi.string().required(),
  bus_type: Joi.string()
    .required()
    .lowercase()
    .valid("non ac sleeper", "non ac seating", "ac sleeper", "ac seating"),
});
//flight schema
flightSchema = Joi.object({
  id: Joi.string()
    .required()
    .uppercase()
    .pattern(/^[A-Z][A-Z0-9]-[0-9]{3}$/),
  flight_name: Joi.string().required(),
  flight_type: Joi.string()
    .lowercase()
    .valid("first class", "premium economy", "business class"),
});
// train schema
trainSchema = Joi.object({
  id: Joi.string()
    .length(5)
    .required()
    .pattern(/[0-9]{5}$/),
  train_name: Joi.string().required(),
  train_type: Joi.string()
    .lowercase()
    .valid("non ac sleeper", "ac sleeper", "non ac seating"),
});
//city schema
citySchema = Joi.object({
  city_name: Joi.string().required().lowercase(),
  state_name: Joi.string().required().lowercase(),
});
stateSchema = Joi.object({
  state_name: Joi.string().required().lowercase(),
});

module.exports = {
  authSchema,
  busSchema,
  stateSchema,
  flightSchema,
  citySchema,
  trainSchema,
};

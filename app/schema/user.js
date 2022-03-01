const Joi = require('joi');

// use JOI to perform the external validations
module.exports = {
  signUpSchema: Joi.object({
    firstName: Joi.string().required().messages({
      'string.base': 'field should be a String',
      'any.required': 'firstName is required',
    }),
    lastName: Joi.string().required().messages({
      'string.base': 'field should be a String',
      'any.required': 'lastName is required',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'field should be a String',
      'any.required': 'email is required',
    }),
    password: Joi.required().messages({
      'any.required': 'password is required',
    }),
   interests: Joi.optional().messages({
      'string.base': 'field should be a String',
    }),
  })
};

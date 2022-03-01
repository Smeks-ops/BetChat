const Joi = require('joi');

// use JOI t0 perfom the external validations
module.exports = {
  postSchema: Joi.object({
    content: Joi.string().messages({
      'string.base': 'field should be a String',
    }),
  })
};

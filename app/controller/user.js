/* eslint-disable no-shadow */
/* eslint-disable no-console */
const userService = require('../service/user');
const { signUpSchema } = require('../schema/user');

module.exports = {
  async createAUser(req, res) {
    let messageBody;
    let result;
    try {
      // validate the request body
      await signUpSchema.validateAsync(req.body);

      result = await userService.createAUser(req.body);

      if (result === false) {
        messageBody = 'This email already exists, kindly sign in';
        return res.status(409).send({
          error: true,
          code: 409,
          message: messageBody,
        });
      }
      if (result === null) {
        return res.status(500).send({
          error: true,
          code: 500,
          message: 'An error occurred',
        });
      }
      return res.status(201).send({
        error: false,
        code: 201,
        message: 'Successfully signed up',
        data: result.result,
        token: result.token,
      });
    } catch (error) {
      return res.status(400).send({
        message: `${error.details[0].message.replace(/['"]+/g, '')}.`,
        status: 'error',
        data: null,
      });
    }
  },

  async getMyProfile(req, res) {
    const id = req.decoded._id;
    const userData = await userService.getMyProfile(id);
    return res.status(200).send({
      error: false,
      code: 200,
      message: 'User successfully fetched',
      data: userData,
    });
  },
};

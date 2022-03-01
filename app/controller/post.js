/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const postService = require('../service/post');
const { postSchema } = require('../schema/post');

module.exports = {
  async createPost(req, res) {
    let messageBody;
    let result;
    try {
      // validate request body
      await postSchema.validateAsync(req.body);
      req.body.createdBy = req.decoded._id;

      result = await postService.savePost(req.body);

      if (result.result === null) {
        console.log('Internal server error');
        messageBody = 'Internal server error';
        return res.status(500).send({
          error: true,
          code: 500,
          message: messageBody,
        });
      }
      return res.status(201).send({
        error: false,
        code: 201,
        message: 'Successfully saved post',
        data: result,
      });
    } catch (error) {
      console.log('error', error.details[0]);
      return res.status(400).send({
        message: `${error.details[0].message.replace(/['"]+/g, '')}.`,
        status: 'error',
        data: null,
      });
    }
  },

  async getOthersPost(req, res) {
    const userId = req.decoded._id;
    const postData = await postService.getOthersPost(userId);
    return res.status(200).send({
      error: false,
      code: 200,
      message: 'post successfully fetched',
      data: postData,
    });
  },
};

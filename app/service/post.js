/* eslint-disable consistent-return */
/* eslint-disable no-console */
const postModel = require('../model/post');
const mongoose = require('mongoose');

module.exports = {

  async savePost(data) {
    try {
    const result = await postModel.create(data).then(t => t.populate('createdBy').execPopulate())
    return {
        _id: result._id,
        content: result.content,
        createdBy: {
            firstName: result.createdBy.firstName,
            lastName: result.createdBy.lastName,
            email: result.createdBy.email,
            interests: result.createdBy.interests,
        },
        createdAt: result.createdAt,
        updatedAt: result.updatedAt
    };

    } catch (e) {
      console.log('an error occurred while saving a post', e);
      return null;
    }
  },

  async getOthersPost(param) {
    try {
      return postModel.find({ user_id:{ $ne: mongoose.Types.ObjectId(param) }});
    } catch (e) {
      console.log('an error occurred while getting others post', e);
    }
  },
};

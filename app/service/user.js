/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');

const generateToken = (userData) => jwt.sign({ userData },
  process.env.SECRET_KEY, { expiresIn: 86400 });
module.exports = {

  // hash the password before saving to the db
  async hashPassword(data) {
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(data, salt, function(err, hash) {
          resolve(hash);
        });
      });
    });
  },

  async createAUser(data) {
    try {
      data.password = await this.hashPassword(data.password);
      const result = await userModel.create(data);
      const token = await generateToken(result);
      return { result, token };
    } catch (e) {
      if (e.name === 'MongoError' && e.code === 11000) {
        return false;
      }
      return e;
    }
  },

  async getMyProfile(param) {
    try {
      const userData = await userModel.findOne({ _id: param });
      const user = userData.toObject();
      delete user.password;
      return user;
    } catch (e) {
      console.log('an error occurred while getting a user', e);
    }
  },
};

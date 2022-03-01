const express = require('express');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const controller = require('../controller/user');
const jwtVerify = require('../auth/auth');

const user = express.Router();

user.use(bodyParser.json());
user.use(bodyParser.urlencoded({ extended: false }));

user.post('/sign-up', asyncHandler((req, res) => controller.createAUser(req, res)));

user.get('/my-profile', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.getMyProfile(req, res)));

module.exports = user;

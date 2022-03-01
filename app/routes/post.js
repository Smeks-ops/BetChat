const express = require('express');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const controller = require('../controller/post');
const jwtVerify = require('../auth/auth');

const post = express.Router();

post.use(bodyParser.json());
post.use(bodyParser.urlencoded({ extended: false }));

post.post('/post', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.createPost(req, res)));

post.get('/post', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.getOthersPost(req, res)));

module.exports = post;

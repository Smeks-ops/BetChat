/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const user = require('./app/routes/user');
const post = require('./app/routes/post');
const consola = require('consola');
require('dotenv').config();
require('./app/db-connection/db-connection');


const app = express();

const port = process.env.PORT || 8080;
const appName = process.env.APP_NAME;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use(cors());
app.use(logger('dev'));
app.use(user);
app.use(post);
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Default route
app.get('/', (req, res) => {
  consola.info('Welcome to the User Management System');
  return res.sendFile(__dirname + "/postmanDoc.html");
  //  return res.send('its on!!!');
});

//App Listen
app.listen(port, (res) => {
  consola.success(`${appName} is listening on ${port}`);
});

module.exports = app;

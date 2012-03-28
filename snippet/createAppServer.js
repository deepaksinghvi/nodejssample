//create an app server
var express = require('express'),    
    jade = require('jade'),
    app = module.exports = express.createServer(),
    mongoose = require('mongoose'),
    models = require('./models/model.js'),
    stylus = require('stylus'),
    db,
    TestUser;
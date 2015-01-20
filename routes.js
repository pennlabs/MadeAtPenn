var express = require('express');
var app = require('./app.js');
var Project = require('./models/projects').Project;
var Tech = require('./models/projects').Tech;
var Tag = require('./models/projects').Tag;

module.exports = function (app) {
  //controllers
	app.get("/", projects.index);
	app.post("/post", projects.create);
};

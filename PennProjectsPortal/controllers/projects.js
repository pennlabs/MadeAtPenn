var Project = require('../models/projects').Project;
var Tag = require('../models/tag').Tag;
var mongoose = require('mongoose');

exports.index = function(req, res) {
	console.log("reached");
	Project.list(function (err, projects) {
		if(err) {
			res.send(404);
		} else {
			res.render("main.ejs", {projects: projects});
		}
	})
};

exports.submit = function(req, res) {
	res.render("submit.ejs", {error: "lalal"});
}

exports.create = function(req, res) {
	console.log(req.body);
	console.log(res.body);
	var project = new Project({
		app_name : req.body.app_name,
		description : req.body.description,
		demo_link : req.body.demo,
		location : req.body.location,
		technologies : req.body.technologies,
		tags : req.body.tags,
		builders : req.body.builders,
		date : req.body.date,
		contact : req.body.contact,
		github_permis : req.body.github_permis,
		github : req.body.github,
		personal : req.body.personal,
		approved : req.body.approved,
		});

	var tags = req.body.tags.split(",");
	for (var i=0; i<tags.length; i++){
		var tag = new Tag({
		  tag: tags[0],
		  app_name: req.body.app_name
		})
		tag.save(function(err, proj) {
			if(err) {console.log(error)};
		})
	}


	project.save(function(err, proj) {
		console.log("saved");
	});

}
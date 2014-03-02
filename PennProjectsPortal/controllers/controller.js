var Project = require('../models/projects').Project;
var Tag = require('../models/tag').Tag;
var mongoose = require('mongoose');
var async = require("async");

exports.index = function(req, res) {
	console.log("reached");
	Project.list(function (err, projects) {
		if(err) {
			return res.send(404);
		} else {
			return res.render("main.ejs", {projects: projects});
		}
	})
};

exports.filter_by_tag = function(req, res) {
	console.log("filtering");
	console.log(req.params.tag);
	var tag_name = req.params.tag;
	Tag.list(tag_name, function(err, project_names) {
		if(err) {
			return res.send(404);
		} else {
			var arr_projects = []
			for(var i=0; i<project_names.length; i++) {
				if(project_names[i] !== '') {
					arr_projects.push(project_names[i].app_name);
				}
			}
			Project.queryMultipleByName(arr_projects, function(err, projects) {
				if(err) {
					return res.send(404);
				} else { 
					console.log("querying multiple projects already")

					return res.render("main.ejs", {projects: projects});
				}
			});
		}
	});
}

exports.search_tags = function(req, res) {
	console.log(req.params.tag);
	var tag_name = req.params.tag;
	Tag.search(tag_name, function(err, tag_names) {
		if(err) {
			return res.send(404);
		} else {
			console.log(tag_names);
			return res.send('options.ejs', {elements: tag_names});
		}
	});
}

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

	project.save(function(err, proj) {
		if(err) {console.log(err)}
		else {
			console.log("saved");
			var tags = req.body.tags.split(/,| /);
			async.each(tags, function(tag_name, callback) {
				var tag = new Tag({
					tag: tag_name,
					app_name : req.body.app_name
				})
				tag.save(callback());
			}, function(err) {
				if(err == null) {
					res.redirect('/');
				}
			});
		}
	});
}
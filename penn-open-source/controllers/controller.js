var Project = require('../models/projects').Project;
var Tag = require('../models/tag').Tag;
var mongoose = require('mongoose');
var async = require("async");
ObjectId = mongoose.Types.ObjectId

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


exports.admin = function(req, res) {
	console.log("reached");
	Project.list(function (err, projects) {
		if(err) {
			return res.send(404);
		} else {
			return res.render("admin.ejs", {projects: projects});
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

exports.edit = function(req, res) {
		Project.queryById(req.params.id, function(err, project) {
			return res.render("edit.ejs", {projects: project[0]});
		});
	}

exports.update_project = function(req, res) {

	updates = {
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
	}
	console.log("ID: " + req.body.id);
	var options = {upsert: true};

	Project.findOneAndUpdate({"_id": new ObjectId(req.body.id)}, updates, options, function(err, data) {
		console.log(data);
		if(!err) {
			res.send("Worked");
		} 
		res.send(err);
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

exports.search_findOne = function(req, res) {
	var id = req.params.id;
	Project.queryById(id, function(err, project){
		return res.send(project);
	});
}

exports.submit = function(req, res) {
	res.render("submit.ejs", {error: "lalal"});
}

exports.create = function(req, res) {
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
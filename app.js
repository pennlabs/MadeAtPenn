var express = require('express');
var mongoose = require("mongoose");
var path = require('path');
var app = express();
var Project = require('./models/projects.js').Project;
var User = require('./models/users.js').User;
var constants = require('./constants')

var uristring =
	process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
  constants.MONGO_URI

mongoose.connect(uristring, function(err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});

app.use(express.cookieParser());
app.use(express.session({secret: 'session'}));
app.use(express.logger("default"));
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.multipart());

//controllers
var controller = require('./controllers/controller.js');
app.use(express.static(path.join(__dirname, '/public')));

var port = Number(process.env.PORT || constants.PORT);
app.listen(port, function() {
  console.log("Listening on " + port);
});

app.get("/", controller.index);
app.get("/edit/:id", controller.edit);
app.get("/admin", controller.admin);
app.get("/submit", controller.submit);
app.get("/tag/:tag", controller.filter_by_tag);
app.get("/search/:tag", controller.search_tags);
app.get("/searchOne/:id", controller.search_findOne);
app.get("/image_upload/:id", controller.upload_page);
app.get('/faq', controller.faq);
app.get("/projects", controller.projects);
app.get("/startups", controller.startups);
app.get("/create_account_page", controller.create_account_page);
app.get("/login", controller.login);
app.get("/logout", controller.logout);

app.post("/update", controller.update_project);
app.post("/approve", controller.approve_project);
app.post("/upload", controller.upload);
app.post("/create_account", controller.create_account);
app.post("/post", controller.create);
app.post("/check_login", controller.check_login);

module.exports = app;

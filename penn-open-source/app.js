var express = require('express');
var app = express();
var Project = require('./models/projects.js').Project;
var mongoose = require("mongoose");
mongoose.connect( 'mongodb://localhost/express-projects' );
//controllers
var controller = require('./controllers/controller.js');

app.use(express.bodyParser())
   .use(express.methodOverride())
   .use(app.router);

app.use(express.logger("default"));
app.listen(3000);

app.get("/", controller.index);
app.get("/admin", controller.admin);
app.get("/submit", controller.submit);
app.get("/tag/:tag", controller.filter_by_tag);
app.post("/post", controller.create);
app.get("/search/:tag", controller.search_tags);


console.log("Listening on port 3000");
module.exports = app
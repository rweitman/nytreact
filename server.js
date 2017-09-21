var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose"); 
var Articles = require("./models/Articles");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/nytreact");
const db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.get("/api/saved", function(req, res) {
  Articles.find({}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});


app.post("/api/saved", function(req, res) {
  Articles.create({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Search");
    }
  });
});

app.delete("/api/saved", function(req, res) {
  Articles.find({
    title: req.query.title,
    date: req.query.date,
    url: req.query.url
  }).remove(function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Removed Search");
    }
  });
});


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

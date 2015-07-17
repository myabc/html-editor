var http = require('http');
var express = require('express');
var path = require('path');
var Substance = require("substance");
var fs = require('fs');
var app = express();
var port = process.env.PORT || 5000;
var browserify = require("browserify");
var sass = require('node-sass');
var babelify = require("babelify");



// Backend
// --------------------

app.get('/app.js', function (req, res, next) {
  browserify({ debug: true, cache: false })
    .transform(babelify)
    .add(path.join(__dirname, "app", "app.js"))
    .bundle()
    .on('error', function(err, data){
      console.error(err.message);
      res.send('console.log("'+err.message+'");');
    })
    .pipe(res);
});

var handleError = function(err, res) {
  console.error(err);
  res.status(400).json(err);
};

var renderSass = function(cb) {
  sass.render({
    file: path.join(__dirname, "app", "app.scss"),
    sourceMap: true,
    outFile: 'app.css',
  }, cb);
};

// use static server
app.use(express.static(__dirname));

app.get('/app.css', function(req, res) {
  renderSass(function(err, result) {
    if (err) return handleError(err, res);
    res.set('Content-Type', 'text/css');
    res.send(result.css);
  });
});

app.get('/app.css.map', function(req, res) {
  renderSass(function(err, result) {
    if (err) return handleError(err, res);
    res.set('Content-Type', 'text/css');
    res.send(result.map);
  });
});

// use static server
app.use(express.static(__dirname));

app.listen(port, function(){
  console.log("Lens running on port " + port);
  console.log("http://127.0.0.1:"+port+"/");
});


// Use static server
app.use(express.static(path.join(__dirname, "app")));

// Export app for requiring in test files
module.exports = app;
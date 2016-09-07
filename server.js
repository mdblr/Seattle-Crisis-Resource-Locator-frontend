const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const gulp = require('gulp');
require('./gulpfile');

gulp.start('config');

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

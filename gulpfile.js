'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var through2 = require('through2');
var path = require('path');

gulp.task('assets', function () {
  gulp.src('./public/*')
    .pipe(gulp.dest('./dist'));
});

gulp.task('data', function () {
  gulp.src('./data/*')
    .pipe(gulp.dest('./dist/data'));
});

gulp.task('babel', function () {
    return gulp.src('./src/app.js')
        .pipe(through2.obj(function (file, enc, next) {
            browserify(file.path)
            .transform(babelify)
            .bundle(function (err, res) {
                if (err) { return next(err); }
                file.contents = res;
                next(null, file);
            });
        }))
        .on('error', function (error) {
            console.log(error.stack);
            this.emit('end');
        })
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['assets', 'data', 'babel']);
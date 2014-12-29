"use strict";

var gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    replace = require('gulp-replace'),
    clean = require('gulp-clean'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs');

var argv = require('yargs')
  .count('notraceur')
  .alias('n', 'name')
  .argv;

function getPackageName() {
  if (!argv.name) throw new Error('Missing package name.');
  return argv.name;
}

gulp.task('clean', function () {
  return gulp.src(['base/node_modules','base/*.log', 'base-traceur/nodE_modules',
      'base-traceur/build', 'base-traceur/*.log', 'out'], {read: false})
    .pipe(clean());
});

gulp.task('jscs', function () {
  return gulp
   .src(['*.js'])
   .pipe(jscs());
});

gulp.task('jshint', function () {
  return gulp
   .src(['*.js'])
   .pipe(jshint())
   .pipe(jshint.reporter('jshint-stylish'))
   .pipe(jshint.reporter('fail'));
});

gulp.task('lint',['jshint','jscs']);

gulp.task('rimraf-package', function () {
  var packageName = getPackageName();
  return gulp.src('./out/' + packageName, {read: false})
    .pipe(rimraf());
});

gulp.task('create-package', ['rimraf-package'], function () {
  var packageName = getPackageName();
  return gulp.src(['**/*','**/.*'], {cwd: argv.notraceur ? 'base' : 'base-traceur'})
    .pipe(replace(/new-appium-package/g, packageName))
    .pipe(gulp.dest('./out/' + packageName));
});

gulp.task('default', ['lint', 'clean']);

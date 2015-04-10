"use strict";

var gulp = require('gulp'),
    replace = require('gulp-replace'),
    vinylPaths = require('vinyl-paths'),
    del = require('del'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs');

var argv = require('yargs')
  .count('nobabel')
  .alias('n', 'name')
  .argv;

function getPackageName() {
  if (!argv.name) throw new Error('Missing package name.');
  return argv.name;
}

gulp.task('clean', function () {
  return gulp.src(['base/node_modules','base/*.log', 'base-babel/node_modules',
      'base-babel/build', 'base-babel/*.log', 'out'], {read: false})
    .pipe(vinylPaths(del));
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

gulp.task('del-package', function () {
  var packageName = getPackageName();
  return gulp.src('./out/' + packageName, {read: false})
    .pipe(vinylPaths(del));
});

gulp.task('create-package', ['del-package'], function () {
  var packageName = getPackageName();
  return gulp.src(['**/*','**/.*'], {cwd: argv.nobabel ? 'base' : 'base-babel'})
    .pipe(replace(/new-appium-package/g, packageName))
    .pipe(gulp.dest('./out/' + packageName));
});

gulp.task('default', ['lint', 'clean']);

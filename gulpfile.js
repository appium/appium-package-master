"use strict";

var gulp = require('gulp'),
    replace = require('gulp-replace'),
    vinylPaths = require('vinyl-paths'),
    del = require('del');

var argv = require('yargs')
  .count('nobabel')
  .alias('n', 'name')
  .argv;

function getPackageName() {
  if (!argv.name) throw new Error('Missing package name.');
  return argv.name;
}

gulp.task('lint', function lint (done) {
  // TODO: make lint task
  done();
});

gulp.task('clean', function () {
  return gulp.src(['base/node_modules','base/*.log', 'base-babel/node_modules',
      'base-babel/build', 'base-babel/*.log', 'out'], {read: false})
    .pipe(vinylPaths(del));
});

gulp.task('package:delete', function deletePackage () {
  var packageName = getPackageName();
  return gulp.src('./out/' + packageName, {read: false, allowEmpty: true})
    .pipe(vinylPaths(del));
});

gulp.task('package:create', gulp.series('package:delete', function createPackage () {
  var packageName = getPackageName();
  return gulp.src(['**/*','**/.*'], {cwd: argv.nobabel ? 'base' : 'base-babel'})
    .pipe(replace(/new-appium-package/g, packageName))
    .pipe(gulp.dest('./out/' + packageName));
}));

gulp.task('default', gulp.series(['lint', 'clean']));

'use strict';

const gulp = require('gulp');
const boilerplate = require('appium-gulp-plugins').boilerplate.use(gulp);
const replace = require('gulp-replace');
const debug = require('gulp-debug');
const vinylPaths = require('vinyl-paths');
const del = require('del');

const argv = require('yargs')
  .count('nobabel')
  .alias('n', 'name')
  .argv;

boilerplate({
  build: 'appium-package-master',
  transpile: false,
  test: false,
});

function getPackageName () {
  if (!argv.name) {
    throw new Error('Missing package name.');
  }
  return argv.name;
}

gulp.task('package:clean', function () {
  return gulp
    .src([
      'base/node_modules', 'base/*.log', 'base-babel/node_modules',
      'base-babel/build', 'base-babel/*.log', 'out',
    ], {read: false})
    .pipe(debug())
    .pipe(vinylPaths(del));
});

gulp.task('package:delete', function deletePackage () {
  const packageName = getPackageName();
  return gulp.src('./out/' + packageName, {read: false, allowEmpty: true})
    .pipe(debug())
    .pipe(vinylPaths(del));
});

gulp.task('package:create', gulp.series('package:delete', function createPackage () {
  const packageName = getPackageName();
  return gulp.src(['**/*', '**/.*'], {cwd: argv.nobabel ? 'base' : 'base-babel'})
    .pipe(debug())
    .pipe(replace(/new-appium-package/g, packageName))
    .pipe(gulp.dest('./out/' + packageName));
}));

gulp.task('default', gulp.series(['lint', 'package:clean']));

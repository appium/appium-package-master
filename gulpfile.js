var gulp = require('gulp'),
    rename = require("gulp-rename"),
    rimraf = require('gulp-rimraf'),
    replace = require('gulp-replace');

var packageName;
function getPackageName() {
  if(!packageName) {
    var argv = require('yargs').alias('n', 'name').demand('name').argv;
    packageName = argv['name'];
  }
  return packageName;
}

gulp.task('rimraf-package', function() {
  var packageName = getPackageName();
  return gulp.src('./out/' + packageName, {read: false})
    .pipe(rimraf());
});

gulp.task('create-package', ['rimraf-package'], function() {
  var packageName = getPackageName();
  return gulp.src('**', {cwd:'base'})
    .pipe(replace(/new-appium-package/g, packageName))
    .pipe(gulp.dest('./out/' + packageName));
});


var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


gulp.task('uglifyScripts', function() {
  gulp.src(['bower_components/jquery/dist/jquery.min.js','bower_components/angular/angular.min.js','bower_components/angular-resource/angular-resource.min.js','bower_components/bootstrap/dist/js/bootstrap.min.js'])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('public/vendors/'))
});

gulp.task('uglifyCss', function() {
  gulp.src(['bower_components/bootstrap/dist/css/bootstrap-theme.min.css','bower_components/bootstrap/dist/css/bootstrap.min.css'])
    .pipe(concat('lib.css'))
    .pipe(gulp.dest('public/styles/'))
});


gulp.task('compress', function() {
  gulp.src('public/vendors/lib.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/vendors/lib.min.js'))
});
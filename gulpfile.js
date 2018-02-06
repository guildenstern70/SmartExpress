/*

    A2A N2
    gulpfile.js 
    Task Automation

 */

var gulp = require('gulp');
var less = require('gulp-less');
var coffeescript = require('gulp-coffeescript');
var gutil = require('gulp-util');
var $    = require('gulp-load-plugins')();

var sassPaths = [
    'bower_components/normalize.scss/sass',
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src'
];

gulp.task('coffee', function() {
    gulp.src('./public/js/*.coffee')
      .pipe(coffeescript({bare: true}).on('error', gutil.log))
      .pipe(gulp.dest('./public/js'));
  });

gulp.task('sass', function() {
    return gulp.src('scss/app.scss')
        .pipe($.sass({
            includePaths: sassPaths,
            outputStyle: 'compressed' // if css compressed **file size**
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('public/css'));
});

gulp.task('less', function() {
    gulp.src('public/css/*.less')
        .pipe(less())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});

gulp.task('build', ['coffee','sass','less']);

// Default task watches LESS files for auto-transpiling
gulp.task('default', ['less'], function() {
    gulp.watch(['public/css/*.less'], ['less']);
});
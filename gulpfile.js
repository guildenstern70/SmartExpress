/*

    A2A N2
    gulpfile.js
    Task Automation
 */

const gulp = require('gulp');
const less = require('gulp-less');
const babel = require('gulp-babel');

// Less
gulp.task('less', (done) => {
    return gulp
        .src('public/css/*.less')
        .pipe(less())
        .pipe(gulp.dest('public/css'));
});

// Babel
gulp.task('babel', (done) => {
    return gulp
        .src(['client-js/*.js', '!js/thirdparty/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('public/js'));
});

// Default Build Taske
gulp.task('build', gulp.parallel(
    'less',
    'babel'
));

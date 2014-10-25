var gulp = require('gulp');
var zip = require('gulp-zip');
var livereload = require('gulp-livereload');
var del = require('del');
var less = require('gulp-less');

gulp.task('default', function() {

    // place code for your default task here
});

gulp.task('clean', function() {
    del(['build', 'dist']);
});

gulp.task('build', function() {
    gulp.src(['bower_components/angular/angular.js', 'bower_components/jquery/dist/jquery.js', 'bower_components\less\dist\less-1.7.5.js'])
        .pipe(gulp.dest('build/js'));
    gulp.src(['src/**/*', '!src/**/*.less', '!src/**/*.js'])
        .pipe(gulp.dest('build'));
    gulp.src(['src/**/*.less'])
        .pipe(less())
        .pipe(gulp.dest('build/css'));
    gulp.src(['src/**/*.js'])
        .pipe(gulp.dest('build/js'));
});

gulp.task('build-otf', function() {
    gulp.watch('src/**/*', ['build']);
    livereload.listen();
    gulp.watch('build/**/*').on('change', livereload.changed);
});

gulp.task('zip', function() {
    gulp.src('build/**/*')
        .pipe(zip('demo.zip'))
        .pipe(gulp.dest("dist"));
});

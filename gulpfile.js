var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('default', function() {

    // place code for your default task here
});

gulp.task('build', function() {
    gulp.src(['bower_components/angular/angular.js', 'bower_components/jquery/dist/jquery.js'])
        .pipe(gulp.dest('build/js'));
    gulp.src(['src/**/*'])
        .pipe(gulp.dest('build'));
});

gulp.task('build-otf', function() {
    gulp.watch('src/**/*', ['build']);
});

gulp.task('zip', function() {
    gulp.src('build/**/*')
        .pipe(zip('demo.zip'))
        .pipe(gulp.dest("dist"));
});

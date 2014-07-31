var gulp = require('gulp')
var concat = require('gulp-concat')

gulp.task('concat-names', function() {
    gulp.src('./lib/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'))
});
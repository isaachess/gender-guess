var gulp = require('gulp')
var concat = require('gulp-concat')
var fs = require('fs')

gulp.task('concat-names', function() {
    gulp.src(['./names/*.txt'])
        .pipe(concat('combined.csv'))
        .pipe(gulp.dest('./names/'))
})
var gulp = require('gulp')
var typescript = require('gulp-tsc')
var concat = require('gulp-concat')
var csv2json = require('gulp-csv2json')
var rename = require('gulp-rename')
var fs = require('fs')

gulp.task('concat-names', function() {
    gulp.src(['./names/*.txt'])
        .pipe(concat('combined.csv'))
        .pipe(gulp.dest('./names/'))
})

gulp.task('toJson', function() {
    gulp.src('names/combined1.csv')
        .pipe(csv2json())
        .pipe(rename({extname: '.json'}))
        .pipe(gulp.dest('./names/'))
})

gulp.task('watch', function() {
    gulp.watch('./*.ts')
})

gulp.task('build', function() {
    gulp.src(['*.ts'])
    .pipe(typescript())
    .pipe(gulp.dest('./'))
})
var gulp = require('gulp')
var typescript = require('gulp-tsc')
var concat = require('gulp-concat')
var csv2json = require('gulp-csv2json')
var rename = require('gulp-rename')
var fs = require('fs')
var Q = require('q')

gulp.task('concat-names', function() {
    gulp.src(['./names/years_used/*.txt'])
        .pipe(concat('combined.csv'))
        .pipe(gulp.dest('./names/years_used/'))
})

gulp.task('toJsonFemale', function() {
    toJsonNames('finalFemaleNames')
})

gulp.task('toJsonMale', function() {
    toJsonNames('finalMaleNames')
})

gulp.task('watch', function() {
    gulp.watch('./genderguess.ts', ['build'])
})

gulp.task('build', function() {
    var typescriptOptions = {
        emitError: false,
        module: 'commonjs',
    }
    gulp.src(['./*.ts', './scripts/*.ts', './names/final_names/*.ts'])
    .pipe(typescript(typescriptOptions))
    .pipe(gulp.dest('./'))
})

function toJsonNames(type) {
    gulp.src('names/final_names/'+type+'.csv')
        .pipe(csv2json())
        .pipe(rename({extname: '.ts'}))
        .pipe(gulp.dest('./names/final_names/'))
}
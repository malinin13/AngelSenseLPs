'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var tinypng = require('gulp-tinypng');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');


// server connect
gulp.task('connect', function() {
	connect.server({
		port: 8010,
		livereload: true
	});
});

gulp.task('sass', function () {
	gulp.src('app/scss/app.scss')
		.pipe(sass())
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest('dist/css'))
		.pipe(connect.reload());
});

gulp.task('html', function () {
	return gulp.src('*.html')
		.pipe(connect.reload());
});

gulp.task('tinypng', function () {
	gulp.src('dist/imgs/**/*.png')
		.pipe(tinypng('3XGRJqvQEEQmEeWpUvry_-rtKgxPMk09'))
		.pipe(gulp.dest('dist/imgs/compressed'));
});

gulp.task('watch', function () {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('*.html', ['html']);
});

gulp.task('default', ['connect' ,'watch', 'html', 'sass']);

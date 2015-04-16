/*global -$ */
'use strict';
var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var mainBowerFiles = require('main-bower-files');

//styles
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer-core');
// jshint
var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
// watch serve
var url = require('url'); // https://www.npmjs.org/package/url
var proxy = require('proxy-middleware'); // https://www.npmjs.org/package/proxy-middleware
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
  srcStyles : './public/app/styles/app.less',
  srcsStyles: './public/app/styles/**/*.less',
  srcJs     : './public/app/scripts/**/*.js',
  srcFonts  : './public/app/fonts/**/*',

  tmpStyles : './public/.tmp/styles',
  tmpFonts  : './public/.tmp/fonts',
};

gulp.task('styles', function () {
  return gulp.src(paths.srcStyles)
    .pipe(less())
    .pipe(sourcemaps.init())
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 1 version']
      })
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.tmpStyles))
    .pipe(reload({stream: true}));
});

gulp.task('fonts', function () {
  return gulp.src(paths.srcFonts)
    .pipe(gulp.dest(paths.tmpFonts));
});

gulp.task('jshint', function () {
  return gulp.src(paths.srcJs)
    .pipe(reload({stream: true, once: true}))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpif(!browserSync.active, jshint.reporter('fail')));
});

gulp.task('serve', ['styles', 'fonts'], function () {
 	browserSync({
		proxy: "http://localhost:1337"
	});

	// watch for changes
	gulp.watch([
    	'./public/app/**/*'
	]).on('change', reload);

	gulp.watch(paths.srcsStyles, ['styles'], reload);
	gulp.watch(paths.srcFonts, ['fonts'], reload);
});
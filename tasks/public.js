/*global -$ */
'use strict';
var gulp = require('gulp');
var rename = require('gulp-rename');
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
// images
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
// watch serve
var url = require('url'); // https://www.npmjs.org/package/url
var proxy = require('proxy-middleware'); // https://www.npmjs.org/package/proxy-middleware
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = {
  srcStyles         : './public/app/styles/app.less',
  srcsStyles        : './public/app/styles/**/*.less',
  srcJs             : './public/app/scripts/**/*.js',
  srcFonts          : './public/app/fonts/**/*',
  srcSvg            : './public/app/images/svg/**/*.svg',
  srcWeatherImages  : './public/app/images/weather/**/*.svg',


  tmpWeatherImages  : './public/.tmp/images/weather',
  tmpStyles         : './public/.tmp/styles',
  tmpJs             : './public/.tmp/scripts',
  tmpFonts          : './public/.tmp/fonts',
  tmpSvg            : './public/.tmp/images/svg',
  tmpSvgAdmin       : './admin/.tmp/images/svg',
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

gulp.task('scripts', function () {
  return gulp.src(paths.srcJs)
    .pipe(gulp.dest(paths.tmpJs));
});
gulp.task('imagesWeather', function () {
  return gulp.src(paths.srcWeatherImages)
    .pipe(gulp.dest(paths.tmpWeatherImages));
});

gulp.task('svgstore', function () {
    return gulp
        .src(paths.srcSvg, { base: 'src/svg' })
        .pipe(svgmin({
          plugins: [{
                removeDoctype: false
            }, {
                removeComments: false
            }]
        }))
        .pipe(rename({prefix: 'icon-'}))
        .pipe(rename(function (path) {
            var name = path.dirname.split(path.sep);
            name.push(path.basename);
            path.basename = name.join('-');
        }))
        .pipe(svgstore())

        .pipe(gulp.dest(paths.tmpSvg))
        .pipe(gulp.dest(paths.tmpSvgAdmin));
});

gulp.task('serve', ['styles', 'svgstore','scripts','imagesWeather', 'fonts'], function () {
 	browserSync({
		proxy: "http://localhost:1337"
	});
  gulp.watch(paths.srcsStyles, ['styles'], reload);
  gulp.watch(paths.srcJs, ['scripts'], reload);
  gulp.watch(paths.srcFonts, ['fonts'], reload);
  gulp.watch('./app/templates/**/*', ['styles'], reload);
	// watch for changes
	// gulp.watch([
 //    	'./public/app/**/*'
	// ]).on('change', reload);


});
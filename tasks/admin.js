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
  srcStyles : './admin/app/styles/app.less',
  srcsStyles: './admin/app/styles/**/*.less',
  srcJs     : './admin/app/scripts/**/*.js',
  srcFonts  : './admin/app/fonts/**/*',

  tmpStyles : './admin/.tmp/styles',
  tmpFonts  : './admin/.tmp/fonts',
  indexHtml : './admin/app/index.html',
  bowerJson : './admin/bower.json',
  bowerDir  : './admin/bower_components'

};

gulp.task('adminstyles', function () {
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

gulp.task('adminfonts', function () {
  return gulp.src(mainBowerFiles({
    paths: {
      bowerDirectory: paths.bowerDir,
      bowerJson: paths.bowerJson
    },
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat(paths.srcFonts))
    .pipe(gulp.dest(paths.tmpFonts));
});

gulp.task('adminjshint', function () {
  return gulp.src(paths.srcJs)
    .pipe(reload({stream: true, once: true}))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpif(!browserSync.active, jshint.reporter('fail')));
});

// inject bower components
gulp.task('adminwiredep', function () {
  gulp.src(paths.indexHtml)
    .pipe(wiredep({
      directory : paths.bowerDir,
      bowerJson : paths.bowerJson,
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('adminserve', ['adminstyles', 'adminfonts'], function () {
  var proxyOptions = url.parse('http://localhost:1337/api');
  proxyOptions.route = '/api';

  var socketOptions = url.parse('http://localhost:1337/socket.io');
  socketOptions.route = '/socket.io';

  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['admin/.tmp', 'admin/app'],
      middleware: [proxy(proxyOptions), proxy(socketOptions)],
      routes: {
        '/bower_components': paths.bowerDir
      }
    }
  });

  // watch for changes
  gulp.watch([
    './admin/app/**/*'
  ]).on('change', reload);

  gulp.watch(paths.srcsStyles, ['adminstyles']);
  gulp.watch(paths.srcFonts, ['adminfonts']);
  gulp.watch(paths.bowerJson, ['adminwiredep', 'adminfonts']);
});



// gulp.task('adminhtml', ['styles'], function () {
//   var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

//   return gulp.src('app/*.html')
//     .pipe(assets)
//     .pipe($.if('*.js', $.uglify()))
//     .pipe($.if('*.css', $.csso()))
//     .pipe(assets.restore())
//     .pipe($.useref())
//     .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
//     .pipe(gulp.dest('dist'));
// });

// gulp.task('images', function () {
//   return gulp.src('app/images/**/*')
//     .pipe($.cache($.imagemin({
//       progressive: true,
//       interlaced: true,
//       // don't remove IDs from SVGs, they are often used
//       // as hooks for embedding and styling
//       svgoPlugins: [{cleanupIDs: false}]
//     })))
//     .pipe(gulp.dest('dist/images'));
// });

// gulp.task('fonts', function () {
//   return gulp.src(require('main-bower-files')({
//     filter: '**/*.{eot,svg,ttf,woff,woff2}'
//   }).concat('app/fonts/**/*'))
//     .pipe(gulp.dest('.tmp/fonts'))
//     .pipe(gulp.dest('dist/fonts'));
// });

// gulp.task('extras', function () {
//   return gulp.src([
//     'app/*.*',
//     '!app/*.html'
//   ], {
//     dot: true
//   }).pipe(gulp.dest('dist'));
// });

// gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));



// gulp.task('astraserve', ['astrastyles'], function () {
//   browserSync({
//     proxy: "http://localhost:1337"
//   });

//   gulp.watch('app/styles/**/*.less', ['astrastyles'],browserSync.reload);
// });


// gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras'], function () {
//   return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
// });

// gulp.task('default', ['clean'], function () {
//   gulp.start('build');
// });

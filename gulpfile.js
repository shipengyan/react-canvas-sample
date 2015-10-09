var gulp = require('gulp');
var del = require('del');
var connect = require('gulp-connect');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');


var config = {
  port: process.env.PORT || 8080,
  reloadPort: process.env.RELOAD_PORT || 35729,

  BUILD_DIR: './build'
};

gulp.task('clean', function () {
  del(['build']);
});

gulp.task('html', function () {
  gulp.src('./src/index.html').pipe(gulp.dest(config.BUILD_DIR));
});

gulp.task('css', function () {
  gulp.src('./src/index.css').pipe(gulp.dest(config.BUILD_DIR))
});

gulp.task('build', function () {
  return gulp.src(webpackConfig.entry.index[0])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(config.BUILD_DIR));
});

gulp.task('serve', function () {
  connect.server({
    root: config.BUILD_DIR,
    port: config.port,
    livereload: {
      port: config.reloadPort
    }
  });
});

gulp.task('reload-js', function () {
  return gulp.src('./build/*.js')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./build/*.js'], ['reload-js']);
});

gulp.task('default', ['clean', 'html', 'css', 'build', 'serve', 'watch']);

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

// you can use gulp.series() in gulp 4.0

gulp.task('clean', function (cb) {
  del([config.BUILD_DIR], cb);
});

gulp.task('html', ['clean'], function () {
  gulp.src('./src/index.html').pipe(gulp.dest(config.BUILD_DIR));
});

gulp.task('css', ['clean'], function () {
  gulp.src('./src/index.css').pipe(gulp.dest(config.BUILD_DIR))
});

gulp.task('build', ['clean'], function () {
  gulp.src(webpackConfig.entry.index[0])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(config.BUILD_DIR));
});

gulp.task('serve', ['clean'], function () {
  connect.server({
    root: config.BUILD_DIR,
    port: config.port,
    livereload: {
      port: config.reloadPort
    }
  });
});

gulp.task('reload-js', ['clean'], function () {
  gulp.src('./build/*.js')
    .pipe(connect.reload());
});

gulp.task('watch', ['clean'], function () {
  gulp.watch(['./build/*.js'], ['reload-js']);
});

gulp.task('default', ['clean', 'html', 'css', 'build', 'serve', 'watch']);

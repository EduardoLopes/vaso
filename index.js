#!/usr/bin/env node

const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const gutil = require('gulp-util');
const fs = require('fs');
var path = require('path');
let reload_count = 0;

var args = process.argv.slice(2);

gulp.task('server', function() {

  browserSync({
    server: {
      baseDir: './src',
    },
    startPath: '/',
    injectChanges: true,
    open: false
  });

  gulp.watch(['./src/**/*']).on('change', function(){

    reload_count++;
    gutil.log("Reloaded " + gutil.colors.magenta(reload_count) + ' times');
    reload();

  });

});

if(args[0] == "create"){

  if (!fs.existsSync(args[1])){

    gulp.src(path.dirname(fs.realpathSync(__filename)) + "/empty/**/*")
      .pipe(gulp.dest(args[1] + "/src"))

  } else {
    console.log(args[1] + " already exists");
  }

} else {

  gulp.start('server');

}
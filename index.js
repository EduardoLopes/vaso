#!/usr/bin/env node

const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const gutil = require('gulp-util');
const fs = require('fs');
const path = require('path');
const replace = require('gulp-replace');
const rename = require("gulp-rename");
const watch = require('gulp-watch');

let reload_count = 0;

var args = process.argv.slice(2);

function server_task() {

  build_task();

  browserSync({
    server: {
      baseDir: './',
    },
    startPath: '/',
    injectChanges: true,
    open: false
  });

  gulp.watch(['./bundle.js', './index.html']).on('change', refresh);
  watch('./css/**/*.css', refresh);


  watch('./js/**/*.js', function () {

    build_task();

  });

}

function build_task() {

  gulp.src('./js/main.js')
    .pipe(replace(/\/\/js: (.*)/g, function(match) {

      let regex = /\/\/js: (.*)/;
      let result = regex.exec(match);

      let contents = "//" + result[1] + " not found";

      if(fs.existsSync(result[1])){

        contents = fs.readFileSync(result[1], 'utf8');

      } else {

        console.log(contents);

      }

      return contents;

    }))
    .pipe(rename("bundle.js"))
    .pipe(gulp.dest('./'));

}

function refresh(){

  reload_count++;
  gutil.log("Reloaded " + gutil.colors.magenta(reload_count) + ' times');
  reload();

}

gulp.task('server', server_task);
gulp.task('build', build_task);

if(args[0] == "create"){

  if (!fs.existsSync(args[1])){

    gulp.src(path.dirname(fs.realpathSync(__filename)) + "/empty/**/*")
      .pipe(gulp.dest(args[1]))

  } else {
    console.log(args[1] + " already exists");
  }

} else if(args[0] == "build"){

  build_task();

} else {

  server_task();

}
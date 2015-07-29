var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsd = require('gulp-tsd');
var header = require('gulp-header');
var thrift = require('gulp-typescript-thrift');

var tsProject = ts.createProject({
    declarationFiles: true,
    noExternalResolve: false,
    sortOuptut: true,
    module: "commonjs"
});

gulp.task("ts-compile", ['thrift'], function() {
    var tsResult = gulp.src(['src/*.ts'])
                       .pipe(ts(tsProject))
    tsResult.dts.pipe(gulp.dest('build'));
    return tsResult.js
                   .pipe(header('#!/usr/bin/env node\n'))
                   .pipe(gulp.dest('build'));
});

gulp.task("thrift", function ()
   {
        var tStream = new thrift({
            generator: 'js:node'
        });
        gulp.src('./CorfuDB/src/main/thrift/*.thrift')
            .pipe(tStream)
            .pipe(gulp.dest('./lib'));
        tStream.definitions.pipe(gulp.dest('typings/gen-thrift'));
    }
);

gulp.task("ts-typings", function(cb)
          {
              tsd({
                  command: 'reinstall',
                  config: './tsd.json'
              }, cb);
          });

gulp.task("clean", function(cb) {
   del(['build','typings'], cb);
});

gulp.task('default', function()
          {
              gulp.start('ts-compile');
          })

gulp.task('watch', function() {
    gulp.watch('src/*.ts', ['ts-compile']);
})

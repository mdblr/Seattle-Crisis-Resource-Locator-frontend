'use strict';

const gulp = require('gulp');
const gulpConfig = require('gulp-ng-config');

let configureSetup = {
  createModule: false,
  constants : {
    googKey : process.env.googKey
  }
};

gulp.task('config', () => {
  gulp.src('config.json')
    .pipe(gulpConfig('scrl-app', configureSetup))
    .pipe(gulp.dest('features'));
});

'use strict';

const gulp = require('gulp');
const gulpConfig = require('ng-gulp-config');

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

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-spawn-mocha');
var runSequence = require('run-sequence');
var cache = require('gulp-cached');

/**
 * Testing
 */

gulp.task('test', function() {
  return gulp.src('test/**/*.test.js')
    .pipe(mocha({
      istanbul: { report: 'none' }
    }));
});

/**
 * Linting
 */

gulp.task('eslint-src', function () {
  return gulp.src('src/**/*.js')
    .pipe(cache('eslint', { optimizeMemory: true }))
    .pipe(eslint({
      configFile: '.eslintrc.js',
      quiet: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('eslint-test', function () {
  return gulp.src('test/**/*.js')
    .pipe(cache('eslint', { optimizeMemory: true }))
    .pipe(eslint({
      configFile: '.eslintrc.js',
      quiet: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 * Watch
 */

gulp.task('watch-src', function() {
  gulp.watch('src/**/*.js', function() {
    runSequence.call(this, ['eslint-src', 'test']);
  });
});

gulp.task('watch-test', function() {
  gulp.watch('test/**/*.js', function() {
    runSequence.call(this, ['eslint-test', 'test']);
  });
});

/**
 * Tasks
 */

gulp.task('watch', ['watch-src', 'watch-test']);
gulp.task('default', ['watch']);

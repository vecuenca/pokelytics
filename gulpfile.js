var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;

var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

require('babel/register');
var mocha = require('gulp-mocha');
var gulpConfig = require('./gulp.config.json');

var taskConstants = {
	"prod": argv.prod
};

/*
  Styles Task
*/
gulp.task('styles',function() {
  // move over fonts

  gulp.src('css/fonts/**.*')
    .pipe(gulp.dest(gulpConfig.build.path + '/css/fonts'))

  // Compiles CSS
  gulp.src('css/style.styl')
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest(gulpConfig.build.path + '/css/'))
    .pipe(reload({stream:true}))
});

/*
  Images
*/
gulp.task('images',function(){
  gulp.src('css/images/**')
    .pipe(gulp.dest(gulpConfig.build.path + '/css/images'))
});

/*
  Browser Sync
*/
gulp.task('browser-sync', function() {
    browserSync.init({
        // we need to disable clicks and forms for when we test multiple rooms
        proxy: "http://homestead.app/",

        // middleware : [ historyApiFallback() ],
        ghostMode: false
    });
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
  var props = {
    entries: ['./scripts/' + file],
    debug : true,
    transform:  [babelify.configure({stage : 0 })]
  };

  // watchify() if watch requested, otherwise run browserify() once 
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

function rebundle() {
	var stream = bundler.bundle();
	return stream
		.on('error', handleErrors)
		.pipe(source(file))
		.pipe(gulp.dest(gulpConfig.build.path))
		.pipe(gulpif(taskConstants.prod, buffer()))
		.pipe(gulpif(taskConstants.prod, uglify()))
		.pipe(gulpif(taskConstants.prod, rename('main.js')))
		.pipe(gulpif(taskConstants.prod, gulp.dest(gulpConfig.build.path)))
		.pipe(reload({stream:true}))
  }
  
  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('scripts', function() {
  return buildScript('main.js', false); // this will once run once because we set watch to false
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['images','styles','scripts','browser-sync'], function() {
  gulp.watch('css/**/*', ['styles']); // gulp watch for stylus changes
  return buildScript('main.js', true); // browserify watch for JS changes
});

gulp.task('build', ['images', 'styles', 'scripts']);
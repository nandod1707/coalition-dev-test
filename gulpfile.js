/*

Run these commands

## if the project is already set up and running:
npm install

## if you check package.json and there aren't dependencies listed ( there should be no reason to do this )
npm install gulp
npm install bower --save-dev
npm install gulp-imagemin --save-dev
npm install gulp-concat --save-dev
npm install gulp-plumber --save-dev
npm install gulp-autoprefixer --save-dev
npm install gulp-minify-css --save-dev
npm install gulp-uglify --save-dev
npm install gulp-rename --save-dev
npm install gulp-notify --save-dev
npm install gulp-include --save-dev
npm install gulp-ruby-sass --save-dev
npm install gulp-watch --save-dev
npm install gulp-sourcemaps --save-dev
npm install gulp-newer --save-dev

## always ( to compile/watch/etc )
bower
gulp

*/


// Config for theme
var settings    = require('./package.json'),
    themePath   = './assets/';

// Gulp Nodes
var gulp = require( 'gulp' ),
	plumber = require( 'gulp-plumber' ),
	watch = require( 'gulp-watch' ),
	minifyCSS = require('gulp-minify-css'),
	uglify = require( 'gulp-uglify' ),
	rename = require( 'gulp-rename' ),
	notify = require( 'gulp-notify' ),
	include = require( 'gulp-include' ),
	sass = require( 'gulp-sass' ),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	sourcemaps = require('gulp-sourcemaps'),
	newer = require('gulp-newer');

sass.compiler = require('node-sass');

// Error Handling
var onError = function( err ) {
	console.log( 'An error occurred:', err.message );
	this.emit( 'end' );
};

gulp.task('scss', function () {
	return gulp.src(themePath + 'style.scss')
	    .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 4 version'))
		.pipe(minifyCSS({keepBreaks:false}))
	  	.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(themePath))
		.pipe(notify({ message: 'Scss task complete' }));
});


gulp.task('scripts', function() {
	return gulp.src( [themePath + 'js/libs/**/*.js', themePath + 'js/development/**/*.js'] )
		.pipe(concat('js/scripts.js'))
		.pipe(gulp.dest(themePath))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest(themePath))
		.pipe(notify({ message: 'Scripts task complete' }));
});

// Watch task -- this runs on every save.
gulp.task( 'watch', function() {

	// Watch all .scss files
	gulp.watch( themePath + 'scss/**/**/*.*css', [ 'scss' ] );
	// Watch main style.scss file for new inclusions
	gulp.watch( themePath + 'style.scss', [ 'scss' ] );

	// Watch js files
	gulp.watch( themePath + 'js/development/**/*.js', [ 'scripts' ] );

});


// Default task -- runs scss and watch functions
gulp.task( 'default', ['scripts', 'scss', 'watch'], function() {
});

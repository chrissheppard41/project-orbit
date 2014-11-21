var	gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglifyjs'),
	concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    ngAnnotate = require('gulp-ng-annotate'),
    steamify = require('gulp-streamify'),
    optipng = require('imagemin-optipng');


gulp.task('css', function() {
	gulp.src('css/src/sass/*.scss')
		.pipe(sass({ style: 'expanded' }).on('error', function(err) {
			console.log(err);
		}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(minifycss())
		.pipe(concat("build.min.css", {newLine: ''}))
		.pipe(gulp.dest('css'));
});

gulp.task('js', function() {
	gulp.src([
		'js/src/*/*.js',
		'js/src/operation.js',
		'js/src/init.js'
	])
		.pipe(ngAnnotate().on('error', function(err) {
			//console.log(err);
		}))
		.pipe(steamify(uglify('build.min.js', {
			mangle: true,
			outSourceMap: true
		})).on('error', function(err) {
			//console.log(err);
		}))
		.pipe(gulp.dest('js'));
});

gulp.task('lint', function() {
	gulp.src('js/src/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('concat', function() {
	gulp.src([
		"js/libs/three.min.js",
		"js/libs/OrbitControls.js",
		"js/libs/Detector.js",
		"js/libs/stats.min.js"
	])
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('image', function () {
    gulp.src('img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [optipng()]
        }))
        .pipe(gulp.dest('img'));
});

gulp.task('watch', function() {
	//	Watch the sass files
	gulp.watch('css/src/sass/**/*.scss', ['css']);
	gulp.watch('js/src/**/*.js', ['lint', 'js']);

});

gulp.task('default', ['image', 'css', 'js'], function() {
});
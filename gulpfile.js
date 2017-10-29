var gulp = require('gulp');

/* gUtil
 * npm plugin: gulp-util
 * create console Log
 */
var gutil = require('gulp-util');

/* Sass
 * npm plugin: gulp-sass
 * Convert scss to css.
 * Check http://sass-lang.com/documentation/file.SASS_REFERENCE.html
 */
var sass = require('gulp-sass');

/* CoffeeScript
 * npm plugin: gulp-coffee
 * CoffeeScript is a little language that compiles into JavaScript
 */
var coffee = require('gulp-coffee');

/* Connect
 * npm plugin: gulp-connect
 * Gulp plugin to run a webserver (with LiveReload)
 * gulp-connect is sponsored by JetBrains!
 */
var connect = require('gulp-connect');

/* Uglify
 * npm plugin: gulp-uglify
 * Minify JavaScript
 */
var uglify = require('gulp-uglify');

/* Concat
 * npm plugin: gulp-concat
 * Join many files into a single one
 */
var concat = require('gulp-concat');

var coffeeSources = ['scripts/hello.coffee'],
jsSources = ['scripts/*.js'],
sassSources = ['styles/*.scss'],
htmlSources = ['*.html'],
outputDir = 'assets';

gulp
.task('log', function () {
	gutil.log('==> My Log Task <==');
})
.task('html', function () {
	gulp.src(htmlSources)
	.pipe(gulp.dest(outputDir))
	.pipe(connect.reload())
})
.task('sass', function () {
	gulp.src(sassSources)
	.pipe(sass({
			style: 'expanded'
		}))
	.on('error', gutil.log)
	.pipe(gulp.dest(outputDir))
	.pipe(connect.reload())
})
.task('coffee', function () {
	gulp.src(coffeeSources)
	.pipe(coffee({
			bare: true
		}))
	.on('error', gutil.log)
	.pipe(gulp.dest('scripts'))
})
.task('js', function (cb) {
	gulp.src(jsSources)
	.pipe(uglify())
	.pipe(concat('script.js'))
	.pipe(gulp.dest(outputDir))
	.pipe(connect.reload())
})
.task('watch', function () {
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch(sassSources, ['sass']);
	gulp.watch(htmlSources, ['html']);
})
.task('connect', function () {
	connect.server({
		root: './assets',
		livereload: true
	})
})
.task('default', ['html', 'coffee', 'js', 'sass', 'connect', 'watch']);

var gulp = require('gulp'),
gutil = require('gulp-util'),
browserify = require('gulp-browserify'),
concat = require('gulp-concat'),
compass = require('gulp-compass'),
connect = require('gulp-connect');

var jsSources = ['components/scripts/first.js','components/scripts/second.js'],
sassSources = ['components/sass/styles.scss'],
htmlSources = ['builds/development/*.html'];

gulp.task('js', function(){
  gulp.src(jsSources)
  .pipe(concat('script.js'))
  .pipe(browserify())
  .pipe(gulp.dest('builds/development/js'))
  .pipe(connect.reload())
});

gulp.task('compass', function(){
	gulp.src(sassSources)
	.pipe(compass({
		sass: 'components/sass',
		images: 'builds/development/images',
		style: 'expanded'
	})
	.on('error', gutil.log))
	.pipe(gulp.dest('builds/development/css'))
	.pipe(connect.reload())
});

gulp.task('watch', function(){
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/sass/*.scss', ['compass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('html', function(){
    gulp.src(htmlSources)
    .pipe(connect.reload())
});

gulp.task('connect', function(){
	connect.server({
		root: 'builds/development',
		livereload: true
	});
});

gulp.task('default', ['html', 'js', 'compass', 'connect', 'watch']);

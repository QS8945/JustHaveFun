var es = require('event-stream');
var gulp = require('gulp');
var concat = require('gulp-concat'); //代码合并
var connect = require('gulp-connect'); //server
var templateCache = require('gulp-angular-templatecache'); //缓存
var ngAnnotate = require('gulp-ng-annotate'); //处理angularjs依赖注入
var uglify = require('gulp-uglify'); //代码混淆
var fs = require('fs'); //文件操作
var _ = require('lodash');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var cssnano = require('gulp-cssnano');

//var scripts = require('./app.scripts.json');
var source = {
	js: {
		main: 'app/main.js',
		src: [
			'app/**/*.js',
			'app/*.js',
		],
		tpl: 'app/**/*.tpl.html'
	},

	css: {
		src: [
			'styles/*.scss'
		]
	},
	html: {
		src: [
			'index.html'
		]
	}
};
var destinations = {
	js: 'build'
};
gulp.task('build', function() {
	return es.merge(gulp.src(source.js.src) , getTemplateStream())
		.pipe(concat('app.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest(destinations.js));
});
gulp.task('js', function() {
	return gulp.src(source.js.src)
		.pipe(concat('app.js'))
		.pipe(gulp.dest(destinations.js));
});
gulp.task('css', function() {
	return gulp.src(source.css.src)
		.pipe(concat('style.css'))
		.pipe(sass())
		.pipe(cssnano())
		.pipe(gulp.dest(destinations.js));
});
gulp.task('html', function() {
	return gulp.src(source.html.src)
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest(destinations.js));
});
gulp.task('watch', function() {
	gulp.watch(source.js.src, ['js']).on('change', browserSync.reload);
	gulp.watch(source.js.tpl, ['js']).on('change', browserSync.reload);
	gulp.watch(source.css.src, ['css']).on('change', browserSync.reload);
});
gulp.task('connect', function() {
	browserSync({
		notify: false,
		port: 8080,
		server: {
			baseDiv: "./"
		}
	});
});
gulp.task('prod', ['build','js', 'css', 'html',]);
gulp.task('dev', ['js', 'css', 'html', 'watch', 'connect']);
gulp.task('default', ['dev']);
var swallowError = function(error) {
	console.log(error.toString());
	this.emit('end')
};var getTemplateStream = function () {
    return gulp.src(source.js.tpl)
        .pipe(templateCache({
            root: 'app/',
            module: 'app'
        }))
};
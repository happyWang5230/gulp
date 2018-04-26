var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var config = require('./config.js');

//编译es6
gulp.task('babel', function () {
    return gulp.src(config.babel.source)
        .pipe(babel())
        .pipe(gulp.dest(config.babel.output));
});

//编译sass
gulp.task('sass', function () {    
    return gulp.src(config.sass.source)
        .pipe(sass())
        .pipe(gulp.dest(config.sass.output))
});

//监听babel
gulp.task('watcher_babel', function () {    
    return gulp.watch(config.babel.source, ['babel']);
})

//监听scss
gulp.task('watcher_sass', function () {    
    return gulp.watch(config.sass.source, ['sass']);
})

//设置默认任务
gulp.task('default', ['watcher_babel', 'watcher_sass']);


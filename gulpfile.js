var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var config = require('./config.js');
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');
var buffer = require('vinyl-buffer');
var merge = require('merge-stream');

//css sprite
gulp.task('sprite', function () {
    // 通过spritemith方法生成一个包含图像流和样式流的对象
    var spriteData = gulp.src(config.sprite.source).pipe(spritesmith({
        imgName: config.sprite.imgName,
        cssName: config.sprite.scssName,
        cssFormat: config.sprite.cssFormat
    }));

    // 图像流转化为buffer类型并压缩保存到磁盘
    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest(config.sprite.output.img));

    // 样式流保存到磁盘
    var cssStream = spriteData.css
        .pipe(gulp.dest(config.sprite.output.sass));

    // 返回一个合并的流来处理结束事件
    return merge(imgStream, cssStream);
});

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


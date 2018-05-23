var gulp         = require('gulp');
var sass         = require('gulp-sass');
var babel        = require('gulp-babel');
var config       = require('./config.js');      //gulp配置文件
var spritesmith  = require('gulp.spritesmith');
var buffer       = require('vinyl-buffer');
var merge        = require('merge-stream');
var debug        = require('gulp-debug');       //调试gulp
var changed      = require('gulp-changed');     //过滤未更改文件
var postcss      = require('gulp-postcss');     //css下一代预处理插件
var cssnano      = require('cssnano');          //css压缩
var cssnext      = require('postcss-cssnext');  //css4内容（包含autoprefixer，但是较为先进在开发环境中替代autoprefixer）
var autoprefixer = require('autoprefixer');     //css通过自动添加前缀等功能实现兼容的神器
var cssModules   = require('postcss-modules');  //模块化工具
var ejs          = require('gulp-ejs');         //ejs支持
var path         = require('path');             //路径模块            
var fs           = require('fs');               //文件模块        
var scss         = require("postcss-scss");     //编译scss混合宏信息（用处不大）
var rename       = require('gulp-rename');      //重命名
var variables    = require('postcss-css-variables');  //定义变量（类似css4里的自定义属性）
var import_      = require('postcss-import');   //引入外部文件
var nested       = require('postcss-nested');   //嵌套    
var extend       = require('postcss-extend');   //代码块继承
var sugarss      = require('sugarss');          //预处理插件

/**
 *
 * css modules (css模块化)
 *
**/

function getJSONFromCssModules(cssFileName, json) {
    var cssName       = path.basename(cssFileName, '.css');
    var jsonFileName  = path.resolve('./build', cssName + '.json');
    fs.writeFileSync(jsonFileName, JSON.stringify(json));
}

function getClass(module, className) {
    var moduleFileName  = path.resolve('./build', module + '.json');
    var classNames      = fs.readFileSync(moduleFileName).toString();
    return JSON.parse(classNames)[className];
}

gulp.task('css', function() {
    return gulp.src('./css/post.css')
        .pipe(postcss([
            cssModules({ getJSON: getJSONFromCssModules }),
        ]))
        .pipe(gulp.dest('./build'));
});

gulp.task('html', ['css'], function() {
    return gulp.src('./html/index.ejs')
        .pipe(ejs({ className: getClass }, { ext: '.html' }))
        .pipe(gulp.dest('./build'));
});

gulp.task('cssmodule', ['html']);


/**
 *
 * postcss
 *
**/

gulp.task('postcss', function () {
    function callback(file) {
        return {
            plugins: [
                import_(),
                variables(),
                extend(),
                nested(),
                autoprefixer(), //使用默认配置包含ie11+
            ],
            options: {
                // parser: sugarss
            }
        }
    }
    return gulp.src(config.postcss.source)
        // .pipe(changed(config.postcss.output))
        .pipe(debug({title: '调试信息:'}))
        .pipe(postcss(callback))
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest(config.postcss.output));
});


/**
 *
 * css sprite (生成雪碧图)
 *
**/

gulp.task('sprite', function () {
    // 通过spritemith方法生成一个包含图像流和样式流的对象
    var spriteData = gulp.src(config.sprite.source).pipe(spritesmith({
        imgName: config.sprite.imgName,
        cssName: config.sprite.scssName,
        cssFormat: config.sprite.cssFormat
    }));

    // 图像流转化为buffer类型保存到磁盘
    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe(gulp.dest(config.sprite.output.img));

    // 样式流保存到磁盘
    var cssStream = spriteData.css
        .pipe(gulp.dest(config.sprite.output.sass));

    // 返回一个合并的流来处理结束事件
    return merge(imgStream, cssStream);
});


/**
 *
 * babel (编译es6+)
 *
**/

gulp.task('babel', function () {
    return gulp.src(config.babel.source)
        .pipe(changed(config.babel.output))
        .pipe(babel())
        .pipe(gulp.dest(config.babel.output));
});


/**
 *
 * sass(编译成sass)
 *
**/

// gulp.task('sass', function () {
//     return gulp.src(config.sass.source)
//         .pipe(changed(config.sass.output,{extension:'.css'}))  //如果输出文件扩展名改变了需要配置extension
//         .pipe(sass())
//         .pipe(gulp.dest(config.sass.output));
// });

//监听babel
gulp.task('watcher_babel', function () {
    return gulp.watch(config.babel.source, ['babel']);
})

//监听scss
// gulp.task('watcher_sass', function () {
//     return gulp.watch(config.sass.source, ['sass']);
// })

//设置默认任务
gulp.task('default', ['watcher_babel', 'watcher_sass']);


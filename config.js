var global_config = {
    babel: {
        source: "js/*.js",   //来源文件匹配（遵循glob语法）
        output: "dist/js"    //输出文件夹
    },
    sass: {
        source: "scss/*.scss",
        output: "dist/css"
    },
    postcss: {
        source: "css/*.css",
        output: "dist/css"
    },
    sprite: {
        source: 'img/*.png',
        imgName: 'sprite.png',
        scssName: 'sprite.scss',
        cssFormat: 'scss',
        output: {
            sass: "scss",
            img: "dist/img"
        }
    }
}
module.exports = global_config;
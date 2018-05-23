var global_config = {
    babel: {
        source: "static/babel/*.js",   //来源文件匹配（遵循glob语法）
        output: "dist/js"    //输出文件夹
    },
    sass: {
        source: "static/scss/*.scss",
        output: "dist/css"
    },
    postcss: {
        source: "static/postcss/*.pcss",
        output: "dist/css"
    },
    sprite: {
        source: 'static/img/*.png',
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
var global_config = {
    babel: {
        source: "js/*.js",   //来源文件匹配（遵循glob语法）
        output: "dist/js"    //输出文件夹
    },
    sass: {
        source: "scss/*.scss",
        output: "dist/css"
    }
}
module.exports = global_config;
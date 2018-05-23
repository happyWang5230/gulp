# gulp
gulp基础搭建（postcss（postcss-module构建中）,babel,sprite）

说明：
node 8.11.1

使用说明：

yarn

gulp "task name"
（gulp后加设定的任务名查看变化，如gulp sprite）

安装中可能出现的问题：

1.安装node-sass模块出问题：下载一个二进制文件超时

解决方法：在报错信息里找到要下载的文件（.node结尾），然后浏览器下载或者直接去github里找到该文件下载

下载完成后：set SASS_BINARY_PATH=D:/WorkCode/win32-x64-57_binding.node //PATH=后面是的下载的.node所在的路径（attachment文件夹有win32-x64-57_binding.node文件，名称不同请自己搜索下载）


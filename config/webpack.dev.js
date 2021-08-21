const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    open: true,  // 自动打开浏览器
    hot: true,
    compress: true, // 启动gzip压缩(数据由服务器传输到浏览器时是可以压缩的)
    contentBase: '../dist',
    port: 3000  // 端口号
  }
})

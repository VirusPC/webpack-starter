const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
//const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");



module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin(),  // 自动删除上一次的文件.
    // new OptimizeCssAssetsPlugin({ // 压缩css
    //   cssProcessorPluginOptions: {
    //     preset: ['default', { descardComments: { removeAll: true } }],
    //   },
    //   cssProcessorOptions: {  
    //     map: {
    //       inline: false,
    //       annotation: true,
    //     }
    //   }
    // })
  ]
});
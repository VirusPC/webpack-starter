const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlWebpackPluginMinifyConfig = {
  removeComments: true,
  removeRedundantAttributes: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,

  collapseWhitespace: true,
  useShortDoctype: true,  // 使用短的文档声明
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
}

module.exports = {
  entry: {
    index: path.join(__dirname, "..", "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './js/[name].js',
    publicPath: "/"  // 所有输出资源在引入时的公共路径(loader,plugin引入时以此路径为基准), 若loader中也指定了publicPath, 会以loader的为准
  },
  module: {
    rules: [
      { // css
        test: /\.(css)$/i,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-flexbugs-fixes'),
                  require('postcss-preset-env')({
                    autoprefixer: {
                      flexbox: "no-2009"
                    },
                    stage: 3,
                  }),
                  require('postcss-normalize'),
                ]
              }
            },
          }
        ]
      },
      { 
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: "asset" 
      },
      // { // 处理html中的img标签
      //   test: /\.html$/i,
      //   loader: 'html-loader',
      // },
      {  // 语法检查
        test: /\.(j|t)s$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {  // es6 -> es5
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',  // 按需引入,需要使用polyfill
                  corejs: { version: 3 },  // 解决warn
                  targets: {  // 指定兼容性处理哪些浏览器
                    "chrome": "58",
                    "ie": "9"
                  }
                }
              ]
            ],
            cacheDirectory: true, // 开启babel缓存
          }
        }
      },
      { // 对于特殊数据文件，导入文件路径
        test: /\.(csv)$/i,
        loader: 'file-loader',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      title: "index",
      inject: 'body',
      minify: htmlWebpackPluginMinifyConfig,
      cache: true,
      chunks: ['index']
    }),
    new MiniCssExtractPlugin({  // 将样式文件合并成名为main的样式文件
      filename: "css/[name].css"
    }),
  ],
}
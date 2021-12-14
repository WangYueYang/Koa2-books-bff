const {
  merge
} = require('webpack-merge');
const path = require('path');
// 可以通过正则表达式匹配对应的文件
const glob = require("glob");

const htmlWebpackPlugin = require('html-webpack-plugin');
// 打包css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const copyWebpackPlugin = require('copy-webpack-plugin');

const afterHtmlPlugin = require('./build/afterHtmlPlugin');

// 1.判断打包环境
// 遍历入口
const files = glob.sync('./src/web/views/**/*.entry.js');
const entry = {};
const htmlPlugins = [];

files.forEach(url => {

  // 通过正则匹配engry.js 入口js
  if (/([a-zA-Z]+-[a-zA-z]+)\.entry\.js/.test(url)){
    // RegExp.$1 是分组匹配的第一项clear
    const entryKey = RegExp.$1;
    const [pagesName, actionName] = entryKey.split('-');
    entry[entryKey] = `./src/web/views/${pagesName}/${entryKey}.entry.js`;


    // filename 需要设置一下，不然webpack会都打包成 index.html 引起同名错误
    htmlPlugins.push(new htmlWebpackPlugin({
      template: `./src/web/views/${pagesName}/pages/${actionName}.html`,
      filename: `../web/views/${pagesName}/pages/${actionName}.html`,
      // 这里只打包自己的文件
      chunks: ['runtime', entryKey],
      inject: false
    }))
  }

})

// 获取命令行参数， 获取当前环境
const {
  argv
} = require('yargs');
// 当钱打包环境 dev | prod
const mode = argv.mode;

// 获取对应环境的webpackconfig
const envConfig = require(`./build/webpack.${mode}.js`)
console.log(process.argv, argv.mode)

const baseConfig = {
  entry,
  output: {
    path: path.join(__dirname, './dist/assets'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    ...htmlPlugins,
    new MiniCssExtractPlugin(),
    new copyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, './src/web/views/layouts'), to: "../web/views/layouts" },
        { from: path.join(__dirname, './src/web/components'), to: "../web/components" },
      ],
    }),
    new afterHtmlPlugin()
  ]
}
module.exports = merge(baseConfig, envConfig);
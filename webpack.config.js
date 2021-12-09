const {
  merge
} = require('webpack-merge');
const path = require('path');
// 可以通过正则表达式匹配对应的文件
const glob = require("glob");


// 1.判断打包环境
// 遍历入口
const files = glob.sync('./src/web/views/**/*.entry.js');
const entry = {};

files.forEach(url => {

  // 通过正则匹配engry.js 入口js
  if (/([a-zA-Z]+-[a-zA-z]+)\.entry\.js/.test(url)){
    // RegExp.$1 是分组匹配的第一项clear
    const entryKey = RegExp.$1;
    const [pagesName, actionName] = entryKey.split('-');
    entry[entryKey] = `./src/web/views/${pagesName}/${entryKey}.entry.js`
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
    path: path.join(__dirname, './dist/web/assets'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
}
module.exports = merge(baseConfig, envConfig);
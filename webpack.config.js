const {
  merge
} = require('webpack-merge');

// 1.判断打包环境
// 遍历入口

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

}
module.exports = merge(baseConfig, envConfig);
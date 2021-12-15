const copyWebpackPlugin = require('copy-webpack-plugin');
const minify = require('html-minifier').minify;
const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  output: {
    filename: '[name].[contenthash].js',
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../src/web/views/layouts'),
          to: '../views/layouts',
          // 可以对输出做一个转义
          transform(content) {
            return minify(content.toString(), {
              collapseWhitespace: true,
            });
          },
        },
        {
          from: path.join(__dirname, '../src/web/components'),
          to: '../components',
          transform(content) {
            return minify(content.toString(), {
              collapseWhitespace: true,
            });
          },
        },
      ],
    }),
  ],
};

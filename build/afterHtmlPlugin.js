const pluginName = 'afterHtmlPlugins';
const htmlWebpackPlugin = require('html-webpack-plugin');

function createHtml(type, arr) {
  let result = ''
  if (type === 'js') {
    arr.forEach((url) => {
      result += `<script src="${url}"></script>`;
    })
  }

  if (type === 'css') {
    arr.forEach(url => {
      result += `<link href="${url}" rel="stylesheet"></link>`;
    })
  }

  return result;
}

class AfterHtmlPlugins {
  apply(compiler) {
    // compiler webpack 编译对象
    // complation 每一次的构建
    compiler.hooks.compilation.tap(pluginName, (complation) => {
      /* ... */
      htmlWebpackPlugin.getHooks(complation).beforeAssetTagGeneration.tapAsync(pluginName, (data, cb) => {
        this.jsArray = data.assets.js;
        this.cssArray = data.assets.css;
        cb(null, data)
      })

      htmlWebpackPlugin.getHooks(complation).beforeEmit.tapAsync(pluginName, (data, cb) => {
        data.html = data.html.replace('<!-- cssplaceholder  -->', createHtml('css', this.cssArray));
        data.html = data.html.replace('<!-- jsplaceholder -->', createHtml('js', this.jsArray));
        cb(null, data);
      })
    });
  }
}

module.exports = AfterHtmlPlugins;
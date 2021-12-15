## KOA2 BookList
1. 基于 koa 启动了一个本地服务，
2. 整合公用配置到 config 文件夹
3. 初始化 koa 路由，整合到了 controller 里, 这里初始化路由要放到最下面不然捕获不到全局错误，有个执行顺序的问题。
4. 接口路由也在 controller 里，由 controller -> index 统一管理，分发到 koa-router 上, 用了 koa-router 包
5. 使用swig膜拜渲染前端页面, 这里用了 koa-swig co 两个包
6. 把前端静态资源打包到了 assets 目录里。
7. 前端页面放到views，然后分别在 swig 里配置文件路径。
8. 使用了 koa-static 解决了views 里前端页面引用 assets 里静态资源文件路径问题
9. 前端页面引入进来后，默认显示根路由展示前端页面，这时候会有一个前端假路由刷新页面找不到资源页面崩溃的问题，使用了 koa2-connect-history-api-fallback 这个包来解决。
10. 创建了一个捕获错误的中间件，基本逻辑就是定义了一个类的静态方法，然后把 koa 实例 app 传进去，在 app.use 的时候进行 try catch 捕获错误。没有报错的话继续 await next() 去执行下去。
11. 用log4js 记录错误日志，import log4js 后，在 app.js 里稍微配置一下，然后传 log4js.getLogger 给捕获错误的中间件，在中间件里进行记录log
15. 使用 @babel/node 把 require 改成 es6 规范的 import ，这里还依赖 @babel/preset-env 和 @babel/core 这两个包，然后在 .babelrc 配置文件里 加上 presets: @babel/preset-env 就可以用了。
16. 添加数据 models 层， 在 models 层中向后台发送数据请求，然后在 controller 层中引用 models 的数据。
17. 在 utils 里封装了请求方法，项目统一用封装的请求，类似于做一个请求的拦截器。
18. 了解了 js 库如何封装的，以及节流的封装，他返回一个新的函数，并满足一下3个条件 1) 第一次处罚会立即执行 2) 每隔一段时间执行一次， 3）如果在间隔时间内出发，会在间隔末尾再执行一次
19. 了解了 mocha 配合 chai  断言库.

## Webpack深度细化BFF
主要分为两个部分的打包， web -》 webpack 打包， server -》 gulp 打包

通过 scripty 优化我们的 npm scripts，可以把 npm 脚本放在我们单独的 scripts 文件下的 .sh 文件里去进行管理。
Jscpd 检查重复代码
将前后端代码统一放到 src 目录下， 新建 web 和 server 分别进行管理

### 通过 webpack 打包 web 代码
1.通过 yargs 获取命令行参数，主要是获取当前的环境变量 development | production
2.创建通用的 webpack.config.js 文件和 build 目录里分别创建 prod | dev 环境下的webpack.config，然后再通过 webpack-merge 进行合并。对不同环境的 webpack 配置进行管理
3.开始配置 webpack 入口 entry，因为是一个多页面的应用，所以会有多个入口，这个时候给每个需要配置入口的页面添加 entry.js ，通过 glob 这个包匹配到所有的 entry.js 此时获取到的是一个数组，然后这个数组进行遍历，再通过增则匹配对应的 entry.js 分别添加对应的 entryKey: entryVal
4. webpack 配置出口 output ，只是简单的配到 dist 目录下，再具体的就对应 src 目录就好了，output 的path 是绝对路径需要 path.join(__dirname, 'dist')，filename: 就配置 [name].[contenthash] 这种 name + 哈希的就行。
5. 再对html进行打包, 通过 html-webpack-plugin 对每一个页面进行打包，因为是多页的应用，所以和入口配置在一起进行便利，然后 push 到数组里，再到 webpack 的 plugins 通过 [...htmlWebpackPlugin] 展开，具体的配置参数有 template, filename, chunks, inject
6. 基础的loader配置，需要什么 loader 加什么 loader 就好了, 这里的 css rules 里还用到了 MiniCssExtractPlugin 这个插件将 CSS 提取到单独的文件中。它为每个包含 CSS 的 JS 文件创建一个 CSS 文件。它支持按需加载 CSS 和 SourceMap。它建立在新的 webpack v5 功能之上，并且需要 webpack 5 才能工作。
7.html 里使用 swig 模版，通过 copy-webpack-plugin 把模版的html copy 到 dist 目录里，而没有使用 webpack 进行打包

打包 web 文件有几个需要注意的点：
1. 如果是多页应用的话，需要配置多个入口和对多个 html 进行配置和打包处理
2. src 下目录结构里 静态资源，模版，组件 等等 这些文件的目录结构的设计。

上面的东西完成后还有一个webpack打包后的问题就是，对于 swig 模板里引入的静态资源被打包后不能插入到 swig 指定的代码块了，这里需要写一个 webpack 插件通过替换掉 swig 指定代码块里的占位符来完成插入。

### webpack 插件
通过类的 apply 方法，获取到 compiler 模块，也就是 webpack 的主要引擎，compiler.hooks 有很多 webpack 的钩子，在不同的生命周期里会被触发，再通过compilation 配合 htmlWebpackPlugin 的生命周期修改打包后的 html 内容

### 通过 gulp 打包 server
1. 通过 @babel/plugin-transform-modules-commonjs 编译 server 代码 为 commonjs ，在 .pipe(babel({})) 的配置里设置 babelrc: false，不使用 .babelrc 里的配置，通过 gulp.src 和 gulp.dest 配置入口和出口
2. gulp-watch 添加热更新，用 watch() 替换掉 gulp.src
3. gulp-rollup treeshaking 掉垃圾代码，
4. @rollup/plugin-replace 去掉和当前配置环境不同的配置
5. html-minifier 压缩 html 代码
6. optimize-css-assets-webpack-plugin 压缩 css 代码
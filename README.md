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
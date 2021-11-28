const Koa = require('koa');
const config = require('./config');
const controller = require('./controller');
const render = require('koa-swig');
const co = require('co');
const static = require('koa-static');
const {
  historyApiFallback
} = require('koa2-connect-history-api-fallback');
const errorHandle = require('./middlewares/errorHandle');



const app = new Koa();

// swig 模版
app.context.render = co.wrap(render({
  root: config.viewDir,
  cache: config.cache, // disable, set to false 是否需要缓存
}));

// 初始化路由
controller(app);

// 初始化中间件
// app.use(historyApiFallback({ index: './views/index.html', whiteList: ['/api'] }));
app.use(static(config.staticDir));
errorHandle.error(app);

app.listen(config.port, () => {
  console.log(`koa listening port is ${config.port}`)
});
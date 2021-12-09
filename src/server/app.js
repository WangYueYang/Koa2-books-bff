import Koa from 'koa';
import config from './config';
import initController from './controller';
import staticServer from 'koa-static';
import render from 'koa-swig';
import co from 'co';
import {historyApiFallback} from 'koa2-connect-history-api-fallback';
import errorHandle from './middlewares/errorHandle';
import log4js from 'log4js';

const app = new Koa();
// swig 模版
app.context.render = co.wrap(render({
  root: config.viewDir,
  cache: config.cache, // disable, set to false 是否需要缓存
}));



// 初始化中间件
app.use(historyApiFallback({ index: '/', whiteList: ['/api', '/books'] }));
app.use(staticServer(config.staticDir));

// 错误日志
log4js.configure({
  appenders: { globalError: { type: "file", filename: "./logs/error.log" } },
  categories: { default: { appenders: ["globalError"], level: "error" } }
});
const logger = log4js.getLogger("server");

// 捕获全局错误
errorHandle.error(app, logger);


// 初始化路由
// 初始化路由要放到错误捕获和中间件下面，执行顺序问题
initController(app);

app.listen(config.port, () => {
  console.log(`koa listening port is ${config.port}`)
});
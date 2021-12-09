class ErrorHandle {
  static error(app, logger) {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (e) {
        logger.error(e.message);
        ctx.body = '500 error'
      }
    });
    // 404
    app.use(async (ctx, next) => {
      await next();
      if (ctx.status == 404) {
        ctx.body = '404 啦';
      }
    });
  }
}

export default ErrorHandle;

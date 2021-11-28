
class ErrorHandle {
  static error(app) {
    app.use(async (ctx, next) => {
      try {
        await next()
      } catch(e) {

        ctx.body = '500'
      }
    });
  }
}

module.exports = ErrorHandle;
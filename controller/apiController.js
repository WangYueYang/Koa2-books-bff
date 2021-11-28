const Controller = require('./controller');

class ApiController extends Controller {
  constructor() {
    super();
  }

  actionDataList(ctx) {
    ctx.body = {
      status: 200,
      name: 'book'
    }
  }
}

module.exports = ApiController;
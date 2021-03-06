import Controller from './controller';

class IndexController extends Controller {
  constructor() {
    super();
  }

  async actionIndex(ctx) {
    ctx.body = await ctx.render('index'); // 参数对应的是 views 下的文件名 
  }
}

export default IndexController;
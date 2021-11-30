import Controller from "./controller";
import BooksModel from "../models/booksModel";

// 首先 controller 层接受到前端的请求，转发给对应的action
// action接收到后处理业务逻辑，如果需要后端数据，按需引入 model 层
// 最后输出给前端 view 层

class ApiController extends Controller {
  constructor() {
    super();
  }

  async actionBookList(ctx) {
    const booksModel = new BooksModel();
    ctx.body = await booksModel.getBooksList();
  }
}


export default ApiController;
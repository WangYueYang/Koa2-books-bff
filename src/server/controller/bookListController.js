import Controller from "./controller";
import BooksModel from "../models/booksModel";

class BookListController extends Controller {
  constructor() {
    super();
  }

  async actionBookList(ctx) {
    const booksModel = new BooksModel();
    const data = await booksModel.getBooksList();
    ctx.body = await ctx.render('books/pages/list', {
      data: data.data
    });
  }
}


export default BookListController;
import Router from 'koa-router';
import IndexController from './indexController';
import ApiController from './apiController';
import BookListController from './bookListController';


const router = new Router();
const indexController = new IndexController();
const apiController = new ApiController();
const bookListController = new BookListController();

function initController(app) {
  router.get('/', indexController.actionIndex);
  router.get('/api/getBookList', apiController.actionBookList);
  router.get('/books/list', bookListController.actionBookList);
  
  
  app.use(router.routes()).use(router.allowedMethods());
}

export default initController;
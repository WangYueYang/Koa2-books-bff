import fetch from 'node-fetch';
import SafeRequest from '../utils/safeRequest';

class BooksModel {
  // 这里请求后端接口
  getBooksList() {

    return SafeRequest.apiFetch('api url')
  }
}

export default BooksModel;
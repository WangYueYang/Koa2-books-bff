import fetch from 'node-fetch';

class SafeRequest {
  static apiFetch(url) {
    let result = {
      code: 0,
      message: '',
      data: null
    }
    return new Promise((resolve) => {
      fetch(url)
        .then(res => {
          result.data = res.data;
          resolve(res);
        })
        .catch(e => {
          result.code = 1;
          result.message = e.message;
          result.data = [{
              id: 1,
              name: 'book1'
            },
            {
              id: 2,
              name: 'book2'
            }
          ];

          resolve(result);
        })
    })
  }
}

export default SafeRequest;
const request = require('supertest');
const expect = require('chai').expect;


describe('NODEJS API test', () => {
  it('获取图书列表接口', function () {
    request('http://localhost:3000')
      .get('/api/getBookList')
      .expect(200)
      .end((err, res) => {
        console.log(res, err.message, 'data')
      })
  })
})
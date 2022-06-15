import request from 'supertest';
import App from '../app/backend/src/api/App';

describe('GET /', () => {
  const app = new App().getApp();
  it('should return 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Hello World!', done);
  });
});

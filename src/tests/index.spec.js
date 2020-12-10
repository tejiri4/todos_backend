import app from 'src';
import request from 'supertest';

describe('app', () => {
    it('start the app',(done) => {
        request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;

          done()
        });
    });
  });
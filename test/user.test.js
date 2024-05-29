const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const { expect } = chai;

describe('User Routes', () => {
  it('should register a new user', (done) => {
    chai.request(app)
      .post('/users/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  // Additional tests for login, profile, etc.
});

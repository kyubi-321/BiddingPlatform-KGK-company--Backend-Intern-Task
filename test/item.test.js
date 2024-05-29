const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { User, Item } = require('../models');

chai.use(chaiHttp);
const { expect } = chai;

let token;
let itemId;

before(async () => {
  // Create a test user and get a token
  await User.sync({ force: true });
  await Item.sync({ force: true });

  const res = await chai.request(app)
    .post('/users/register')
    .send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

  token = res.body.token;
});

describe('Item Routes', () => {
  it('should create a new item', (done) => {
    chai.request(app)
      .post('/items')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Test Item')
      .field('description', 'This is a test item')
      .field('startingPrice', '10')
      .field('endTime', new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()) // 24 hours from now
      .attach('image', 'test/fixtures/test-image.jpg')
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal('Test Item');
        itemId = res.body.id;
        done();
      });
  });

  it('should get all items', (done) => {
    chai.request(app)
      .get('/items')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.above(0);
        done();
      });
  });

  it('should get a specific item by ID', (done) => {
    chai.request(app)
      .get(`/items/${itemId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id');
        expect(res.body.id).to.equal(itemId);
        done();
      });
  });

  it('should update an item by ID', (done) => {
    chai.request(app)
      .put(`/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Updated Test Item')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.name).to.equal('Updated Test Item');
        done();
      });
  });

  it('should delete an item by ID', (done) => {
    chai.request(app)
      .delete(`/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Item deleted');
        done();
      });
  });
});

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index.js');
const user = require('../app/model/user');

const should = chai.should();

chai.use(chaiHttp);

describe('users', () => {
  beforeEach((done) => { // Before each test we empty the database
    user.remove({}, (err) => {
      done();
    });
  });
  describe('/POST sign-up', () => {
    it('it should return a duplicate error', (done) => {
      const user = {
        first_name: 'first_name',
        last_name: 'last_name',
        email: 'email@email.com',
        password: 'password',
        interests: ['interests'],
      };
      chai.request(index)
        .post('/sign-up')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Successfully signed up');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('password');
          res.body.data.should.have.property('interests');

          done();
        });
    });
  });
});



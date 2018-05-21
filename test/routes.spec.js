const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('Should return hompage with html document', () => {
    return chai.request(server)
      .get('/')
      .then( response => {
        response.should.have.status(200);
        response.should.be.html;
      })
      .catch( error => {
        throw error;
      })
  })

  it('should return 404 if the request is not found', () => {
    return chai.request(server)
    .get('/djsakld')
    .then(response => {
      response.should.have.status(404);
    })
    .catch( error => {
      throw error;
    })
  })

});

describe('API Routes', () => {
  beforeEach((done) => {
    database.migrate.rollback()
    .then(() => {
      return database.migrate.latest()
    })
    .then(() => {
      return database.seed.run()
    })
    .then(() => {
      done();
    })
  })

  

});
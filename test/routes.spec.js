const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

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

  describe('GET api/v1/photos', () => {
    it('should get all the photos', () => {
      return chai.request(server)
      .get('/api/v1/photos')
      .then(response => {
        response.should.be.json;
        response.should.have.status(200);
        response.body.should.be.an('array');
        response.body[0].should.have.property('title');
        response.body[0].title.should.equal('Batman Back Baby');
        response.body[0].should.have.property('url');
        response.body[0].url.should.equal('https://i1.wp.com/www.caninomag.es/wp-content/uploads/2017/06/Adam-West-es-Batman-en-Canino-portada.png?resize=634%2C424&ssl=1');

      })
      .catch(error => {
        throw error;
      })
    })
  })

  describe('GET /api/v1/photos/:id', () => {
    it('gets a photo by id', () => {
      return chai.request(server)
        .get('/api/v1/photos/1')
        .then( response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('array');
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('title');
          response.body[0].title.should.equal('Batman Back Baby');
          response.body[0].should.have.property('url');
          response.body[0].url.should.equal('https://i1.wp.com/www.caninomag.es/wp-content/uploads/2017/06/Adam-West-es-Batman-en-Canino-portada.png?resize=634%2C424&ssl=1')

        })
    })
  })

  describe('POST api/v1/photos', () => {
    it('should post new photos to database', () => {
      return chai.request(server)
        .post('/api/v1/photos')
        .send({
            title : "run",
            url: "https://5.imimg.com/data5/OD/DU/GLADMIN-42522280/german-shephard-500x500.png"
        })
        .then( response => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(3)
        })
        .catch( error => {
          console.log(error)
          throw error;
        })
    })

    it('should send 422 if missing params in body' , () => {
      return chai.request(server)
        .post('/api/v1/photos')
        .send({
            url: "https://5.imimg.com/data5/OD/DU/GLADMIN-42522280/german-shephard-500x500.png"
        })
        .then( response => {
          response.should.have.status(422);
          response.body.should.be.a('object');
          response.body.error.should.equal('Expected format of post : { title: <string>, url: <string>. You are missing a title property.')
        })
        .catch( error => {
          throw error;
        })
    })
  })

  describe('DELETE /api/v1/photos/:id', () => {
    it('should delete a photo with a spec id', () => {
      return chai.request(server)
        .delete('/api/v1/photos/1')
        .then(response => {
          response.should.have.status(204);
        })
        .catch(error => {
          throw error;
        })
    })

    it('should send a status of 404 if the id does not match', () => {
      return chai.request(server)
        .delete('/api/v1/photos/2022')
        .then(response => {
          response.should.have.status(404)
        })
        .catch(error => {
          throw error
        })
    })
  })

});
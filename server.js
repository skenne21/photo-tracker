const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const enviroment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[enviroment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));

app.locals.title = 'photo tracker';

app.get('/', (request, reponse) => {

})

app.get('/api/v1/photos', (request, response) => {
  database('photos').select()
    .then(photos => {
      console.log(photos)
      response.status(200).json(photos);
    })
    .catch( error => {
      response.status(500).json({error})
    })
})

app.get('/api/v1/photos/:id', (request, response) => {
  database('photos').where('id', request.params.id).select()
    .then( photo => {
      if (photo.length) {
        response.status(200).json(photo);
      } else {
        response.status(404).json({error: `could not find id ${request.params.id}`})
      } 
    })
    .catch(error => {
      response.status(500).json({error})
    })

})

app.post('/api/v1/photos', ( request, reponse) => {

})

app.delete('/api/v1/photos/:id', (request, reponse) => {

})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}`)
})

module.exports = app;
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

app.get('/api/v1/photos', (request, reponse) => {

})

app.get('/api/v1/photos/:id', (request, reponse) => {

})

app.post('/api/v1/photos', ( request, reponse) => {

})

app.delete('/api/v1/photos/:id', (request, reponse) => {

})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}`)
})

module.exports = app;
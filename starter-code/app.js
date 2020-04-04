const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// two lines that set up handlebars templating
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// sets up public folder
// __dirname === /Users/presenter/lab-ironbeers/starter-code\public
app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => {
  res.render('index')
});

app.get('/beers', (req, res) => {

  punkAPI.getBeers().then((beers) => {

    console.log(beers)

    res.render('beers', { beersArr: beers, username: 'Hendrik' })

  })

});

app.get('/random-beer', (req, res) => res.render('random-beer'));

// how to parameterize your routes
app.get('/beer/:id', (req, res) => {

  punkAPI.getBeer(req.params.id).then((beers) => {
    console.log(beers[0])
    res.render('beer', { beer: beers[0] })
  })

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

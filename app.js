// Initialize express
const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');
const models = require('./db/models');

app.use(bodyParser.urlencoded({ extended: true }));

// Use "main" as our default layout
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// OUR MOCK ARRAY OF PROJECTS
var events = [
    { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://cdn2.photostockeditor.com/t/2812/animal-raccoon-walking-on-lawn-grass-raccoon-raccoon-image.jpg" },
    { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://cdn2.photostockeditor.com/t/2812/animal-raccoon-walking-on-lawn-grass-raccoon-raccoon-image.jpg" },
    { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://cdn2.photostockeditor.com/t/2812/animal-raccoon-walking-on-lawn-grass-raccoon-raccoon-image.jpg" }
  ]

// Index
app.get('/', (req, res) => {
  models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
    res.render('events-index', { events: events });
  })
})

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})

app.get('/events/new', (req, res) => {
  res.render('events-new', {});
})

// CREATE
app.post('/events', (req, res) => {
  models.Event.create(req.body).then(event => {
    res.redirect(`/`);
  }).catch((err) => {
    console.log(err)
  });
})
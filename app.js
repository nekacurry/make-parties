// Initialize express
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');
const models = require('./db/models');
require('./controllers/events')(app, models);
require('./controllers/rsvps')(app, models);

const hbs = exphbs.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: 'main',
  helpers: {
    if_eq: function (a, b, opts) {
      if (a === b) {
        return opts.fn(this);
      }
      return opts.inverse(this);
    },
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: true }));

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
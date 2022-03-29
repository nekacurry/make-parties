// Initialize express
const express = require('express')
const app = express()
const { engine } = require('express-handlebars');

app.get('/', (req, res) => {
  res.render('home', { msg: 'Handlebars are Cool!' });
})
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
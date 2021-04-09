const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors');
const generate_uid = require('./routes/generate_uid')
const users = require('./routes/users');
const tatoos = require('./routes/tatoo');
const app = express();

const port = 8000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/users', cors());
app.use('/tatoo', cors());

mongoose.connect('mongodb://localhost:27017/tatooDB', {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected')
});


app.listen(port, (req, res) => console.log(`Example app listening on ${port}!`))

app.use('/generate_uid', generate_uid);

app.use('/users', users);
app.use('/tatoo', tatoos)
//app.get('/users', WithJWTAuth, (req, res) => {
//  res.json(users);
//});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) =>
  res.send('hello world, Lochlann is using Express this has changed'));

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.send('username and passwords must be provided');
    return
  }

  // cherche in DB if user and password match
  // generate un JWT, renvoie in the response
  // client garde le token (localStorage)
  // authentificated requests --> mette le token in the headers

  // server side - verify a token 
  res.json({ username, password });
})


module.exports = app;

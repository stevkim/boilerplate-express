let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');

console.log('Hello World')

function mid(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next();
}

app.use(mid);
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
})

app.get('/now',
(req, res, next) => {
  req['time'] = new Date().toString();
  next();
},
(req, res) => {
  res.json({ time: req.time });
})

app.get('/json', function(req, res) {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({"message": "HELLO JSON"});
  } else {
    res.json({"message": "Hello json"});
  }
})

app.get('/:word/echo', function(req, res) {
  res.json({ echo: req.params.word});
})

app.route('/name')
  .get(function(req, res) {
    const { first, last } = req.query;
    res.json({ name: `${first} ${last}`});
  })
  .post(function(req, res) {
    const { first, last } = req.body;
    res.json({ name: `${first} ${last}`});
  })























 module.exports = app;

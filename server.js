console.log('Server-side code running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')

const app = express();

// serve files from the public directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());
// connect to the db and start the express server
let db;

// Replace the URL below with the URL for your database
const url =  'mongodb://aaron:thisismydbpass@ds129936.mlab.com:29936/aaronsdb';

MongoClient.connect(url, (err, database) => {
  if(err) {
    return console.log(err);
  }
  db = database;
  // start the express web server listening on 8080
  app.listen(8080, () => {
    console.log('listening on 8080');
  });
});

// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// add a document to the DB collection recording the click event
app.post('/clicked', (req, res) => {
  const click = {clickTime: new Date()};
  //console.log(click);
  //console.log(db);

  db.collection('clicks').save(click, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('click added to db');
    res.redirect('/');
  });
});

///
app.post('/updatePos', (req, res) => {
  let circle = {clickTime: new Date()};
  console.log(req.body.data)
  //console.log(db);
  db.collection("circlePos").update({}, req.body.data), {upsert:true} function(err, res) {
    console.log('Done')
  }

  db.collection('circlePos').save(circle, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('circle added to db');
    res.redirect('/');
  });
});

// get the click data from the database
app.get('/clicks', (req, res) => {
  db.collection('clicks').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

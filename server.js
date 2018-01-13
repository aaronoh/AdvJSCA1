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
  res.sendFile(__dirname + '/public/start.html');
});

// after receiving a PUT request, update the database with
// the new x, y coords in the request body
app.put('/score', (req, res) => {
    console.log('Data received: ' + JSON.stringify(req.body));
    db.collection('score').insertOne(req.body, (err, result) => {
        if (err) {
            return console.log(err);
        }
    });
    res.sendStatus(200); // respond to the client indicating everything was ok
});

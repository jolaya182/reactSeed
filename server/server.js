/**
 * A very simple web server for the Front-end code challenge.
 */

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const fixtures = require('./fixtures');
const path = require("path");

const IP = 'localhost';
const PORT = 3001;
const PUBLIC_DIR = 'build';

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}`);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set public directory for assets like css and js files.
app.use(express.static(PUBLIC_DIR));

app.listen(PORT, IP, () => {
  console.log(`${Date.now()} - Server running at http://${IP}:${PORT}`);
});

app.get('/', (req, res, next) => {
  res.sendFile( path.join(__dirname , '../src/index.html'));
});

/**
 * Returns list of events.
 */
app.get('/events', (req, res, next) => {
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader("Content-Type", "application/json");

  const pageSize = 3;
  const currentPage = req.query.page || 1;
  console.log( "req.query.page: ",req.query.page );
  const allEvents = Object.assign([], fixtures.events);
  events = allEvents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  events = events.map((event) => {
    const mappedEvent = Object.assign({}, event);
    delete mappedEvent.sessions;
    delete mappedEvent.description;
    return mappedEvent;
  });

  // console.log("events: ",events);
  return res.json({
    events,
    total: allEvents.length,
  });
});
 
/**
 * Returns detailed information for an event.
 */
app.get('/events/:id', function(req, res, next) {
  res.setHeader("Content-Type", "application/x-www-form-urlencoded");
  
  // res.setHeader("Content-Type", "application/json");
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  console.log("inside events:id  req.params: ", req.params);
  var eventId = req.params.id;
  var event = fixtures.events.find(function(event) {
      return event.id == eventId;
  });
  // console.log("event",event);
  if (!event) {
      return res.json({ error: 'notFound' });
  }

  return res.json({
      event: event,
  });
});
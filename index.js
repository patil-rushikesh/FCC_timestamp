// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  // Extract date parameter from request 
  const dateParam = req.params.date; 
  // Initialize variable to hold date object
   let dateObject; 
  // if no date parameter is provided, use current date
  if (!dateParam) {
    dateObject = new Date(); 
  }
  // if parameter is in unix timestamp format(5 or more digits), then convert it to a date object
  else if (/\d{5,}/.test(dateParam)) {
    dateObject = new Date(parseInt(dateParam)); 
  }
  // if date parameter in a string, then convert it to  a date object 
  else {
    dateObject = new Date(dateParam); 
  }
  // if date object is invalid, return a error response ({ error: "Invalid Date" })
  if (isNaN(dateObject)) {
    return res.json({ error: "Invalid Date" }); 
  }
  // if date is valid, return unix timestamp and utc string
  else {
    return res.json({unix: dateObject.getTime(), utc: dateObject.toUTCString()}); 
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

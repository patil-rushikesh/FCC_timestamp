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
  const dateParam = req.params.date;
  let dateObject;

  // If no date param, use current date
  if (!dateParam) {
    dateObject = new Date();
  } else if (/^\d{5,}$/.test(dateParam)) {
    // If it's a timestamp (only digits), treat it as milliseconds
    dateObject = new Date(parseInt(dateParam));
  } else {
    // Otherwise, treat it as a date string
    dateObject = new Date(dateParam);
  }

  // Check if date is invalid
  if (isNaN(dateObject.getTime())) {
    return res.json({ error: "Invalid Date" });
  } else {
    return res.json({
      unix: dateObject.getTime(),
      utc: dateObject.toUTCString()
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

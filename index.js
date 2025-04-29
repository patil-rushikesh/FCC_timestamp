const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// Serve index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Hello API (optional endpoint for FCC)
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Timestamp API
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  let date;

  if (!dateParam) {
    // No date param, use current date
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    // If it's a numeric string, treat it as a UNIX timestamp (in milliseconds)
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise, treat as date string
    date = new Date(dateParam);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

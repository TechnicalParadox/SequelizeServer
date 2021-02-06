// ------------------------- SETUP -------------------------
// Dependencies
var express = require('express');
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');

// Module dependencies
const db_config = require("./config/config");

// Create an instance of the expresss app.
var app = express();

// Added so body parser can handle post requests.
// If we didn't have this the body would come back as undefined
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Host static Files so css and js files can be retrieved
app.use(express.static(path.join(__dirname, '/public')));

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
// can set to any number you want, this is not Heroku specific
var PORT = process.env.PORT || 9090;

// Set Handlebars as the default templating engine
app.engine("handlebars", exphbs({ deafaultLayout: "main" }));
app.set("view engine", "handlebars");



// ------------------------- ROUTES (test) -------------------------
app.get("/", function(req, res) {
  let connection = mysql.createConnection(db_config);
  let promisedParanormal_locations = new Promise((resolve, reject) => {
    connection.query("SELECT * FROM paranormal_locations;", function(err, data) {
     console.log(data);
      if (err) {
        return res.status(500).end();
      }
      connection.end();
      // output from '\views\index.handlebars'
      res.render("index");
    });
  });
  promisedParanormal_locations.then((successMessage) => {
    // successMessage is whatever we passed in the resolve(...) function above.
    // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
    res.send(successMessage);
  }); 
});

// ------------------------- APP.LISTEN -------------------------
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on http://localhost:" + PORT);
});
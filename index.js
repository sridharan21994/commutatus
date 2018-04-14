const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
const path = require('path');

app.use(express.static(path.join(__dirname, '/server/static/')));
app.use(express.static(path.join(__dirname, '/client/dist/')));

app.use(bodyParser.urlencoded({
  extended: false
}));    
app.use(bodyParser.json());

app.get("/*", function (req, res) {
  res.sendFile(__dirname + '/server/static/index.html')
})

// start the server
server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000 or http://192.168.0.108:4000');
});
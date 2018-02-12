require('dotenv').config()

const express = require('express')
var bodyParser = require('body-parser');

const app = express()

var issueTransfer = require('./lib/issue-transfer')

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/', function(req, res) {
  if(req.body.type === 'issue_transfer') {
    issueTransfer.sendDiscordMessage(req.body)
  }
})

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 3000!')
})
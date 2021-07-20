const express = require('express'); 
const bodyParser = require('body-parser'); 



const app = express(); 

app.use(express.static(__dirname + '/Public')) 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 






app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html') 
});

module.exports = app 
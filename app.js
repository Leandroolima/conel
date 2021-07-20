const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const rotaCadastros = require('./routes/cadastros')

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/' , (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
})

app.use('/cadastros', rotaCadastros);

module.exports = app
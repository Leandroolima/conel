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

app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/cadastro.html')
})

app.get('/contato', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/fale_conosco.html')
})

app.get('/trabalhe_conel', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/trabalhe_conel.html')
})

app.get('/denuncia', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/denuncia.html')
})

app.use('/cadastros', rotaCadastros);

module.exports = app

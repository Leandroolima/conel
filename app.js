const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const rotaCadastros = require('./routes/cadastros')
const rotaDenuncia = require('./routes/denuncia')
const rotaTrabalhe = require('./routes/trabalhe')

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/' , (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/cadastro.html');
})

app.get('/contato', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/fale_conosco.html');
})

app.get('/trabalhe_conel', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/trabalhe_conel.html');
})

app.get('/denuncia', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/denuncia.html');
})

app.get('/nossa_politica', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/missao_visao_valor.html');
})

app.get('/o_que_fazemos', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/o_que_fazemos.html');
})

app.get('/fique_por_dentro', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/fique_por_dentro.html');
})

app.get('/fornecedores', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/relacoes_com_fornecedores.html');
})

app.get('/saude_trabalho', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/saude_trabalho.html');
})

app.get('/LPT', (req,res) => {
    res.sendFile(__dirname + '/public/paginas/conel_LPT.html');
})

app.use('/denuncia', rotaDenuncia);
app.use('/cadastros', rotaCadastros);
app.use('/trabalhe', rotaTrabalhe);

module.exports = app

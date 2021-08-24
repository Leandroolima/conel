const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const login = require('./middleware/login');

const fs = require('fs');
const dir = process.env.PWD+"/uploads";
/*
//Verifica se não existe
if (!fs.existsSync(dir)){
    console.log('entrou')
    //Efetua a criação do diretório
    fs.mkdir(dir, (err) => {
       
        if (err) {
            console.log(err)
            console.log("Deu ruim...");
            console.log(dir)
            return
        }

        console.log("Diretório criado! =)")
    });
}else{
    console.log('existe')
}
*/

const rotaCadastros = require('./routes/cadastros')
const rotaDenuncia = require('./routes/denuncia')
const rotaTrabalhe = require('./routes/trabalhe')
const rotaUsuario = require('./routes/usuario')

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: true}));
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

app.get('/LPT', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/conel_LPT.html');
})

app.get('/adm/cadastro',  (req, res) => {
    res.sendFile(__dirname + '/public/paginas/adm_cadastro.html')
})

app.get('/energia', (req , res) => {
    res.sendFile(__dirname + '/public/paginas/como-a-energia-eletrica-chega-em-nossas-casas.html')
})

app.get('/adm/denuncia', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/adm_denuncia.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/login.html')
})

app.get('/adm/curriculo',  (req, res) => {
    res.sendFile(__dirname + '/public/paginas/adm_trabalhe.html')
})

app.get('/dashboard',(req, res) => {
    res.sendFile(__dirname + '/public/paginas/dashboard_adm.html')
})

app.get('/luz_para_todos',(req, res) => {
    res.sendFile(__dirname + '/public/paginas/programa-luz-para-todos.html')
})
app.get('/invencao_lampada',(req, res) => {
    res.sendFile(__dirname + '/public/paginas/a-invencao-da-lampada-eletrica.html')
})

app.get('/seguranca', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/seguranca_de_trabalho.html' )
})

app.get('/redes', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/redes_de_distribuicao.html')
})

app.get('/interesses', (req, res) => {
    res.sendFile(__dirname + '/public/paginas/grupo_de_interesse.html')
})


app.use('/denuncias', rotaDenuncia);
app.use('/cadastros', rotaCadastros);
app.use('/trabalhe', rotaTrabalhe);
app.use('/usuario', rotaUsuario);

module.exports = app

//ok

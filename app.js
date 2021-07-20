<<<<<<< HEAD
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
=======
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
>>>>>>> 4bf14f46dad9c70d37ba6f591edfac31838f9424

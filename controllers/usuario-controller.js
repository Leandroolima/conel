const mysql = require('../mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.cadastrarUsuario = async (req, res, next) => {

    try {
        var query = 'SELECT * FROM usuarios WHERE email = ?';
        var result = await mysql.execute(query, [req.body.email]);

        if(result.length > 0){
            return res.status(409).send({ mensagem: 'Usuário já cadastrado'})
        }

        const hash = await bcrypt.hashSync(req.body.password, 10);

        query = 'INSERT INTO usuarios (email, password) VALUES (?,?)';
        const results = await mysql.execute(query, [req.body.email,hash]);

        const response = {
            mensagem: 'Usuário criado com sucesso',
            usuarioCriado: {
                id_usuario: results.inserId,
                email: req.body.email,
                hash: hash,
                password: req.body.password
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.postLogin = async (req, res, next) => {

    try {
        const query = `SELECT * FROM usuarios WHERE email = ?`;
        const results = await mysql.execute(query, [req.body.email]);

        if (results.length < 1) {
            return res.status(401).send({ message: 'Falha na autenticação' })
        }

        console.log(results[0])
        if (await bcrypt.compareSync(req.body.password, results[0].password)) {
            
            const token = jwt.sign({
                id_usuario: results[0].id_usuario,
                email: results[0].email,
                
            },
            process.env.JWT_KEY,
            {
                expiresIn: "6h"
            });
            return res.status(200).send({
                message: 'Autenticado com sucesso',
                token: token
            });
        }
        return res.status(401).send({ message: 'Falha na autenticação' })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Falha na autenticação' });
        
    }
};

exports.getLogin = async (req, res, next) => {

    try {
        const query = `SELECT * FROM usuarios WHERE email = ?`;

        
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Falha na autenticação' });
        
    }
};
const mysql = require('../mysql')

exports.postDenuncia = async (req, res, next) => {
    try {
        const query = `INSERT INTO canal_denuncia(canal_denuncia,data_denuncia, arquivo)
                       VALUES (?,?,?)`
        const result = await mysql.execute(query, [
            req.body.canal_denuncia,
            req.body.data_denuncia, 
            req.file.path.replace("public", "")
        ]);
        const response = {
            mensagem: 'denuncia cadastrada com sucesso',
            cadastrado: {
                id_denuncia: result.insertId,
                denuncia: req.body.canal_denuncia,
                data_denuncia: req.body.data_denuncia,
                arquivo: req.file.path,
                request: {
                    tipo: 'POST',
                    descricao: 'insere uma denuncia',
                    url: process.env.URL_API + 'denuncia'
                }
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error })
    }
}

exports.getDenuncia = async (req, res, next) => {
    try {
        const result = await mysql.execute('SELECT * FROM canal_denuncia');

        const response = {
            mensagem: 'Dados da denuncia',
            cadastrado: result.map(cadastrado => {
                return{
                    id_denuncia: cadastrado.id_denuncia,
                    denuncia: cadastrado.canal_denuncia,
                    data_denuncia: cadastrado.data_denuncia,
                    arquivo: cadastrado.arquivo,
                    request: {
                        tipo: 'POST',
                        descricao: 'Pega os cadastro de denuncias',
                        url: process.env.URL_API + 'denuncia'
                    }
                }
            })
        }
        return res.status(201).send(response);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error })
    }
}

exports.getUmaDenuncia = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM canal_denuncia WHERE id_denuncia = ?;'
        const result = await mysql.execute(query, [req.params.id_denuncia]) 
        
        const response = {
            mensagem: 'Arquivo encontrado com sucesso',
            cadastrado: {
                id_denuncia: result[0].id_denuncia,
                denuncia: result[0].canal_denuncia,
                data_denuncia: result[0].data_denuncia,
                arquivo: result[0].arquivo,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna um Arquivo',
                    url: process.env.URL_API + result[0].id_denuncia
                }
            }
        }
        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error })
    }
}
exports.deleteDenuncia = async(req, res, next) => {
    try {
        const query =  "DELETE FROM canal_denuncia WHERE id_denuncia = ?"
        await mysql.execute(query, [req.params.id_denuncia])

        const response = {
            mensagem: 'Denuncia removida com sucesso',
            request: {
                id_denuncia: req.params.id_denuncia,
                tipo: 'POST',
                descricao: 'Insere um produto',
                url: 'http://localhost:3000/produtos',
                body: {
                    nome: 'String',
                    preco: 'Number'
                }
            }
        }
        res.status(202).send(response)

    } catch (error) {
        return res.status(500).send({ error: error });
    }
}
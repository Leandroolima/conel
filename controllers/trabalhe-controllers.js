const mysql = require('../mysql')

exports.postTrabalhe = async (req, res, next) => {
    try {
        const query = `INSERT INTO trabalhe_conel(conte_mais, data_curriculo,arquivo)
                       VALUES (?,?,?)`
        const result = await mysql.execute(query, [
            req.body.conte_mais,
            req.body.data_curriculo,
            req.file.path.replace("public" ,"")
        ]);
        const response = {
            mensagem: 'Formulario cadastrado com sucesso',
            cadastrado: {
                id_trabalhe: result.insertId,
                formulario: req.body.conte_mais,
                data_curriculo: req.body.data_curriculo,
                arquivo: req.file.path,
                request: {
                    tipo: 'POST',
                    descricao: 'insere uma formulario para trabalhar conosco',
                    url: process.env.URL_API + 'trabalhe'
                }
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error })
    }
}

exports.getTrabalhe = async (req, res, next) => {
    try {
        const result = await mysql.execute('SELECT * FROM trabalhe_conel');

        const response = {
            mensagem: 'Dados do Formulario',
            cadastrado: result.map(cadastrado => {
                return{
                    id_trabalhe: cadastrado.id_trabalhe,
                    conte_mais: cadastrado.conte_mais,
                    data_curriculo: cadastrado.data_curriculo,
                    arquivo: cadastrado.arquivo,
                    request: {
                        tipo: 'GET',
                        descricao: 'Pega os formularios de trabalhe conosco ',
                        url: process.env.URL_API + 'trabalhe'
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

exports.getUmCurriculo = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM trabalhe_conel WHERE id_trabalhe = ?;'
        const result = await mysql.execute(query, [req.params.id_trabalhe]) 
        
        const response = {
            mensagem: 'Arquivo encontrado com sucesso',
            cadastrado: {
                id_trabalhe: result[0].id_trabalhe,
                conte_mais: result[0].conte_mais,
                data_curriculo: result[0].data_curriculo,
                arquivo: result[0].arquivo,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna um Arquivo',
                    url: process.env.URL_API + result[0].id_trabalhe
                }
            }
        }
        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error })
    }
}
exports.deleteCurriculo = async(req, res, next) => {
    try {
        const query =  "DELETE FROM trabalhe_conel WHERE id_trabalhe = ?"
        await mysql.execute(query, [req.params.id_trabalhe])

        const response = {
            mensagem: 'Curriculo removido com sucesso',
            request: {
                id_trabalhe: req.params.id_trabalhe,
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
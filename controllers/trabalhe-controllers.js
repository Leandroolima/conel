const mysql = require('../mysql')

exports.postTrabalhe = async (req, res, next) => {
    try {
        const query = `INSERT INTO trabalhe_conel(conte_mais, arquivo)
                       VALUES (?,?)`
        const result = await mysql.execute(query, [
            req.body.conte_mais,
            req.file.path
        ]);
        const response = {
            mensagem: 'Formulario cadastrado com sucesso',
            cadastrado: {
                id_denuncia: result.insertId,
                formulario: req.body.conte_mais,
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
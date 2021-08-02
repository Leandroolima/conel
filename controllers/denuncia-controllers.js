const mysql = require('../mysql')

exports.postDenuncia = async (req, res, next) => {
    try {
        const query = `INSERT INTO canal_denuncia(canal_denuncia, arquivo)
                       VALUES (?,?)`
        const result = await mysql.execute(query, [
            req.body.canal_denuncia,
            req.file.path
        ]);
        const response = {
            mensagem: 'denuncia cadastrada com sucesso',
            cadastrado: {
                id_denuncia: result.insertId,
                denuncia: req.body.canal_denuncia,
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
const mysql = require('../mysql')

exports.postCadastro = async (req, res, next) => {
    try {
        const query = `INSERT INTO cadastro_fornecedores (razao_social, cnpj, endereco, cidade, bairro, estado, cep, telefone1, telefone2, email, inscricao_estadual, arquivo)
                       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
        const result = await mysql.execute(query, [
            req.body.razao_social,
            req.body.cnpj,
            req.body.endereco,
            req.body.cidade,
            req.body.bairro,
            req.body.estado,
            req.body.cep,
            req.body.telefone1,
            req.body.telefone2,
            req.body.email,
            req.body.inscricao_estadual,
            req.file.path
        ]);
        const response = {
            mensagem: 'Fornecedor cadastrado com sucesso',
            cadastrado: {
                id_cadastro: result.insertId,
                razao_social: req.body.razao_social,
                cnpj: req.body.cnpj,
                endereco: req.body.endereco,
                cidade: req.body.cidade,
                bairro: req.body.bairro,
                estado: req.body.estado,
                cep: req.body.cep,
                telefone1: req.body.telefone1,
                telefone2: req.body.telefone2,
                email: req.body.email,
                inscricao_estadual: req.body.inscricao_estadual,
                arquivo: req.file.path,
                request: {
                    tipo: 'POST',
                    descricao: 'insere um cadastro',
                    url: process.env.URL_API + 'cadastros'
                }
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error })
    }
}
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
            req.file.path.replace("public", "")
        ]);
        const response = {
            mensagem: 'Fornecedor cadastrado com sucesso',
            cadastrado: {
                id_cadastrado: result.insertId,
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

exports.getCadastro = async (req, res, next) => {
    try {
        const result = await mysql.execute('SELECT * FROM cadastro_fornecedores');

        const response = {
            mensagem: 'Fornecedor cadastrado com sucesso',
            cadastrado: result.map(cadastrado => {
                return{
                    id_cadastrado: cadastrado.id_cadastrado,
                    razao_social: cadastrado.razao_social,
                    cnpj: cadastrado.cnpj,
                    endereco: cadastrado.endereco,
                    cidade: cadastrado.cidade,
                    bairro: cadastrado.bairro,
                    estado: cadastrado.estado,
                    cep: cadastrado.cep,
                    telefone1: cadastrado.telefone1,
                    telefone2: cadastrado.telefone2,
                    email: cadastrado.email,
                    inscricao_estadual: cadastrado.inscricao_estadual,
                    arquivo: cadastrado.arquivo,
                    request: {
                        tipo: 'POST',
                        descricao: 'insere um cadastro',
                        url: process.env.URL_API + 'cadastros'
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

exports.getUmCadastro = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM cadastro_fornecedores WHERE id_cadastrado = ?;'
        const result = await mysql.execute(query, [req.params.id_cadastrado]) 
        
        const response = {
            mensagem: 'Arquivo encontrado com sucesso',
            cadastrado: {
                id_cadastrado: result[0].id_cadastrado,
                razao_social: result[0].razao_social,
                cnpj: result[0].cnpj,
                endereco: result[0].endereco,
                cidade: result[0].cidade,
                bairro: result[0].bairro,
                estado: result[0].estado,
                cep: result[0].cep,
                telefone1: result[0].telefone1,
                telefone2: result[0].telefone2,
                email: result[0].email,
                inscricao_estadual: result[0].inscricao_estadual,
                arquivo: result[0].arquivo,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna um Arquivo',
                    url: process.env.URL_API + result[0].id_cadastrado
                }
            }
        }
        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error })
    }
}
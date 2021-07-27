class Cadastro {

    constructor() {
        this.arrayCadastros = [];
        this.editId = null
    }
    salvar() {
        let cadastro = this.lerDados();

        if (this.validaCampos(cadastro)) {
            if (this.editId == null) {
                this.adicionar(cadastro)
            } else {
                console.log("chegou")
                this.atualizar(this.editId, cadastro)
            }

        alert('Cadastro realizado')
        document.location.reload(true);
        }
    }

    lerDados() {
        let cadastro = {}

        cadastro.id = 0;
        cadastro.razao_social = document.getElementById('razao_social').value;
        cadastro.cnpj = document.getElementById('cnpj').value;
        cadastro.endereco = document.getElementById('endereco').value;
        cadastro.cidade = document.getElementById('cidade').value;
        cadastro.bairro = document.getElementById('bairro').value
        cadastro.estado = document.getElementById('estado').value
        cadastro.cep = document.getElementById('cep').value
        cadastro.telefone1 = document.getElementById('telefone1').value
        cadastro.telefone2 = document.getElementById('telefone2').value
        cadastro.email = document.getElementById('email').value
        cadastro.inscricao_estadual = document.getElementById('inscricao_estadual').value
        cadastro.arquivo = document.getElementById('arquivo').value
        return cadastro;
    }

    async adicionar(cadastro) {

        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        formData.append('razao_social', cadastro.razao_social);
        formData.append('cnpj', cadastro.cnpj);
        formData.append('endereco', cadastro.endereco)
        formData.append('cidade', cadastro.cidade)
        formData.append('bairro', cadastro.bairro)
        formData.append('estado', cadastro.estado)
        formData.append('cep', cadastro.cep)
        formData.append('telefone1', cadastro.telefone1)
        formData.append('telefone2', cadastro.telefone2)
        formData.append('email', cadastro.email)
        formData.append('inscricao_estadual', cadastro.inscricao_estadual)
        formData.append('arquivo', fileField.files[0]);

        fetch('http://localhost:3000/cadastros', {
            method: 'POST',
            body: formData,

        }).then(result => {
            return result.json();
        }).then(data => {

            cadastro.razao_social = data.cadastrado.razao_social;
            cadastro.cnpj = data.cadastrado.cnpj;
            cadastro.endereco = data.cadastrado.endereco;
            cadastro.cidade = data.cadastrado.cidade;
            cadastro.bairro = data.cadastrado.bairro;
            cadastro.estado = data.cadastrado.estado;
            cadastro.cep = data.cadastrado.cep;
            cadastro.telefone1 = data.cadastrado.telefone1;
            cadastro.telefone2 = data.cadastrado.telefone2;
            cadastro.email = data.cadastrado.email;
            cadastro.inscricao_estadual = data.cadastrado.inscricao_estadual;
            cadastro.arquivo = data.cadastrado.arquivo;

            this.arrayCadastros.push(cadastro);

        });
    }

    validaCampos(cadastro) {
        let msg = '';

        if (cadastro.razao_social == "") {
            msg += '- Informe o nome do Produto'
        }
        if (cadastro.cnpj == "") {
            msg += '- Informe o preco do Produto'
        }
        if (msg != '') {
            alert(msg);
            return false
        }
        return true;

    }
}




var cadastro = new Cadastro
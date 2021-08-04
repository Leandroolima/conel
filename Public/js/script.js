

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
            //document.location.reload(true);
        }
    }

    async listaTabela() {
        fetch('http://localhost:3000/cadastros', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(result => {
            return result.json();
        }).then(data => {
            console.log(data);
            data.cadastrado.forEach(prd => {
                this.arrayCadastros.push(prd);
            });

            console.log(this.arrayCadastros);
            let tbody = document.getElementById('tbody')
            tbody.innerText = ''
            console.log(this.arrayCadastros.length)
            for (let i = 0; i < this.arrayCadastros.length; i++) {
                let tr = tbody.insertRow();

                let td_id = tr.insertCell();
                let td_razao_social = tr.insertCell();
                let td_cnpj = tr.insertCell();
                let td_endereco = tr.insertCell();
                let td_cidade = tr.insertCell();
                let td_bairro = tr.insertCell();
                let td_estado = tr.insertCell();
                let td_cep = tr.insertCell();
                let td_telefone1 = tr.insertCell();
                let td_email = tr.insertCell();
                let td_inscricao_estadual = tr.insertCell();
                let td_acoes = tr.insertCell();


                td_id.innerText = this.arrayCadastros[i].id_cadastrado;
                td_razao_social.innerText = this.arrayCadastros[i].razao_social;
                td_cnpj.innerText = this.arrayCadastros[i].cnpj;
                td_endereco.innerText = this.arrayCadastros[i].endereco;
                td_cidade.innerText = this.arrayCadastros[i].cidade
                td_bairro.innerText = this.arrayCadastros[i].bairro;
                td_estado.innerText = this.arrayCadastros[i].estado;
                td_cep.innerText = this.arrayCadastros[i].cep;
                td_telefone1.innerText = this.arrayCadastros[i].telefone1;
                td_email.innerText = this.arrayCadastros[i].email;
                td_inscricao_estadual.innerText = this.arrayCadastros[i].inscricao_estadual;
                td_cnpj.innerText = document.getElementById('denuncia').innerText = this.arrayCadastros[i].cnpj;
                console.log(td_cnpj)


                td_id.classList.add('center');

                let imgVisualizar = document.createElement('img');
                imgVisualizar.src = '../img/eye.png'
                imgVisualizar.setAttribute("onclick", "cadastro.visualizar(" + this.arrayCadastros[i].id_cadastrado + ")")

                td_acoes.appendChild(imgVisualizar)
            }
        });

    }
    lerDados() {
        let cadastro = {}

        if (cadastro.arquivo === ".docx") {
            alert("tipo de arquivo n é aceito")
        }
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
            msg += '- Informe a Razao_social'
        }
        if (cadastro.cnpj == "") {
            msg += '- Informe o Cnpj'
        }
        if (cadastro.cnpj == "") {
            msg += '- Informe o endereco'
        }
        if (cadastro.cidade == "") {
            msg += '- Informe a Cidade'
        }
        if (cadastro.bairro == "") {
            msg += '- Informe o Bairro'
        }
        if (cadastro.estado == "") {
            msg += '- Informe o Estado'
        }
        if (cadastro.telefone1 == "") {
            msg += '- Informe o Telefone1'
        }
        console.log('passei')
        console.log(checarEmail)
        if (cadastro.email != checarEmail()) {
            msg += '- Informe o Email'
        }
        if (cadastro.inscricao_estadual == "") {
            msg += '- Informe a Inscricao Estadual'
        }

        if (document.querySelector('input[type="file"]').files[0] == undefined) {
            msg += '- Insira o arquivo'
        }
        if (msg != '') {
            alert(msg);
            return false
        }
        return true;

    }
    async visualizar(id_cadastrado) {
        fetch('http://localhost:3000/cadastros/' + id_cadastrado)
            .then(result => {
                console.log(result)
                return result.json()
            }).then(data => {
                console.log(data)
                for (let i = 0; i < this.arrayCadastros.length; i++) {
                    if (this.arrayCadastros[i].id_cadastrado == id_cadastrado) {
                        window.location.assign("http://localhost:3000" + data.cadastrado.arquivo)

                    }
                }
            });

    }
}



var cadastro = new Cadastro

class Denuncia {
    constructor() {
        this.arrayDenuncia = [];
        this.editId = null
    }
    salvar() {
        let denuncia = this.lerDados();

        if (this.validaCampos(denuncia)) {
            if (this.editId == null) {
                this.adicionar(denuncia)
            } else {
                console.log("chegou")
                this.atualizar(this.editId, denuncia)
            }

            alert('denuncia realizado')
            document.location.reload(true);
        }
    }
    async listaTabela() {
        fetch('http://localhost:3000/denuncias', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(result => {
            return result.json();
        }).then(data => {
            console.log(data);
            data.cadastrado.forEach(prd => {
                this.arrayDenuncia.push(prd);
            });

           /* let tbody = document.getElementById('tbody')
            tbody.innerText = ''
            console.log(this.arrayDenuncia.length)*/
            for (let i = 0; i < this.arrayDenuncia.length; i++) {

                let buttonaccodeon = document.createElement('button');
                buttonaccodeon.classList.add("accordion");

                let imgVisualizar = document.createElement('img');
                imgVisualizar.classList.add("botaoaccordion");
                imgVisualizar.src="../img/arrow-card-dash-down.svg";

                let iddenuncia0 = document.createElement('span');
                iddenuncia0.innerText = "DENUNCIA N: " 

                let iddenuncia = document.createElement('span');
                iddenuncia.setAttribute("id", "denuncia_numero"+i);

                let datadenuncia0 = document.createElement('span');
                datadenuncia0.innerText = "DATA DA DENUNCIA: " 
                
                let datadenuncia = document.createElement('span');
                datadenuncia.setAttribute("id", "data_denuncia"+i);

                iddenuncia.innerText = this.arrayDenuncia[i].id_denuncia



                td_id.innerText = this.arrayDenuncia[i].id_denuncia;
                td_canal_denuncia.innerText = this.arrayDenuncia[i].denuncia;


                td_id.classList.add('center');

                let imgVisualizar = document.createElement('img');
                imgVisualizar.src = '../img/eye.png'
                imgVisualizar.setAttribute("onclick", "cadastro.visualizar(" + this.arrayDenuncia[i].id_denuncia + ")")

                td_acoes.appendChild(imgVisualizar)
            }
        });


        
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }

    }
    lerDados() {
        let denuncia = {}

        denuncia.id = 0;
        denuncia.canal_denuncia = document.getElementById('conte_mais').value;
        denuncia.arquivo = document.getElementById('arquivo').value
        return denuncia;
    }

    async adicionar(denuncia) {

        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        formData.append('canal_denuncia', denuncia.canal_denuncia);
        formData.append('arquivo', fileField.files[0]);

        fetch('http://localhost:3000/denuncia', {
            method: 'POST',
            body: formData,

        }).then(result => {
            return result.json();
        }).then(data => {

            denuncia.canal_denuncia = data.cadastrado.canal_denuncia;
            denuncia.arquivo = data.cadastrado.arquivo;

            this.arrayDenuncia.push(denuncia);

        });
    }

    validaCampos(denuncia) {
        let msg = '';

        if (denuncia.canal_denuncia == "") {
            msg += '- Informe o nome do Produto'
        }
        if (denuncia.arquivo == "") {
            msg += '- Informe o preco do Produto'
        }
        if (msg != '') {
            alert(msg);
            return false
        }
        return true;

    }

}

var denuncia = new Denuncia

class Trabalhe {
    constructor() {
        this.arrayTrabalhe = [];
        this.editId = null
    }
    salvar() {
        let trabalhe = this.lerDados();

        if (this.validaCampos(trabalhe)) {
            if (this.editId == null) {
                this.adicionar(trabalhe)
            } else {
                console.log("chegou")
                this.atualizar(this.editId, trabalhe)
            }

            alert('trabalhe realizado')
            document.location.reload(true);
        }
    }

    lerDados() {
        let trabalhe = {}

        trabalhe.id = 0;
        trabalhe.conte_mais = document.getElementById('conte_mais').value;
        trabalhe.arquivo = document.getElementById('arquivo').value
        return trabalhe;
    }

    async adicionar(trabalhe) {

        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        formData.append('conte_mais', trabalhe.conte_mais);
        formData.append('arquivo', fileField.files[0]);

        fetch('http://localhost:3000/trabalhe', {
            method: 'POST',
            body: formData,

        }).then(result => {
            return result.json();
        }).then(data => {

            trabalhe.conte_mais = data.cadastrado.conte_mais;
            trabalhe.arquivo = data.cadastrado.arquivo;

            this.arrayTrabalhe.push(trabalhe);

        });
    }

    validaCampos(trabalhe) {
        let msg = '';

        if (trabalhe.conte_mais == "") {
            msg += '- Informe o nome do Produto'
        }
        if (trabalhe.arquivo == "") {
            msg += '- Informe o preco do Produto'
        }
        if (msg != '') {
            alert(msg);
            return false
        }
        return true;

    }
}

var trabalhe = new Trabalhe


function fMasc(objeto, mascara) {
    obj = objeto
    masc = mascara
    setTimeout("fMascEx()", 1)
}
function fMascEx() {
    obj.value = masc(obj.value)
}
function mTel(tel) {
    tel = tel.replace(/\D/g, "")
    tel = tel.replace(/^(\d)/, "($1")
    tel = tel.replace(/(.{3})(\d)/, "$1)$2")
    if (tel.length == 9) {
        tel = tel.replace(/(.{1})$/, "-$1")
    } else if (tel.length == 10) {
        tel = tel.replace(/(.{2})$/, "-$1")
    } else if (tel.length == 11) {
        tel = tel.replace(/(.{3})$/, "-$1")
    } else if (tel.length == 12) {
        tel = tel.replace(/(.{4})$/, "-$1")
    } else if (tel.length > 12) {
        tel = tel.replace(/(.{4})$/, "-$1")
    }
    return tel;
}
function mCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, "")
    cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2")
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2")
    cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2")
    return cnpj
}

function mCEP(cep) {
    cep = cep.replace(/\D/g, "")
    cep = cep.replace(/^(\d{2})(\d)/, "$1.$2")
    cep = cep.replace(/\.(\d{3})(\d)/, ".$1-$2")
    return cep
}
function mNum(num) {
    num = num.replace(/\D/g, "")
    return num
}

const options = {
    method: "GET",
    mode: "cors",
    caches: "default"
}


function completar() {
    const cep = document.getElementById("cep")
    // let Cep = document.getElementById("cep").value;
    //  console.log(Cep)
    let search = cep.value.replace("-", "")
    search = search.replace(".", "")
    fetch(`https://viacep.com.br/ws/${search}/json/`, options).then((response) => {
        response.json().then(data => {
            console.log(data)
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("endereco").value = data.logradouro;
            document.getElementById("estado").value = data.uf;

        })
    })
}

function enviar() {
    let bairro = document.getElementById("bairro").value;
    let localidade = document.getElementById("cidade").value;
    let logradouro = document.getElementById("endereco").value;
    let uf = document.getElementById("estado").value;
    let json = {
        "bairro": bairro,
        "localidade": localidade,
        "logradouro": logradouro,
        "uf": uf,
    }
    console.log(json)
}

function checarEmail() {

    var checar = document.getElementById('email').value
    if (document.getElementById('email').value == ""
        || document.getElementById('email').value.indexOf('@') == -1
        || document.getElementById('email').value.indexOf('.') == -1) {
        document.getElementById("tooltiptext").style.opacity = "1";
        console.log(checar)
        return checar = 17;
    } else {
        document.getElementById("tooltiptext").style.opacity = "0";
        console.log("aqui")
        console.log(checar)
        return checar
    }
}


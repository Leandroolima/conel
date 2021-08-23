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
            }

            alert('Cadastro realizado')
            document.location.reload(true);
        }
    }

    async listaTabela() {
        fetch('/cadastros', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(result => {
            return result.json();
        }).then(data => {
            data.cadastrado.forEach(prd => {
                this.arrayCadastros.push(prd);
            });

            let tbody = document.getElementById('tbody')
            tbody.innerText = ''
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
                let td_telefone2 = tr.insertCell();
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
                td_telefone2.innerText = this.arrayCadastros[i].telefone2;
                td_email.innerText = this.arrayCadastros[i].email;
                td_inscricao_estadual.innerText = this.arrayCadastros[i].inscricao_estadual;


                td_id.classList.add('center');

                let imgVisualizar = document.createElement('img');
                imgVisualizar.src = '../img/eye.png'
                imgVisualizar.setAttribute("onclick", "cadastro.visualizar(" + this.arrayCadastros[i].id_cadastrado + ")")
                imgVisualizar.classList.add("icon-3")

                let imgExcluir = document.createElement('img');
                imgExcluir.src = '../img/x.png'
                imgExcluir.setAttribute("onclick", "cadastro.excluir(" + this.arrayCadastros[i].id_cadastrado + ")")
                imgExcluir.classList.add("icon-3")

                td_acoes.appendChild(imgVisualizar)
                td_acoes.appendChild(imgExcluir)
            }
        });

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

        fetch('/cadastros', {
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
        fetch('/cadastros/' + id_cadastrado)
            .then(result => {
                return result.json()
            }).then(data => {
                for (let i = 0; i < this.arrayCadastros.length; i++) {
                    console.log("passou aqui")
                    if (this.arrayCadastros[i].id_cadastrado == id_cadastrado) {
                        console.log(data.cadastrado.arquivo)
                        window.location.assign(data.cadastrado.arquivo)

                    }
                }
            });

    }
    async excluir(id_cadastrado){
        if (confirm('Deseja realmente deletar a denuncia N ' + id_cadastrado)) {
            fetch('/cadastros/' + id_cadastrado, {
                method: 'DELETE'
            }).then(result => {
                return result.json();
            }).then(data => {

                for (let i = 0; i < this.arrayCadastros.length; i++) {
                    if (this.arrayCadastros[i].id_cadastrado == id_cadastrado) {
                        this.arrayCadastros.splice(this.arrayCadastros, 1);
                        document.location.reload(true);
                    }
                }
            })
        }
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
            }

            alert('Denuncia Realizada')
            document.location.reload(true);
        }
    }
    async listaDenuncia() {

        fetch('/denuncias', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(result => {
            return result.json();
        }).then(data => {
            data.cadastrado.forEach(prd => {
                this.arrayDenuncia.push(prd);
            });

            for (let i = 0; i < this.arrayDenuncia.length; i++) {

                let buttonaccodeon = document.createElement('button');
                buttonaccodeon.classList.add("accordion");
                buttonaccodeon.addEventListener("click", function () {

                    this.classList.toggle("active");
                    var panel = this.nextElementSibling;

                    if (panel.style.display === "block") {
                        panel.style.display = "none";
                    } else {
                        panel.style.display = "block";
                    }

                });
                document.getElementsByClassName("coluna")[0].appendChild(buttonaccodeon);
                buttonaccodeon.innerHTML = `<img class="botaoaccordion" src="../img/arrow-card-dash-down.svg"> <span id="denuncia_numero">DENUNCIA Nº </span> <span id="denuncia_numero">${this.arrayDenuncia[i].id_denuncia}</span> 
                <span id="texto-denuncia-2">DATA: </span> <span id="data_denun">${this.arrayDenuncia[i].data_denuncia}</span>`

                document.getElementsByClassName("coluna")[0].appendChild(buttonaccodeon);

                let divpanel = document.createElement('div');
                divpanel.classList.add("panel");


                divpanel.innerHTML = `<div class="row-1">
                                       <div class="col-6"> 
                                       <p id="descricao_denuncia">${this.arrayDenuncia[i].denuncia}</p>
                                       </div>
                                       <div class="col-6 alinhar-denuncia">
                                       <img class="icon-1" onclick="denuncia.visualizar(${this.arrayDenuncia[i].id_denuncia})" src="../img/eye.png">
                                       <img class="icon-2" onclick="denuncia.excluir(${this.arrayDenuncia[i].id_denuncia})" src="../img/excluir.png">
                                       </div>
                                       </div>`

                document.getElementsByClassName("coluna")[0].appendChild(divpanel);

            }
        });

    }
    data() {
        let dada = new Date()
        document.getElementById("data_denuncia").value = dada.toString()
        document.getElementById("data_denuncia").value
        this.lerDados
    }

    lerDados() {
        let denuncia = {}

        this.data()
        denuncia.id = 0;
        denuncia.canal_denuncia = document.getElementById('conte_mais').value;
        denuncia.data_denuncia = document.getElementById('data_denuncia').value.replace("GMT-0300 (Horário Padrão de Brasília)", "")
        denuncia.arquivo = document.getElementById('arquivo').value

        return denuncia;
    }

    async adicionar(denuncia) {

        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        formData.append('canal_denuncia', denuncia.canal_denuncia);
        formData.append('data_denuncia', denuncia.data_denuncia);
        formData.append('arquivo', fileField.files[0]);

        fetch('/denuncias', {
            method: 'POST',
            body: formData,

        }).then(result => {
            return result.json();
        }).then(data => {

            denuncia.canal_denuncia = data.cadastrado.canal_denuncia;
            denuncia.arquivo = data.cadastrado.arquivo;
            denuncia.data_denuncia = data.cadastrado.data_denuncia;

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
    async visualizar(id_denuncia) {
        fetch('/denuncias/' + id_denuncia)
            .then(result => {
                return result.json()
            }).then(data => {
                for (let i = 0; i < this.arrayDenuncia.length; i++) {
                    if (this.arrayDenuncia[i].id_denuncia == id_denuncia) {
                        window.location.assign(data.cadastrado.arquivo)

                    }
                }
            });

    }
    async excluir(id_denuncia){
        if (confirm('Deseja realmente deletar a denuncia N ' + id_denuncia)) {
            fetch('/denuncias/' + id_denuncia, {
                method: 'DELETE'
            }).then(result => {
                return result.json();
            }).then(data => {

                for (let i = 0; i < this.arrayDenuncia.length; i++) {
                    if (this.arrayDenuncia[i].id_denuncia == id_denuncia) {
                        this.arrayDenuncia.splice(this.arrayDenuncia, 1);
                        document.location.reload(true);
                    }
                }
            })
        }
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
            } 
            alert('Curriculo Cadastrado')
            document.location.reload(true);
        }
    }

    lerDados() {
        let trabalhe = {}

        this.data()
        trabalhe.id = 0;
        trabalhe.conte_mais = document.getElementById('conte_mais').value;
        trabalhe.arquivo = document.getElementById('arquivo').value
        trabalhe.data_curriculo = document.getElementById('data_curriculo').value.replace("GMT-0300 (Horário Padrão de Brasília)", "")
        return trabalhe;
    }
    async listaTrabalhe() {

        fetch('/trabalhe', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(result => {
            return result.json();
        }).then(data => {
            data.cadastrado.forEach(prd => {
                this.arrayTrabalhe.push(prd);
            });
            for (let i = 0; i < this.arrayTrabalhe.length; i++) {

                let buttonaccodeon = document.createElement('button');
                buttonaccodeon.classList.add("accordion");
                buttonaccodeon.addEventListener("click", function () {

                    this.classList.toggle("active");
                    var panel = this.nextElementSibling;

                    if (panel.style.display === "block") {
                        panel.style.display = "none";
                    } else {
                        panel.style.display = "block";
                    }

                });
                document.getElementsByClassName("coluna")[0].appendChild(buttonaccodeon);
                buttonaccodeon.innerHTML = `<img class="botaoaccordion" src="../img/arrow-card-dash-down.svg"> <span id="denuncia_numero">CURRICULO Nº </span> <span id="denuncia_numero">${this.arrayTrabalhe[i].id_trabalhe}</span> 
                <span id="texto-denuncia-2">DATA: </span> <span id="data_denun">${this.arrayTrabalhe[i].data_curriculo}</span>`

                document.getElementsByClassName("coluna")[0].appendChild(buttonaccodeon);

                let divpanel = document.createElement('div');
                divpanel.classList.add("panel");


                divpanel.innerHTML = `<div class="row-1">
                                       <div class="col-6"> 
                                       <p id="descricao_denuncia">${this.arrayTrabalhe[i].conte_mais}</p>
                                       </div>
                                       <div class="col-6 alinhar-denuncia">
                                       <img class="icon-1" onclick="trabalhe.visualizar(${this.arrayTrabalhe[i].id_trabalhe})" src="../img/eye.png">
                                       <img class="icon-2" onclick="trabalhe.excluir(${this.arrayTrabalhe[i].id_trabalhe})" src="../img/excluir.png">
                                       </div>
                                       </div>`

                document.getElementsByClassName("coluna")[0].appendChild(divpanel);

            }
        });

    }
    data() {
        let dada = new Date()
        document.getElementById("data_curriculo").value = dada.toString()
        document.getElementById("data_curriculo").value
        this.lerDados
    }

    async adicionar(trabalhe) {

        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        formData.append('conte_mais', trabalhe.conte_mais);
        formData.append('data_curriculo', trabalhe.data_curriculo);
        formData.append('arquivo', fileField.files[0]);

        fetch('/trabalhe', {
            method: 'POST',
            body: formData,

        }).then(result => {
            return result.json();
        }).then(data => {

            trabalhe.conte_mais = data.cadastrado.conte_mais;
            trabalhe.arquivo = data.cadastrado.arquivo;
            trabalhe.data_curriculo = data.cadastrado.data_curriculo;

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
    async visualizar(id_trabalhe) {
        fetch('/trabalhe/' + id_trabalhe)
            .then(result => {
                return result.json()
            }).then(data => {
                for (let i = 0; i < this.arrayTrabalhe.length; i++) {
                    if (this.arrayTrabalhe[i].id_trabalhe == id_trabalhe) {
                        window.location.assign("trabalhe/" + data.cadastrado.arquivo)

                    }
                }
            });

    }
    async excluir(id_trabalhe){
        if (confirm('Deseja realmente deletar o curriculo N ' + id_trabalhe)) {
            fetch('/trabalhe/' + id_trabalhe, {
                method: 'DELETE'
            }).then(result => {
                return result.json();
            }).then(data => {

                for (let i = 0; i < this.arrayTrabalhe.length; i++) {
                    if (this.arrayTrabalhe[i].id_trabalhe == id_trabalhe) {
                        this.arrayTrabalhe.splice(this.arrayTrabalhe, 1);
                        document.location.reload(true);
                    }
                }
            })
        }
    }
}

var trabalhe = new Trabalhe


class Login {
    constructor() {
        this.arrayLogin = [];
        this.editId = null
    }
    salvar() {
        let login = this.lerDados();

        if (this.validaCampos(login)) {
            if (this.editId == null) {
                this.adicionar(login)
            }
        }
    }

    lerDados() {
        let login = {}

        login.id = 0;
        login.email = document.getElementById('email').value;
        login.password = document.getElementById('password').value
        return login;
    }
    async adicionar(login) {
        fetch('/usuario/login', {
            method: 'POST',
            body: JSON.stringify(login),
            headers:{
                "Content-type": "application/json; charset=utf-8"
            }

        }).then(result => {
            return result.json();
        }).then(data => {

            login.email = data.email;
            login.password = data.password;

            this.arrayLogin.push(login);
            this.salvarToken(data);

        });
    }
    salvarToken(data){
        let token
        token = data.token
        console.log(token)
        this.entrar(token)
       
    }
    entrar(token){
        fetch('/usuario/login', {
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }) 
        //window.history.back();
    }

    validaCampos(login) {
        let msg = '';

        if (login.email == "") {
            msg += '- Informe o nome do Produto'
        }
        if (login.password == "") {
            msg += '- Informe o preco do Produto'
        }
        if (msg != '') {
             t(msg);
            return false
        }
        return true;

    }
}

var login = new Login

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
    let search = cep.value.replace("-", "")
    search = search.replace(".", "")
    fetch(`https://viacep.com.br/ws/${search}/json/`, options).then((response) => {
        response.json().then(data => {
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
}

function checarEmail() {

    var checar = document.getElementById('email').value
    if (document.getElementById('email').value == ""
        || document.getElementById('email').value.indexOf('@') == -1
        || document.getElementById('email').value.indexOf('.') == -1) {
        document.getElementById("tooltiptext").style.opacity = "1";

        return checar = 17;
    } else {
        document.getElementById("tooltiptext").style.opacity = "0";
        return checar
    }
}

let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();
});

searchBtn.addEventListener("click", ()=>{ 
  sidebar.classList.toggle("open");
  menuBtnChange(); 
});


function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");
 }
}


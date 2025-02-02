const nome = document.getElementById("name");
const endereco = document.getElementById("endereco");
const telefone = document.getElementById("telefone");
const observacoes = document.getElementById("observacoes");
const divContainer = document.querySelector(".container");
const form = document.getElementById("userForm");

const inputPesquisa = document.getElementById("search");
const btnPesquisar = document.getElementById("btn-pesquisar");

import { criarListaClientes } from "./src/js/criar-lista.js";
// import { pesquisar } from "./src/js/pesquisar.js";

//Evento que vai buscar clientes no server.json
btnPesquisar.addEventListener("click", () => {
    const pesquisa = inputPesquisa.value.toUpperCase();
    let h2 = divContainer.querySelector("h2");

    if (!h2) {
        h2 = document.createElement("h2");
        divContainer.appendChild(h2);
    }

    if (!pesquisa) {
        h2.textContent = "Por favor, insira um nome para pesquisar.";

        return;
    }

    // Fazendo a requisição ao arquivo JSON
    fetch("http://localhost:3333/clientes").then((response) =>
        response.json().then((dados) => {
            dados.map((cliente) => {
                const pesquisaIgual = cliente.name === pesquisa;

                if (!pesquisaIgual) {
                    h2.textContent = "Cliente Não Encontrado";
                    divClientes.remove();
                }

                if (pesquisaIgual) {
                    h2.textContent = "Cliente Encontrado:";

                    const divClientes = document.createElement("div");
                    divClientes.classList.add("box-clientes");

                    const h3 = document.createElement("h3");
                    h3.textContent = `Nome: ${cliente.name}`;

                    const pEndereco = document.createElement("p");
                    pEndereco.textContent = `Endereço: ${cliente.endereco}`;

                    const pTelefone = document.createElement("p");
                    pTelefone.textContent = `Telefone: ${cliente.telefone}`;

                    const pObservacoes = document.createElement("p");
                    pObservacoes.textContent = `Observações: ${cliente.observacoes}`;

                    const btnNovaConsulta = document.createElement("button");
                    btnNovaConsulta.textContent = "Nova Consulta";
                    btnNovaConsulta.classList.add("btn-box-clientes");
                    btnNovaConsulta.addEventListener("click", () => {
                        btnPesquisar.disabled = false;
                        limparInputs();
                        h2.textContent = "";
                        divClientes.remove();
                    });

                    divClientes.append(
                        h3,
                        pEndereco,
                        pTelefone,
                        pObservacoes,
                        btnNovaConsulta
                    );
                    divContainer.append(divClientes);

                    if (divClientes) {
                        btnPesquisar.disabled = true;
                    }
                }
            });
        })
    );
    limparInputs();
});

//Evento que vai criar os dados, e mandar para o server.json
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    criarListaClientes(
        nome,
        endereco,
        telefone,
        observacoes,
        divContainer,
        form
    );
});

//Funcao para limopar os inputs
function limparInputs() {
    inputPesquisa.value = "";
    nome.value = "";
    endereco.value = "";
    telefone.value = "";
    observacoes.value = "";
}

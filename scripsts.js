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
    const pesquisa = inputPesquisa.value.trim().toUpperCase(); // Captura o valor e converte para maiúsculas para evitar problemas com case-sensitive
    let h2 = divContainer.querySelector("h2");

    // Se não encontrar o h2, cria um novo
    if (!h2) {
        h2 = document.createElement("h2");
        divContainer.appendChild(h2);
    }

    // Se não houver nada no campo de pesquisa
    if (!pesquisa) {
        h2.textContent = "Por favor, insira um nome para pesquisar.";
        return;
    }

    // Fazendo a requisição ao arquivo JSON no servidor local
    fetch("http://localhost:3333/clientes") // Aqui você deve usar o caminho correto para o seu arquivo JSON
        .then((response) => response.json()) // Converte a resposta em formato JSON
        .then((dados) => {
            // Procurar um cliente que tenha o nome igual ao pesquisado
            const clienteEncontrado = dados.find(
                (cliente) => cliente.name.toUpperCase() === pesquisa
            );

            // Se o cliente for encontrado
            if (clienteEncontrado) {
                h2.textContent = "Cliente Encontrado:";

                // Criar a div com as informações do cliente
                const divClientes = document.createElement("div");
                divClientes.classList.add("box-clientes");

                const h3 = document.createElement("h3");
                h3.textContent = `Nome: ${clienteEncontrado.name}`;

                const pEndereco = document.createElement("p");
                pEndereco.textContent = `Endereço: ${clienteEncontrado.endereco}`;

                const pTelefone = document.createElement("p");
                pTelefone.textContent = `Telefone: ${clienteEncontrado.telefone}`;

                const pObservacoes = document.createElement("p");
                pObservacoes.textContent = `Observações: ${clienteEncontrado.observacoes}`;

                const btnNovaConsulta = document.createElement("button");
                btnNovaConsulta.textContent = "Nova Consulta";
                btnNovaConsulta.classList.add("btn-box-clientes");
                btnNovaConsulta.addEventListener("click", () => {
                    // Limpa a pesquisa e o conteúdo exibido
                    inputPesquisa.value = "";
                    h2.textContent = "";
                    divClientes.remove();
                });

                // Anexando os elementos ao DOM
                divClientes.append(
                    h3,
                    pEndereco,
                    pTelefone,
                    pObservacoes,
                    btnNovaConsulta
                );
                divContainer.append(divClientes);
            } else {
                // Se não encontrar o cliente
                h2.textContent = "Cliente Não Encontrado";
            }
        })
        .catch((error) => {
            h2.textContent = "Erro ao buscar dados.";
            console.error(error);
        });
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

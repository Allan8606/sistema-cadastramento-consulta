// criarListaClientes.js

import { criarDados } from "./criar-dados.js"; // Importa a função criarDados

export function criarListaClientes(
    nome,
    endereco,
    telefone,
    observacoes,
    divContainer,
    form
) {
    const h2 = document.createElement("h2");
    h2.textContent = "Confirme as informações:";

    const divClientes = document.createElement("div");
    divClientes.classList.add("box-clientes");

    const h3 = document.createElement("h3");
    h3.textContent = `Nome: ${nome.value.toUpperCase()}`;

    const pEndereco = document.createElement("p");
    pEndereco.textContent = `Endereço: ${endereco.value}`;

    const pTelefone = document.createElement("p");
    pTelefone.textContent = `Telefone: ${telefone.value}`;

    const pObservacoes = document.createElement("p");
    pObservacoes.textContent = `Observações: ${observacoes.value}`;

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.classList.add("btn-box-clientes");
    btnRemover.addEventListener("click", () => {
        h2.remove();
        divClientes.remove();
        form.reset();
    });

    const btnAdd = document.createElement("button");
    btnAdd.textContent = "Adicionar";
    btnAdd.classList.add("btn-box-clientes");
    btnAdd.addEventListener("click", () => {
        criarDados(nome, endereco, telefone, observacoes); // Chama a função que foi importada
        h2.remove();
        divClientes.remove();
        form.reset();
        alert("Cliente cadastrado com sucesso!");
    });

    divClientes.append(
        h3,
        pEndereco,
        pTelefone,
        pObservacoes,
        btnRemover,
        btnAdd
    );
    divContainer.append(h2, divClientes);
}

//Criar dados para o json
export async function criarDados(nome, endereco, telefone, observacoes) {
    const cliente = {
        name: nome.value,
        endereco: endereco.value,
        telefone: telefone.value,
        observacoes: observacoes.value,
    };

    await fetch("http://localhost:3333/clientes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
    });
}

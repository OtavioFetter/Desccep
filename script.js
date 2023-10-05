//faz com que quando o usuário utilize a tecla enter o valor apareça
document.getElementById('cep').addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        buscarCEP(); // Chama a função buscarCEP() quando a tecla Enter é pressionada
    }
});

//serve para buscar o cep
function buscarCEP() {
    let cep = document.getElementById('cep').value; //obtem o cep
    let mensagem = document.getElementById('mensagem'); //faz exibir mensagens
    let resultado = document.getElementById('resultado'); //exibi informações do cep

    //verifica se o cep possui 8 caracteres
    if (cep.length !== 8) {
        mensagem.textContent = 'O CEP deve ter exatamente 8 caracteres.'; //faz aparecer uma mensagem de erro
        resultado.textContent = ''; //limpa a mensagem anterior
        return;
    }

    let url = `https://viacep.com.br/ws/${cep}/json/`;

    //requisita para a url
    fetch(url)
        .then(response => response.json()) //converte a resposta para json
        .then(data => {
            if (data.erro) {
                mensagem.textContent = 'CEP não encontrado.'; //faz exibir uma mensagem de erro caso tenha
                resultado.textContent = ''; //limpa a mensagem anterior
            } else {
                mensagem.textContent = ''; // limpa a mensagem anterior
                resultado.innerHTML = `
                    <p>CEP: ${data.cep}</p>
                    <p>Endereço: ${data.logradouro}</p>
                    <p>Complemento: ${data.complemento}</p>
                    <p>Bairro: ${data.bairro}</p>
                    <p>Cidade: ${data.localidade}</p>
                    <p>Estado: ${data.uf}</p>
                `; //exibe as informações do cep que foi digitado acima
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro na busca:', error); //exibe uma informação de erro caso não ache o cep
        });
}

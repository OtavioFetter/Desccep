//faz com que a caixa de texto funcione clicando a tecla enter
document.getElementById('cep').addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        buscarCEP();
    }
});

//faz com que o site retorne um alerta que o mínimo de caracteres é 8
function buscarCEP() {
    let cep = document.getElementById('cep').value;
    if (cep.length !== 8) {
        alert('O CEP deve ter exatamente 8 caracteres.');
        return;
    }

    let url = `https://viacep.com.br/ws/${cep}/json/`;

//retorna as informações como Endereço, complemento, bairro, cidade e estado
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                document.getElementById('resultado').innerHTML = 'CEP não encontrado.';
            } else {
                document.getElementById('resultado').innerHTML = `
                    <p>CEP: ${data.cep}</p>
                    <p>Endereço: ${data.logradouro}</p>
                    <p>Complemento: ${data.complemento}</p>
                    <p>Bairro: ${data.bairro}</p>
                    <p>Cidade: ${data.localidade}</p>
                    <p>Estado: ${data.uf}</p>
                `;
            }
        })

//faz que caso o cep não seja encontrado retorne uma mensagem
        .catch(error => {
            console.error('Ocorreu um erro na busca:', error);
        });
}
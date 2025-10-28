document.addEventListener('DOMContentLoaded', () => {
    // 1. Pega o elemento do campo CEP
    const cepInput = document.getElementById('cep');

    // 2. Adiciona um "ouvinte" de evento: quando o foco sair do campo CEP ('blur')
    cepInput.addEventListener('blur', () => {
        const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

        // Verifica se o CEP tem 8 dígitos
        if (cep.length !== 8) {
            return; // Sai da função se o CEP for inválido
        }

        const url = `https://viacep.com.br/ws/${cep}/json/`;

        // Limpa campos anteriores antes de fazer a busca
        limparCamposEndereco();

        // 3. Faz a requisição à API ViaCEP
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    // 4. Preenche os campos com os dados da API
                    document.getElementById('endereco').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                    // Foca no campo 'numero' para o usuário continuar
                    document.getElementById('numero').focus();
                } else {
                    // Alerta de erro para preenchimento (conforme o requisito) [cite: 44]
                    alert("CEP não encontrado. Por favor, verifique o número.");
                }
            })
            .catch(error => {
                console.error('Erro na busca do CEP:', error);
                alert("Ocorreu um erro ao buscar o CEP. Tente novamente mais tarde.");
            });
    });

    // Função auxiliar para limpar os campos
    function limparCamposEndereco() {
        document.getElementById('endereco').value = "";
        document.getElementById('bairro').value = "";
        document.getElementById('cidade').value = "";
        document.getElementById('estado').value = "";
    }
});
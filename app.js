let amigos = [];

/**
 * Função para adicionar amigos à lista
 * Obtém o nome do input, valida e adiciona ao array
 */
function adicionarAmigo() {
    // Obter o elemento input pelo ID
    const inputAmigo = document.getElementById('amigo');
    const nomeAmigo = inputAmigo.value.trim();
    
    // Validar se o nome não está vazio
    if (nomeAmigo === '') {
        alert('Por favor, digite um nome válido!');
        return;
    }
    
    // Verificar se o nome já existe na lista
    if (amigos.includes(nomeAmigo)) {
        alert('Este amigo já está na lista!');
        inputAmigo.value = '';
        return;
    }
    
    // Adicionar o amigo ao array
    amigos.push(nomeAmigo);
    
    // Limpar o campo de input
    inputAmigo.value = '';
    
    // Atualizar a exibição da lista
    atualizarListaAmigos();
    
    console.log('Lista atual de amigos:', amigos);
}

/**
 * Função para atualizar a lista de amigos na tela
 * Exibe todos os nomes do array na ul com id="listaAmigos"
 */
function atualizarListaAmigos() {
    const listaElement = document.getElementById('listaAmigos');
    
    // Limpar a lista atual
    listaElement.innerHTML = '';
    
    // Adicionar cada amigo como um item da lista
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        li.className = 'friend-item'; // Classe para estilização opcional
        
        // Opcional: adicionar botão para remover amigo
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = ' ❌';
        botaoRemover.className = 'remove-btn';
        botaoRemover.onclick = () => removerAmigo(index);
        
        li.appendChild(botaoRemover);
        listaElement.appendChild(li);
    });
    
    // Mostrar/esconder a lista baseado se há amigos
    const section = document.querySelector('.input-section');
    if (amigos.length > 0) {
        listaElement.style.display = 'block';
    } else {
        listaElement.style.display = 'none';
    }
}

/**
 * Função auxiliar para remover um amigo da lista
 * @param {number} index - Índice do amigo a ser removido
 */
function removerAmigo(index) {
    if (confirm(`Tem certeza que deseja remover "${amigos[index]}" da lista?`)) {
        amigos.splice(index, 1);
        atualizarListaAmigos();
        console.log('Amigo removido. Lista atual:', amigos);
    }
}

/**
 * Função para sortear um amigo secreto
 * Seleciona aleatoriamente um nome da lista
 */
function sortearAmigo() {
    // Verificar se há amigos na lista
    if (amigos.length === 0) {
        alert('Adicione pelo menos um amigo antes de sortear!');
        return;
    }
    
    // Gerar índice aleatório
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceAleatorio];
    
    // Exibir o resultado
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = `🎉 O amigo secreto sorteado é: <strong>${amigoSorteado}</strong>!`;
    
    console.log('Amigo sorteado:', amigoSorteado);
    
    // Opcional: remover o amigo sorteado da lista para evitar repetição
    // amigos.splice(indiceAleatorio, 1);
    // atualizarListaAmigos();
}

// Event Listeners para melhor experiência do usuário
document.addEventListener('DOMContentLoaded', function() {
    // Permitir adicionar amigo pressionando Enter
    const inputAmigo = document.getElementById('amigo');
    if (inputAmigo) {
        inputAmigo.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                adicionarAmigo();
            }
        });
        
        // Focar no input quando a página carregar
        inputAmigo.focus();
    }
    
    // Inicializar lista vazia
    atualizarListaAmigos();
});

// Funções auxiliares para debug (podem ser removidas em produção)
function mostrarAmigos() {
    console.log('Lista completa de amigos:', amigos);
    return amigos;
}

function contarAmigos() {
    console.log(`Total de amigos na lista: ${amigos.length}`);
    return amigos.length;
}
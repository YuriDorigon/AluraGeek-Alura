// URL da API
const API_URL = 'http://localhost:3000/catalogo';

// Função para buscar e renderizar os produtos existentes
async function carregarProdutos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro ao carregar os produtos');
        }
        const produtos = await response.json();
        renderizarProdutos(produtos);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Função para renderizar produtos na página
function renderizarProdutos(produtos) {
    const container = document.querySelector('.produtos__cards');
    container.innerHTML = ''; // Limpa os produtos existentes antes de renderizar

    produtos.forEach((produto) => {
        container.innerHTML += `
            <div class="produtos__card" data-id="${produto.id}">
                <img class="img__card" src="${produto.imagens[0]}" alt="${produto.nome}">
                <h2 class="text__card">${produto.nome}</h2>
                <div class="text__card__preco">
                    <p>$ ${produto.preco.toFixed(2)}</p>
                    <button class="btn__lixeira">
                        <img class="img__lixeira" src="img/Vector.svg" alt="lixeira">
                    </button>
                </div>
            </div>
        `;
    });

    configurarBotoesLixeira();
}

// Função para excluir produto do banco de dados
async function excluirProduto(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir produto');
        }

        console.log(`Produto com ID ${id} excluído com sucesso`);
        carregarProdutos(); // Recarrega os produtos após a exclusão
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
    }
}

// Função para configurar os botões de lixeira
function configurarBotoesLixeira() {
    const botoesLixeira = document.querySelectorAll('.btn__lixeira');

    botoesLixeira.forEach((botao) => {
        botao.addEventListener('click', (event) => {
            const card = event.target.closest('.produtos__card');
            const id = card.getAttribute('data-id');
            excluirProduto(id); // Chama a função para excluir o produto
        });
    });
}

// Função para adicionar produto ao banco de dados
async function adicionarProduto(nome, preco, link) {
    try {
        // Substitui vírgulas por pontos antes de converter para número
        const precoCorrigido = parseFloat(preco.replace(',', '.'));

        if (isNaN(precoCorrigido)) {
            alert('Preço inválido. Use números, como "19,99" ou "19.99".');
            return;
        }

        const novoProduto = {
            imagens: [link],
            nome: nome,
            preco: precoCorrigido,
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoProduto),
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar produto');
        }

        const produtoAdicionado = await response.json();
        console.log('Produto adicionado:', produtoAdicionado);

        // Recarregar os produtos para incluir o novo
        carregarProdutos();
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
    }
}

// Lidar com o envio do formulário
function configurarFormulario() {
    const formulario = document.querySelector('.formulario__form');

    formulario.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevenir comportamento padrão do formulário

        const nome = document.querySelector('#nomeProduto').value.trim();
        const preco = document.querySelector('#precoProduto').value.trim();
        const link = document.querySelector('#linkProduto').value.trim();

        if (nome && preco && link) {
            await adicionarProduto(nome, preco, link);
            formulario.reset(); // Limpar campos do formulário
        } else {
            alert('Por favor, preencha todos os campos!');
        }
    });
}


// Carregar os produtos ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    configurarFormulario();
});

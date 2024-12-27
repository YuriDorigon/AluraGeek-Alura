function adicionarProduto(nome, preco, link) {
    // Seleciona o container onde os cards serão adicionados
    const container = document.querySelector('.produtos__cards');

    // Adiciona o novo card no container
    container.innerHTML += `
        <div class="produtos__card">
            <img class="img__card" src="${link}" alt="${nome}">
            <h2 class="text__card">${nome}</h2>
            <div class="text__card__preco">
                <p>$ ${preco}</p>
                <button>
                    <img class="img__lixeira" src="img/Vector.svg" alt="lixeira">
                </button>
            </div>
        </div>
    `;
}

adicionarProduto('Skill', 99, 'img/Skill.png');
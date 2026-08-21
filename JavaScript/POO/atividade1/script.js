class Produto {
    constructor(nome, preco, categoria, desconto) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.desconto = desconto;
    }

    aplicarDesconto() {
        const precoComDesconto = this.preco - (this.preco * this.desconto / 100);

        return precoComDesconto;
    }

    exibirNaTela() {
        const resultado = document.querySelector('#resultado');
        const precoFinal = this.aplicarDesconto();

        resultado.innerHTML = `
            <div>
                <p>Nome: ${this.nome}</p>
                <p>Categoria: ${this.categoria}</p>
                <p>Preço original: R$ ${this.preco.toFixed(2).replace('.', ',')}</p>
                <p>Desconto: ${this.desconto}%</p>
                <p>Preço com desconto: R$ ${precoFinal.toFixed(2).replace('.', ',')}</p>
            </div>
        `;
    }
}

const produtos = [];

const nome = document.querySelector('#nome');
const preco = document.querySelector('#preco');
const categoria = document.querySelector('#categoria');
const desconto = document.querySelector('#desconto');
const botaocadastrar = document.querySelector('#botaocadastrar');

botaocadastrar.addEventListener('click', function() {
    const produto = new Produto(
        nome.value,
        Number(preco.value),
        categoria.value,
        Number(desconto.value)
    );

    produtos.push(produto);

    console.log(produtos);
    produto.exibirNaTela();
});
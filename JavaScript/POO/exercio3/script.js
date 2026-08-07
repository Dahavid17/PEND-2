class Produto {
    constructor(nome, preco, estoque) {
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    vender(quantidade) {
        if (quantidade <= this.estoque) {
            this.estoque -= quantidade;
            console.log(
                `Foram vendidas ${quantidade} unidades de ${this.nome}.`
            );
            console.log(`Estoque atual: ${this.estoque}`);
        } else {
            console.log(
                `Não há estoque suficiente de ${this.nome}.`
            );
        }
    }

    repor(quantidade) {
        if (quantidade > 0) {
            this.estoque += quantidade;
            console.log(
                `${quantidade} unidades de ${this.nome} foram adicionadas ao estoque.`
            );
            console.log(`Estoque atual: ${this.estoque}`);
        }
    }

    alterarPreco(novoPreco) {
        this.preco = novoPreco;
        console.log(
            `Preço de ${this.nome} alterado para R$${this.preco}.`
        );
    }
}

// PRODUTOS
const produto1 = new Produto("Camiseta", 50, 100);
const produto2 = new Produto("Calça", 80, 50);
const produto3 = new Produto("Tênis", 120, 30);

// EXIBIÇÃO DOS PRODUTOS
const produtos = [produto1, produto2, produto3];

produtos.forEach((produto, index) => {
    console.log("-------------------------------------------------");
    console.log(`Produto ${index + 1}`);
    console.log("Nome:", produto.nome);
    console.log("Preço:", produto.preco);
    console.log("Estoque:", produto.estoque);
});

console.log("-------------------------------------------------");

// TESTE DOS MÉTODOS
produto1.alterarPreco(60);

console.log("-------------------------------------------------");

produto2.vender(10);

console.log("-------------------------------------------------");

produto3.repor(20);

console.log("-------------------------------------------------");
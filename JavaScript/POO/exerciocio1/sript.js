// CLASSE CLIENTE
class Cliente {
    constructor(cpf, dinheiro, nome, idade, sexo, telefone, email, endereco) {
        this.cpf = cpf;
        this.dinheiro = dinheiro;
        this.nome = nome;
        this.idade = idade;
        this.sexo = sexo;
        this.telefone = telefone;
        this.email = email;
        this.endereco = endereco;
    }

    cadastrar() {
        console.log(`${this.nome} realizou o cadastro.`);
    }

    comprar(valor) {
        if (this.dinheiro >= valor) {
            this.dinheiro -= valor;
            console.log(`${this.nome} comprou um produto por R$${valor}.`);
            console.log(`Saldo restante: R$${this.dinheiro}`);
        } else {
            console.log(`${this.nome} não possui saldo suficiente.`);
        }
    }

    entrarNoSistema() {
        console.log(`${this.nome} entrou no sistema.`);
    }
}

// CLIENTES
const cliente1 = new Cliente(
    "123.456.789-00",
    1000,
    "João",
    30,
    "Masculino",
    "(11) 99999-9999",
    "joao@email.com",
    "Rua A, 123"
);

const cliente2 = new Cliente(
    "987.654.321-00",
    500,
    "Maria",
    25,
    "Feminino",
    "(21) 88888-8888",
    "maria@email.com",
    "Rua B, 456"
);

const cliente3 = new Cliente(
    "456.789.123-00",
    2000,
    "Pedro",
    40,
    "Masculino",
    "(31) 77777-7777",
    "pedro@email.com",
    "Rua C, 789"
);

// TESTE DAS FUNÇÕES
console.log("=================================");
console.log("TESTE DAS FUNÇÕES");
console.log("=================================");

cliente1.cadastrar();
cliente1.entrarNoSistema();
cliente1.comprar(300);

console.log("---------------------------------");

cliente2.cadastrar();
cliente2.entrarNoSistema();
cliente2.comprar(700); // saldo insuficiente

console.log("---------------------------------");

cliente3.cadastrar();
cliente3.entrarNoSistema();
cliente3.comprar(1500);

console.log("=================================");

// PAINEL FINAL
console.log("DADOS DOS CLIENTES");

const clientes = [cliente1, cliente2, cliente3];

clientes.forEach((cliente, i) => {
    console.log(`\nCliente ${i + 1}`);
    console.log(`Nome: ${cliente.nome}`);
    console.log(`CPF: ${cliente.cpf}`);
    console.log(`Saldo: R$${cliente.dinheiro}`);
    console.log(`Idade: ${cliente.idade}`);
    console.log(`Telefone: ${cliente.telefone}`);
    console.log(`Email: ${cliente.email}`);
    console.log(`Endereço: ${cliente.endereco}`);
});
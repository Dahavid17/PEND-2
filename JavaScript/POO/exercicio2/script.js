class Aluno {
    constructor(nome, idade, nota) {
        this.nome = nome;
        this.idade = idade;
        this.nota = nota;
    }

    estudar() {
        console.log(`${this.nome} está estudando.`);
    }

    fazendoProva() {
        console.log(`${this.nome} está fazendo a prova.`);
    }

    notaFinal() {
        if (this.nota >= 7) {
            console.log(`${this.nome} foi aprovado com nota ${this.nota}.`);
        } else {
            console.log(`${this.nome} foi reprovado com nota ${this.nota}.`);
        }
    }
}

// ALUNOS
const aluno1 = new Aluno("Lucas", 20, 8);
const aluno2 = new Aluno("Ana", 22, 6);
const aluno3 = new Aluno("Carlos", 19, 9);

// ALUNO 1
console.log("-------------------------------------------------");
console.log("Informações do Aluno 1");
console.log("Nome:", aluno1.nome);
console.log("Idade:", aluno1.idade);
console.log("Nota:", aluno1.nota);

aluno1.estudar();
aluno1.fazendoProva();
aluno1.notaFinal();

// ALUNO 2
console.log("-------------------------------------------------");
console.log("Informações do Aluno 2");
console.log("Nome:", aluno2.nome);
console.log("Idade:", aluno2.idade);
console.log("Nota:", aluno2.nota);

aluno2.estudar();
aluno2.fazendoProva();
aluno2.notaFinal();

// ALUNO 3
console.log("-------------------------------------------------");
console.log("Informações do Aluno 3");
console.log("Nome:", aluno3.nome);
console.log("Idade:", aluno3.idade);
console.log("Nota:", aluno3.nota);

aluno3.estudar();
aluno3.fazendoProva();
aluno3.notaFinal();

console.log("-------------------------------------------------");
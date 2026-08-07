//Classe
class Carro{

// atributos
//     marca;
//     modelo;
//     ano;
//     cor;
// CONSTRUCTOR é o metodo que é exucutado ao criar novo objeto, decidindo valor inicial
constructor (marca,modelo,ano,cor){

//this mostra qual objeto aquele valor devera ir

    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
    this.cor = cor;

}

    ligar() {
        console.log("Carro ligado");
    }

    acelerar() {
        console.log("Acelerando");
    }

    frear() {
        console.log("Freando");
    }
}
// Objetos
    const carro1 = new Carro("Volkswagen", "Gol", 2022, "Branco");
    console.log("Carro1: ", carro1);

//
    const carro2 = new Carro("Toyota", "Corola",2025, "Preto");
    console.log("Carro 2 ", carro2);

//
    const carro3 = new Carro("fusca", "fusca",2025, "vermelho");
    console.log("Carro 3 ", carro3);


console.log("-------------------------------------------------");
console.log("Atributos do Carro 1: ");
console.log("- ", carro1.marca);
console.log("- ", carro1.modelo);
console.log("- ", carro1.ano);
console.log("- ", carro1.cor);
console.log("-------------------------------------------------");


console.log("-------------------------------------------------");
console.log("Atributos do Carro 2: ");
console.log("- ", carro2.marca);
console.log("- ", carro2.modelo);
console.log("- ", carro2.ano);
console.log("- ", carro2.cor);
console.log("-------------------------------------------------");

console.log("-------------------------------------------------");
console.log("Atributos do Carro 3: ");
console.log("- ", carro3.marca);
console.log("- ", carro3.modelo);
console.log("- ", carro3.ano);
console.log("- ", carro3.cor);
console.log("-------------------------------------------------");

console.log("Carro 1 ligado:");
carro1.ligar();console.log("")
console.log("Carro 1 acelerando:");
carro1.acelerar();

console.log("-------------------------------------------------");

console.log("Carro 2 ligado:");
carro2.ligar();
console.log("")
console.log("Carro 2 acelerando:");
carro2.acelerar();

console.log("-------------------------------------------------");

console.log("Carro 3 ligado:");
carro3.ligar();
console.log("")
console.log("Carro 3 acelerando:");
carro3.acelerar();
console.log("")
console.log("⚠️Obstaculo a frente⚠️")
console.log(`${carro3.modelo} freando`);
carro3.frear();
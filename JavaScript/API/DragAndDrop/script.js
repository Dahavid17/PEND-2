const produto = document.querySelector("#produto");
const carrinho = document.querySelector("#carrinho");

produto.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("text", event.target.id);
});

carrinho.addEventListener("dragover", function(event) {
    event.preventDefault();
    console.log("Podesoltar aqui no carrinho");
});

carrinho.addEventListener("drop", function(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    const elemento = document.querySelector("#" + id);

    carrinho.appendChild(elemento);
});
//botao
const botao = document.getElementById("buscarUsuarios");
const resultado = document.getElementById("resultado");
const idUsuario = document.getElementById("idUsuario");

// //função botao
// botao.addEventListener("click", () => {
//     //fetch + then + catch
//     fetch("https://jsonplaceholder.typicode.com/users")
//         .then(resposta => resposta.json())
//         .then(dados => {
//             console.log(dados);
//             // Exibir os dados no elemento "resultado"
//             resultado.innerHTML = "";

//             dados.forEach(usuario => {

//                 resultado.innerHTML += `
//                 <p>
//                     <strong>${usuario.name}</strong><br>
//                     ${usuario.email}
//                 </p>
//                 <hr>`;
//             });
//         })
//         .catch(erro => {
//             console.log("Erro", erro);
//         });
//     });

//função botao
// botao.addEventListener("click", async () => {
//     try {
//         const resposta = await fetch("https://jsonplaceholder.typicode.com/users");

//         const dados = await resposta.json();
//         console.log(dados);
//         // Exibir os dados no elemento "resultado"
//         resultado.innerHTML = "";

//             dados.forEach(usuario => {

//                 resultado.innerHTML += `
//                 <p>
//                     <strong>${usuario.name}</strong><br>
//                     ${usuario.email}
//                 </p>
//                 <hr>`;
//             });
//     }
//     catch (erro) {
//         resultado.innerHTML = "Erro ao buscar usuarios.";
//         console.log(erro);
//     }
// });
   
//com campo de busca
botao.addEventListener("click", async () => {

const id = idUsuario.value;

    if (id === "") {
        resultado.innerHTML = "Digite um ID";
        return;
    }

    try {
        const resposta = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

        const dados = await resposta.json();


            resultado.innerHTML = `
            <p>
                <strong>${dados.name}</strong><br>
                Email: ${dados.email}<br>
                Cidade: ${dados.address.city}<br>
                Telefone: ${dados.phone}
            </p>
            <hr>`;
    }
    catch (erro) {
        resultado.innerHTML = "Erro ao buscar usuarios.";
        console.log(erro);
    }
});
    
document.addEventListener('DOMContentLoaded', () => {

    // 1. Menu Mobile Toggle (Hamburguer)
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Elementos da Seção de Contato
    const formContato = document.getElementById('formContato');
    const mensagemSucesso = document.getElementById('mensagemSucesso');
    const textoSucesso = document.getElementById('textoSucesso');
    const btnVoltar = document.getElementById('btnVoltar');

    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');
    const inputMensagem = document.getElementById('mensagem');

    // Valida o e-mail com Expressão Regular (Regex)
    function eEmailValido(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email.trim());
    }

    // Submissão do Formulário
    if (formContato) {
        formContato.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o recarregamento da página

            const nome = inputNome.value.trim();
            const email = inputEmail.value.trim();
            const mensagem = inputMensagem.value.trim();

            // Validação de campos vazios
            if (!nome || !email || !mensagem) {
                alert('Por favor, preencha todos os campos antes de enviar.');
                return;
            }

            // Validação do formato do e-mail
            if (!eEmailValido(email)) {
                alert('Por favor, insira um e-mail válido (ex: nome@empresa.com).');
                inputEmail.focus();
                return;
            }

            // Oculta o formulário e exibe o Card de Sucesso no mesmo espaço
            formContato.style.display = 'none';
            textoSucesso.innerText = `Obrigado pelo contato, ${nome}! Sua mensagem foi recebida com sucesso. Em breve entrarei em contato!`;
            mensagemSucesso.style.display = 'flex';

            formContato.reset();
        });
    }

    // Botão para retornar ao formulário
    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            mensagemSucesso.style.display = 'none';
            formContato.style.display = 'block';
        });
    }
});
// Endpoint da API Pública contendo personagens de Animes, Filmes, Séries e HQs
const API_URL = 'https://akabab.github.io/superhero-api/api/all.json';

// Variáveis Globais
let todosPersonagens = [];
let equipa1 = [];
let equipa2 = [];
const TAMANHO_MAXIMO_EQUIPA = 3;

// Elementos do DOM
const grid = document.getElementById('heroes-grid');
const loading = document.getElementById('loading-message');
const errorDiv = document.getElementById('error-message');
const searchInput = document.getElementById('search-input');
const btnBattle = document.getElementById('btn-battle');
const btnReset = document.getElementById('btn-reset');
const battleLog = document.getElementById('battle-log');

/* ----------------------------------------------------
   1. CONSUMO DA API COM ASYNC / AWAIT E TRY / CATCH
------------------------------------------------------- */
async function carregarPersonagens() {
    try {
        loading.classList.remove('hidden');
        errorDiv.classList.add('hidden');

        // Requisição HTTP Assíncrona
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Falha na resposta da API. Código do status: ${response.status}`);
        }

        // Conversão dos dados para JSON
        todosPersonagens = await response.json();

        // Apresentação de TODOS os personagens no DOM (sem limite de slice)
        apresentarPersonagens(todosPersonagens);
        loading.classList.add('hidden');

    } catch (error) {
        loading.classList.add('hidden');
        errorDiv.textContent = `Aconteceu um erro ao comunicar com a API: ${error.message}`;
        errorDiv.classList.remove('hidden');
        console.error(error);
    }
}

/* ----------------------------------------------------
   2. CÁLCULO INTERNO (SOMA DOS 6 ATRIBUTOS - OCULTO)
------------------------------------------------------- */
function calcularPoderTotal(p) {
    const stats = p.powerstats || {};
    return (stats.intelligence || 0) + 
           (stats.strength || 0) + 
           (stats.speed || 0) + 
           (stats.durability || 0) + 
           (stats.power || 0) + 
           (stats.combat || 0);
}

/* ----------------------------------------------------
   3. APRESENTAÇÃO DOS DADOS NO DOM (EXIBE OS 6 ATRIBUTOS)
------------------------------------------------------- */
function apresentarPersonagens(lista) {
    grid.innerHTML = '';
    
    lista.forEach(personagem => {
        const jaEscolhido = equipa1.some(p => p.id === personagem.id) || equipa2.some(p => p.id === personagem.id);
        
        const card = document.createElement('div');
        card.className = `hero-card ${jaEscolhido ? 'selected' : ''}`;
        
        const st = personagem.powerstats || {};
        const universo = personagem.biography.publisher || 'Cultura Pop';

        // Injeta os dados no DOM (com os 6 atributos visíveis e SEM a soma total OVR)
        card.innerHTML = `
            <img src="${personagem.images.sm}" alt="${personagem.name}" loading="lazy">
            <h3>${personagem.name}</h3>
            <span class="hero-publisher">🌐 ${universo}</span>
            <div class="hero-stats">
                <span>🧠 Int: <strong>${st.intelligence || 0}</strong></span>
                <span>💪 For: <strong>${st.strength || 0}</strong></span>
                <span>⚡ Vel: <strong>${st.speed || 0}</strong></span>
                <span>🛡️ Dur: <strong>${st.durability || 0}</strong></span>
                <span>💥 Pod: <strong>${st.power || 0}</strong></span>
                <span>⚔️ Com: <strong>${st.combat || 0}</strong></span>
            </div>
        `;
        
        if (!jaEscolhido) {
            card.onclick = () => selecionarPersonagem(personagem);
        }
        
        grid.appendChild(card);
    });
}

/* ----------------------------------------------------
   4. LÓGICA DE JOGO E INTERAÇÃO
------------------------------------------------------- */
function selecionarPersonagem(personagem) {
    if (equipa1.length < TAMANHO_MAXIMO_EQUIPA) {
        equipa1.push(personagem);
    } else if (equipa2.length < TAMANHO_MAXIMO_EQUIPA) {
        equipa2.push(personagem);
    } else {
        return;
    }

    atualizarInterfaceEquipas();
    
    // Filtra dentro da lista completa mantendo o termo de pesquisa atual
    const termo = searchInput.value.toLowerCase();
    const filtrados = todosPersonagens.filter(p => 
        p.name.toLowerCase().includes(termo) || 
        (p.biography.publisher && p.biography.publisher.toLowerCase().includes(termo))
    );

    apresentarPersonagens(filtrados);

    if (equipa1.length === TAMANHO_MAXIMO_EQUIPA && equipa2.length === TAMANHO_MAXIMO_EQUIPA) {
        btnBattle.disabled = false;
    }
}

function atualizarInterfaceEquipas() {
    const slotsE1 = document.getElementById('team-1-slots');
    const slotsE2 = document.getElementById('team-2-slots');
    
    slotsE1.innerHTML = '';
    slotsE2.innerHTML = '';

    for(let i = 0; i < TAMANHO_MAXIMO_EQUIPA; i++) {
        slotsE1.innerHTML += `<div class="slot">${equipa1[i] ? `<img src="${equipa1[i].images.sm}">` : '?'}</div>`;
        slotsE2.innerHTML += `<div class="slot">${equipa2[i] ? `<img src="${equipa2[i].images.sm}">` : '?'}</div>`;
    }
}

// Filtro de Pesquisa em Tempo Real (busca em TODOS os personagens)
searchInput.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    const filtrados = todosPersonagens.filter(p => 
        p.name.toLowerCase().includes(termo) || 
        (p.biography.publisher && p.biography.publisher.toLowerCase().includes(termo))
    );

    apresentarPersonagens(filtrados);
});

// Ação do Botão de Batalha
btnBattle.addEventListener('click', () => {
    battleLog.innerHTML = '<h2>Relatório da Batalha Multiverso:</h2>';
    battleLog.classList.remove('hidden');
    
    let pontosE1 = 0;
    let pontosE2 = 0;

    for (let i = 0; i < TAMANHO_MAXIMO_EQUIPA; i++) {
        const p1 = equipa1[i];
        const p2 = equipa2[i];
        
        const poderP1 = calcularPoderTotal(p1);
        const poderP2 = calcularPoderTotal(p2);

        let htmlResultado = `<div class="log-entry"><strong>Ronda ${i+1}:</strong> ${p1.name} vs ${p2.name}<br>`;
        
        if (poderP1 > poderP2) {
            htmlResultado += `<span class="win-p1">🏆 ${p1.name} venceu o duelo!</span></div>`;
            pontosE1++;
        } else if (poderP2 > poderP1) {
            htmlResultado += `<span class="win-p2">🏆 ${p2.name} venceu o duelo!</span></div>`;
            pontosE2++;
        } else {
            htmlResultado += `<span class="draw">🤝 O duelo terminou em Empate!</span></div>`;
        }
        battleLog.innerHTML += htmlResultado;
    }

    if (pontosE1 > pontosE2) {
        battleLog.innerHTML += `<h3 class="win-p1">🎉 A Equipa 1 (Azul) é a Vencedora do Torneio! 🎉</h3>`;
    } else if (pontosE2 > pontosE1) {
        battleLog.innerHTML += `<h3 class="win-p2">🎉 A Equipa 2 (Vermelha) é a Vencedora do Torneio! 🎉</h3>`;
    } else {
        battleLog.innerHTML += `<h3 class="draw">O Torneio Multiverso terminou em Empate!</h3>`;
    }

    btnBattle.disabled = true;
});

// Reiniciar o Jogo
btnReset.addEventListener('click', () => {
    equipa1 = [];
    equipa2 = [];
    btnBattle.disabled = true;
    battleLog.classList.add('hidden');
    searchInput.value = '';
    atualizarInterfaceEquipas();
    apresentarPersonagens(todosPersonagens);
});

// Execução Inicial
atualizarInterfaceEquipas();
carregarPersonagens();
// ==========================================
// 1. CONFIGURAÇÕES & SUPORTE A ALTA RESOLUÇÃO
// ==========================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

if (ctx) {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
}

const MAPA = {
    largura: 800,
    altura: 600,
    larguraPista: 50,
    caminho: [
        { x: 0, y: 10 },
        { x: 700, y: 400 },
        { x: 450, y: 550 },
        { x: 50, y: 350 },
        { x: 550, y: 200 },
        { x: 900, y: 200 }
    ]
};


// ==========================================
// 2. EVOLUÇÕES DAS TORRES
// ==========================================

const EVOLUCOES_TORRES = {
    dardo: {
        nome: "Macaco Dardo",
        niveis: [
            { custo: 200, raio: 100, dano: 1, cooldown: 800, icone: "🐒", imgSrc: "assets/macaco-dardo.png" },
            { custo: 150, raio: 125, dano: 2, cooldown: 650, icone: "🐒", imgSrc: "assets/macaco-dardo2.png" },
            { custo: 300, raio: 160, dano: 4, cooldown: 450, icone: "🦍", imgSrc: "assets/macaco-dardo3.png" }
        ]
    },
    mago: {
        nome: "Macaco Mago",
        niveis: [
            { custo: 400, raio: 150, dano: 2, cooldown: 1200, icone: "🧙‍♂️", imgSrc: "assets/anao-magico.png" },
            { custo: 250, raio: 180, dano: 4, cooldown: 1000, icone: "🔮", imgSrc: "assets/anao-magico2.png" },
            { custo: 500, raio: 220, dano: 8, cooldown: 800, icone: "⚡", imgSrc: "assets/anao-magico3.png" }
        ]
    },
    sniper: {
        nome: "Macaco Sniper",
        niveis: [
            { custo: 350, raio: 999, dano: 3, cooldown: 2000, icone: "🎯", imgSrc: "assets/Cesar-pipiu.jpg" },
            { custo: 300, raio: 999, dano: 7, cooldown: 1600, icone: "💥", imgSrc: "assets/Cesar-pipiu2.jpg" },
            { custo: 600, raio: 999, dano: 15, cooldown: 1100, icone: "🚀", imgSrc: "assets/Cesar-pipiu3.jpg" }
        ]
    },
    fazenda: {
        nome: "Fazenda",
        niveis: [
            { custo: 500, raio: 80, renda: 50, cooldown: 3000, icone: "🍌", imgSrc: "assets/H-bananeira.jpg" },
            { custo: 350, raio: 80, renda: 120, cooldown: 2800, icone: "🌴", imgSrc: "assets/H-bananeira-2.png" },
            { custo: 700, raio: 80, renda: 300, cooldown: 2400, icone: "🏭", imgSrc: "assets/H-bananeira-3.png" }
        ]
    }
};


// ==========================================
// 3. CAMADAS DE BALÕES E CONFIGURAÇÃO DAS 30 ONDAS
// ==========================================

function obterPropriedadesBalao(hp) {
    if (hp >= 50) return { cor: '#8e44ad', velocidade: 0.9, raio: 22 }; // BFB (Vinho)
    if (hp >= 25) return { cor: '#2980b9', velocidade: 1.2, raio: 19 }; // MOAB (Azul Escuro)
    if (hp >= 12) return { cor: '#7f8c8d', velocidade: 2.2, raio: 17 }; // Cerâmico (Cinza)
    if (hp >= 8)  return { cor: '#2c3e50', velocidade: 1.8, raio: 16 }; // Chumbo (Preto)
    if (hp >= 6)  return { cor: '#9b59b6', velocidade: 3.0, raio: 15 }; // Roxo
    if (hp >= 5)  return { cor: '#fd79a8', velocidade: 3.8, raio: 15 }; // Rosa
    if (hp >= 4)  return { cor: '#f1c40f', velocidade: 3.2, raio: 15 }; // Amarelo
    if (hp >= 3)  return { cor: '#2ecc71', velocidade: 2.6, raio: 15 }; // Verde
    if (hp >= 2)  return { cor: '#3498db', velocidade: 2.3, raio: 15 }; // Azul
    return { cor: '#e74c3c', velocidade: 2.0, raio: 15 };              // Vermelho
}

const ONDAS = [
    // Fases 1-5
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 1, 2, 2],
    [1, 2, 2, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 2],
    [2, 2, 3, 2, 2, 3, 3, 2, 2, 3, 3, 3, 2, 2, 3],
    [1, 2, 3, 3, 3, 2, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3],

    // Fases 6-10
    [2, 3, 3, 4, 3, 3, 4, 4, 3, 3, 4, 4, 4],
    [3, 4, 4, 4, 3, 4, 4, 5, 4, 4, 5, 5, 4, 4],
    [4, 4, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 5, 4],
    [3, 4, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 5, 4, 5],
    [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],

    // Fases 11-15
    [4, 5, 6, 5, 6, 5, 6, 6, 5, 6, 6, 6, 5, 6],
    [5, 6, 6, 6, 5, 6, 6, 8, 6, 6, 8, 8, 6],
    [6, 6, 8, 8, 6, 8, 8, 8, 6, 8, 8, 8, 8, 6],
    [5, 6, 8, 8, 8, 8, 8, 6, 8, 8, 8, 8, 8, 8, 8],
    [6, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],

    // Fases 16-20
    [6, 8, 8, 12, 8, 8, 12, 8, 8, 12, 12, 8],
    [8, 8, 12, 12, 8, 12, 12, 12, 8, 12, 12, 12],
    [8, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 8],
    [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    [8, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],

    // Fases 21-25
    [12, 12, 12, 12, 25, 12, 12, 12, 12, 12],
    [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
    [12, 12, 25, 12, 12, 25, 12, 12, 12, 12, 12],
    [12, 12, 12, 25, 25, 12, 12, 12, 25, 25, 12, 12],
    [12, 25, 25, 25, 12, 12, 25, 25, 25, 12, 12],

    // Fases 26-30
    [12, 12, 25, 25, 25, 25, 12, 12, 25, 25, 25],
    [25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
    [12, 12, 25, 25, 50, 25, 25, 12, 12],
    [25, 25, 50, 50, 25, 25, 50, 25, 25],
    [50, 50, 50, 50, 50, 25, 25, 25, 25, 25, 25, 25, 25]
];


// ==========================================
// 4. ESTADO DO JOGO
// ==========================================

let estado = {
    vidas: 20,
    moedas: 500,
    ondaAtual: 0,
    velocidadeJogo: 1,
    somAtivo: false,
    gameOver: false,
    torres: [],
    baloes: [],
    projeteis: [],
    textosFlutuantes: [],
    arrastando: null,
    torreSelecionada: null,
    mouse: { x: 0, y: 0 },
    mouseNoCanvas: false
};

let filaDaOndaAtual = [];
let spawnIntervalo = null;

// ==========================================
// 4.1 CACHE DE ELEMENTOS DOM
// ==========================================
// Evita repetir document.getElementById(...) toda vez que o placar muda.
const dom = {
    vidas: document.getElementById('vidas'),
    moedas: document.getElementById('moedas'),
    onda: document.getElementById('onda'),
    painelUpgrade: document.getElementById('painel-upgrade'),
    upgNome: document.getElementById('upg-nome'),
    upgNivel: document.getElementById('upg-nivel'),
    upgAtributo: document.getElementById('upg-atributo'),
    upgDano: document.getElementById('upg-dano'),
    upgRaio: document.getElementById('upg-raio'),
    upgCusto: document.getElementById('upg-custo'),
    btnUpgrade: document.getElementById('btn-upgrade'),
    btnIniciar: document.getElementById('btn-iniciar'),
    btnVelocidade: document.getElementById('btn-velocidade'),
    btnSom: document.getElementById('btn-som')
};

// Converte coordenadas de mouse/toque (em pixels de tela) para coordenadas
// internas do canvas (800x600), considerando a escala CSS atual. Isso é
// essencial para que cliques e arrasto funcionem corretamente quando o
// canvas é redimensionado de forma responsiva (largura em CSS diferente
// da largura real do atributo width/height).
function obterCoordenadasCanvas(clienteX, clienteY) {
    const rect = canvas.getBoundingClientRect();
    const escalaX = canvas.width / rect.width;
    const escalaY = canvas.height / rect.height;
    return {
        x: (clienteX - rect.left) * escalaX,
        y: (clienteY - rect.top) * escalaY
    };
}


// ==========================================
// 5. CARREGAMENTO DE SPRITES E REMOÇÃO DE FUNDO
// ==========================================

// Cria um objeto de sprite que carrega a imagem em segundo plano e tenta
// remover o fundo (chroma-key simples baseado no pixel [0,0] e em branco).
//
// IMPORTANTE: a remoção de fundo depende de LER os pixels da imagem
// (getImageData). Isso só funciona se a imagem vier do mesmo servidor
// (mesma origem) ou tiver cabeçalhos CORS liberados. Ao abrir o jogo
// direto do disco (file://) ou servir os assets de outra origem sem CORS,
// o navegador marca o canvas auxiliar como "contaminado" e getImageData()
// lança uma exceção (SecurityError).
//
// Antes, esse erro fazia a imagem NUNCA aparecer (o código caía sempre no
// ícone emoji). Agora, a imagem original sempre é desenhada normalmente
// nesses casos — só perde a transparência de fundo, que é um efeito
// puramente estético, nunca a exibição em si.
function criarSprite(src, tolerancia = 35) {
    if (!src) return null;

    const img = new Image();

    const spriteObj = {
        completo: false,       // true assim que há algo desenhável (com ou sem fundo removido)
        canvas: null,          // versão processada (fundo removido), quando possível
        imagemOriginal: null,  // imagem crua, sempre usada como alternativa segura
        largura: 0,
        altura: 0
    };

    img.onload = () => {
        // 1) Garante que sempre temos algo para desenhar, mesmo que o
        //    processamento de fundo abaixo falhe.
        spriteObj.imagemOriginal = img;
        spriteObj.largura = img.naturalWidth || img.width;
        spriteObj.altura = img.naturalHeight || img.height;
        spriteObj.completo = true;

        // 2) Tenta remover o fundo. Se falhar (imagem local via file://,
        //    CORS bloqueado, etc.), apenas registra um aviso e mantém a
        //    imagem original (definida acima) como fonte de desenho.
        try {
            const offCanvas = document.createElement('canvas');
            offCanvas.width = img.naturalWidth || img.width;
            offCanvas.height = img.naturalHeight || img.height;

            const offCtx = offCanvas.getContext('2d');
            offCtx.drawImage(img, 0, 0);

            const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
            const data = imgData.data;

            const bgR = data[0], bgG = data[1], bgB = data[2];

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i], g = data[i + 1], b = data[i + 2];
                const distBg = Math.hypot(r - bgR, g - bgG, b - bgB);
                const distWhite = Math.hypot(r - 255, g - 255, b - 255);

                if (distBg < tolerancia || distWhite < tolerancia) {
                    data[i + 3] = 0;
                }
            }

            offCtx.putImageData(imgData, 0, 0);
            spriteObj.canvas = offCanvas;
        } catch (erro) {
            console.warn(
                `Remoção de fundo indisponível para "${src}" (provavelmente por causa de file:// ou CORS). ` +
                `A imagem original será exibida sem remoção de fundo.`,
                erro
            );
        }
    };

    img.onerror = () => {
        console.warn(`Não foi possível carregar a imagem "${src}". Usando ícone como alternativa.`);
    };

    img.src = src;
    return spriteObj;
}

// Escolhe a melhor fonte de desenho disponível para um sprite: a versão
// com fundo removido, se existir, senão a imagem original crua.
function obterFonteDeDesenho(sprite) {
    if (!sprite || !sprite.completo) return null;
    return sprite.canvas || sprite.imagemOriginal || null;
}

// Desenha um sprite centralizado em (x, y), preservando a proporção
// original da imagem dentro de uma caixa máxima de "tamanhoMax" pixels
// (em vez de esticar tudo para um quadrado fixo, o que distorcia imagens
// retangulares).
function desenharSpriteCentralizado(contexto, sprite, x, y, tamanhoMax = 50) {
    const fonte = obterFonteDeDesenho(sprite);
    if (!fonte) return false;

    const larguraOriginal = sprite.largura || tamanhoMax;
    const alturaOriginal = sprite.altura || tamanhoMax;
    const escala = tamanhoMax / Math.max(larguraOriginal, alturaOriginal);

    const largura = larguraOriginal * escala;
    const altura = alturaOriginal * escala;

    contexto.drawImage(fonte, x - largura / 2, y - altura / 2, largura, altura);
    return true;
}

Object.keys(EVOLUCOES_TORRES).forEach(tipo => {
    EVOLUCOES_TORRES[tipo].niveis.forEach(nivel => {
        if (nivel.imgSrc) {
            nivel.sprite = criarSprite(nivel.imgSrc);
        }
    });
});

// Aplica a imagem (sprite) do nível 1 de cada torre também no card da
// barra lateral, no lugar do ícone emoji — mas só troca visualmente
// depois que a imagem realmente carregar. Se a imagem falhar (404,
// asset ausente, etc.), o emoji original do HTML permanece intacto.
function aplicarImagensNosCards() {
    document.querySelectorAll('.torre-card').forEach(card => {
        const tipo = card.dataset.tipo;
        const config = EVOLUCOES_TORRES[tipo];
        const nivelBase = config && config.niveis[0];
        if (!nivelBase || !nivelBase.imgSrc) return;

        const iconeDiv = card.querySelector('.torre-icon');
        if (!iconeDiv) return;

        const imgCard = new Image();
        imgCard.className = 'torre-icon-imagem';
        imgCard.alt = config.nome;

        imgCard.onload = () => {
            iconeDiv.innerHTML = '';
            iconeDiv.appendChild(imgCard);
        };
        // Em caso de erro, simplesmente não fazemos nada e o emoji
        // original (já presente no HTML) continua visível.

        imgCard.src = nivelBase.imgSrc;
    });
}


// ==========================================
// 6. ÁUDIO
// ==========================================

const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

// CORREÇÃO CRÍTICA: esta função era chamada, sem proteção nenhuma, como a
// PRIMEIRA linha dos handlers de arrastar torre, clicar em "Iniciar Onda" e
// trocar a velocidade. Em qualquer ambiente onde o navegador não expõe
// AudioContext (extensões de privacidade, políticas corporativas, alguns
// WebViews embutidos, etc.), "new AudioCtx()" lança uma exceção síncrona.
// Como não havia try/catch, a exceção interrompia o handler ANTES de ele
// chegar à lógica real (estado.arrastando = tipo / iniciarProximaOnda()),
// e isso explica por que tanto o posicionamento de torres quanto o início
// da onda paravam de funcionar ao mesmo tempo. Agora a função nunca lança
// erro para fora dela.
function inicializarAudio() {
    try {
        if (!AudioCtx) return; // Web Audio API indisponível neste ambiente
        if (!audioCtx) {
            audioCtx = new AudioCtx();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume().catch(() => {
                // Alguns navegadores rejeitam resume() fora de um gesto do
                // usuário; isso não deve impedir o resto do jogo de funcionar.
            });
        }
    } catch (erro) {
        console.warn('Áudio indisponível neste navegador. O jogo continuará sem som.', erro);
    }
}

function tocarSomPop() {
    if (!audioCtx || !estado.somAtivo) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const agora = audioCtx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, agora);
    osc.frequency.exponentialRampToValueAtTime(40, agora + 0.08);

    gain.gain.setValueAtTime(0.3, agora);
    gain.gain.exponentialRampToValueAtTime(0.01, agora + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(agora);
    osc.stop(agora + 0.08);
}

function tocarSomTiro(tipo) {
    if (!audioCtx || !estado.somAtivo) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const agora = audioCtx.currentTime;

    if (tipo === 'mago') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, agora);
        osc.frequency.linearRampToValueAtTime(150, agora + 0.15);
        gain.gain.setValueAtTime(0.1, agora);
        gain.gain.exponentialRampToValueAtTime(0.01, agora + 0.15);
    } else if (tipo === 'sniper') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(120, agora);
        osc.frequency.exponentialRampToValueAtTime(30, agora + 0.2);
        gain.gain.setValueAtTime(0.15, agora);
        gain.gain.exponentialRampToValueAtTime(0.01, agora + 0.2);
    } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, agora);
        osc.frequency.exponentialRampToValueAtTime(200, agora + 0.05);
        gain.gain.setValueAtTime(0.1, agora);
        gain.gain.exponentialRampToValueAtTime(0.01, agora + 0.05);
    }

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(agora);
    osc.stop(agora + 0.2);
}

function tocarSomMoeda() {
    if (!audioCtx || !estado.somAtivo) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const agora = audioCtx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, agora);
    osc.frequency.linearRampToValueAtTime(1500, agora + 0.1);

    gain.gain.setValueAtTime(0.1, agora);
    gain.gain.exponentialRampToValueAtTime(0.01, agora + 0.1);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(agora);
    osc.stop(agora + 0.1);
}


// ==========================================
// 7. RENDERIZAÇÃO DE ELEMENTOS
// ==========================================

function desenharMapa() {
    if (!ctx) return;
    ctx.fillStyle = '#7ec850';
    ctx.fillRect(0, 0, MAPA.largura, MAPA.altura);

    ctx.beginPath();
    ctx.strokeStyle = '#d2b48c';
    ctx.lineWidth = MAPA.larguraPista;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.moveTo(MAPA.caminho[0].x, MAPA.caminho[0].y);
    for (let i = 1; i < MAPA.caminho.length; i++) {
        ctx.lineTo(MAPA.caminho[i].x, MAPA.caminho[i].y);
    }
    ctx.stroke();
}

function desenharBaloes() {
    if (!ctx) return;
    estado.baloes.forEach(balao => {
        const props = obterPropriedadesBalao(balao.hp);

        ctx.beginPath();
        ctx.arc(balao.x, balao.y, props.raio, 0, Math.PI * 2);
        ctx.fillStyle = props.cor;
        ctx.fill();

        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function desenharTorres() {
    if (!ctx) return;
    estado.torres.forEach(torre => {
        const config = EVOLUCOES_TORRES[torre.tipo];
        const dadosNivel = config.niveis[torre.nivel - 1];

        if (estado.torreSelecionada === torre) {
            ctx.beginPath();
            ctx.arc(torre.x, torre.y, dadosNivel.raio, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(52, 152, 219, 0.2)';
            ctx.fill();

            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        const desenhouSprite = desenharSpriteCentralizado(ctx, dadosNivel.sprite, torre.x, torre.y, 50);

        if (!desenhouSprite) {
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(dadosNivel.icone, torre.x, torre.y);
        }
    });
}

function desenharProjeteis() {
    if (!ctx) return;
    estado.projeteis.forEach(projetil => {
        ctx.beginPath();
        ctx.arc(projetil.x, projetil.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#34495e';
        ctx.fill();
    });
}

function desenharTextosFlutuantes() {
    if (!ctx) return;
    estado.textosFlutuantes.forEach(texto => {
        ctx.globalAlpha = texto.opacidade;
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = '#f1c40f';
        ctx.textAlign = 'center';
        ctx.fillText(texto.texto, texto.x, texto.y);
    });
    ctx.globalAlpha = 1;
}

function desenharPreview() {
    if (!ctx || !estado.arrastando || !estado.mouseNoCanvas) return;

    const specsBase = EVOLUCOES_TORRES[estado.arrastando].niveis[0];
    const podeConstruir = validarPosicao(estado.mouse.x, estado.mouse.y) && estado.moedas >= specsBase.custo;

    ctx.beginPath();
    ctx.arc(estado.mouse.x, estado.mouse.y, specsBase.raio, 0, Math.PI * 2);
    ctx.fillStyle = podeConstruir ? 'rgba(46, 204, 113, 0.3)' : 'rgba(231, 76, 60, 0.3)';
    ctx.fill();

    ctx.strokeStyle = podeConstruir ? '#27ae60' : '#c0392b';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.globalAlpha = 0.5;

    const desenhouSprite = desenharSpriteCentralizado(ctx, specsBase.sprite, estado.mouse.x, estado.mouse.y, 50);

    if (!desenhouSprite) {
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(specsBase.icone, estado.mouse.x, estado.mouse.y);
    }

    ctx.globalAlpha = 1;
}

function desenharGameOver() {
    if (!ctx) return;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, MAPA.largura, MAPA.altura);

    ctx.fillStyle = '#e74c3c';
    ctx.font = 'bold 50px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GAME OVER', MAPA.largura / 2, MAPA.altura / 2 - 20);

    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText('Recarregue a página para tentar novamente', MAPA.largura / 2, MAPA.altura / 2 + 30);
}


// ==========================================
// 8. ATUALIZAÇÕES DO ESTADO DO JOGO
// ==========================================

function atualizarBaloes() {
    for (let i = estado.baloes.length - 1; i >= 0; i--) {
        const balao = estado.baloes[i];
        const alvo = MAPA.caminho[balao.waypointAtual];

        if (!alvo) continue;

        const dx = alvo.x - balao.x;
        const dy = alvo.y - balao.y;
        const distancia = Math.hypot(dx, dy);

        const props = obterPropriedadesBalao(balao.hp);
        const velocidade = props.velocidade;

        if (distancia < velocidade) {
            balao.x = alvo.x;
            balao.y = alvo.y;
            balao.waypointAtual++;

            if (balao.waypointAtual >= MAPA.caminho.length) {
                estado.vidas -= balao.hp;

                if (estado.vidas <= 0) {
                    estado.vidas = 0;
                    estado.gameOver = true;
                    if (spawnIntervalo) {
                        clearInterval(spawnIntervalo);
                        spawnIntervalo = null;
                    }
                }

                if (dom.vidas) dom.vidas.innerText = estado.vidas;
                estado.baloes.splice(i, 1);
            }
        } else {
            balao.x += (dx / distancia) * velocidade;
            balao.y += (dy / distancia) * velocidade;
        }
    }
}

function atualizarTorres() {
    const agora = Date.now();

    estado.torres.forEach(torre => {
        const stats = EVOLUCOES_TORRES[torre.tipo].niveis[torre.nivel - 1];
        const cooldownAjustado = stats.cooldown / estado.velocidadeJogo;

        if (torre.tipo === 'fazenda') {
            if (agora - torre.ultimoTiro >= cooldownAjustado) {
                estado.moedas += stats.renda;
                atualizarMoedas();
                torre.ultimoTiro = agora;

                estado.textosFlutuantes.push({
                    texto: `+$${stats.renda}`,
                    x: torre.x,
                    y: torre.y - 25,
                    opacidade: 1
                });

                tocarSomMoeda();
            }
            return;
        }

        if (agora - torre.ultimoTiro >= cooldownAjustado) {
            let alvo = null;

            for (const balao of estado.baloes) {
                const distancia = Math.hypot(balao.x - torre.x, balao.y - torre.y);
                if (distancia <= stats.raio) {
                    alvo = balao;
                    break;
                }
            }

            if (alvo) {
                estado.projeteis.push({
                    x: torre.x,
                    y: torre.y,
                    alvo: alvo,
                    dano: stats.dano,
                    velocidade: torre.tipo === 'sniper' ? 20 : 8
                });

                torre.ultimoTiro = agora;
                tocarSomTiro(torre.tipo);
            }
        }
    });
}

function atualizarProjeteis() {
    for (let i = estado.projeteis.length - 1; i >= 0; i--) {
        const projetil = estado.projeteis[i];

        if (!estado.baloes.includes(projetil.alvo)) {
            estado.projeteis.splice(i, 1);
            continue;
        }

        const dx = projetil.alvo.x - projetil.x;
        const dy = projetil.alvo.y - projetil.y;
        const distancia = Math.hypot(dx, dy);

        if (distancia < projetil.velocidade) {
            projetil.alvo.hp -= projetil.dano;
            estado.moedas += projetil.dano * 5;
            atualizarMoedas();

            if (projetil.alvo.hp <= 0) {
                const index = estado.baloes.indexOf(projetil.alvo);
                if (index > -1) {
                    estado.baloes.splice(index, 1);
                    tocarSomPop();
                }
            }

            estado.projeteis.splice(i, 1);
        } else {
            projetil.x += (dx / distancia) * projetil.velocidade;
            projetil.y += (dy / distancia) * projetil.velocidade;
        }
    }
}

function atualizarTextosFlutuantes() {
    for (let i = estado.textosFlutuantes.length - 1; i >= 0; i--) {
        const texto = estado.textosFlutuantes[i];
        texto.y -= 1;
        texto.opacidade -= 0.02;

        if (texto.opacidade <= 0) {
            estado.textosFlutuantes.splice(i, 1);
        }
    }
}


// ==========================================
// 9. LOOP PRINCIPAL DO JOGO
// ==========================================

function gameLoop() {
    if (!ctx) return;
    ctx.clearRect(0, 0, MAPA.largura, MAPA.altura);

    if (!estado.gameOver) {
        for (let i = 0; i < estado.velocidadeJogo; i++) {
            atualizarBaloes();
            atualizarProjeteis();
            atualizarTextosFlutuantes();
        }
        atualizarTorres();
    }

    desenharMapa();
    desenharBaloes();
    desenharTorres();
    desenharProjeteis();
    desenharTextosFlutuantes();
    desenharPreview();

    if (estado.gameOver) {
        desenharGameOver();
        return;
    }

    requestAnimationFrame(gameLoop);
}


// ==========================================
// 10. INTERFACE E UPGRADES
// ==========================================

function atualizarPainelUpgrade() {
    const painel = dom.painelUpgrade;
    if (!painel) return;

    if (!estado.torreSelecionada) {
        painel.classList.add('oculto');
        return;
    }

    const torre = estado.torreSelecionada;
    const config = EVOLUCOES_TORRES[torre.tipo];
    if (!config) return;

    const statsAtuais = config.niveis[torre.nivel - 1];
    const proximoNivel = config.niveis[torre.nivel];

    if (dom.upgNome) dom.upgNome.innerText = config.nome;
    if (dom.upgNivel) dom.upgNivel.innerText = torre.nivel;

    if (torre.tipo === 'fazenda') {
        if (dom.upgAtributo) dom.upgAtributo.innerText = 'Renda';
        if (dom.upgDano) dom.upgDano.innerText = `+$${statsAtuais.renda}`;
    } else {
        if (dom.upgAtributo) dom.upgAtributo.innerText = 'Dano';
        if (dom.upgDano) dom.upgDano.innerText = statsAtuais.dano;
    }

    if (dom.upgRaio) dom.upgRaio.innerText = statsAtuais.raio;

    const botao = dom.btnUpgrade;
    if (botao) {
        // OBS: o botão original tinha um <span id="upg-custo"> fixo no HTML.
        // Ao trocar para "Nível Máximo" com innerText, esse span era destruído
        // permanentemente — se depois disso outra torre (não maximizada) fosse
        // selecionada, o custo nunca mais aparecia. Por isso recriamos o
        // conteúdo completo (incluindo o span) a cada atualização.
        if (proximoNivel) {
            botao.innerHTML = `Melhorar (💰 <span id="upg-custo">${proximoNivel.custo}</span>)`;
            botao.style.display = 'block';
            botao.disabled = estado.moedas < proximoNivel.custo;
        } else {
            botao.innerHTML = 'Nível Máximo';
            botao.style.display = 'block';
            botao.disabled = true;
        }
    }

    painel.classList.remove('oculto');
}


// ==========================================
// 11. MATEMÁTICA E VALIDAÇÕES
// ==========================================

function distPontoParaReta(px, py, x1, y1, x2, y2) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
        xx = x1; yy = y1;
    } else if (param > 1) {
        xx = x2; yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    return Math.sqrt((px - xx) ** 2 + (py - yy) ** 2);
}

function validarPosicao(x, y) {
    const raioOcupacao = 20;
    const margemPista = MAPA.larguraPista / 2 + raioOcupacao;

    for (let i = 0; i < MAPA.caminho.length - 1; i++) {
        const distancia = distPontoParaReta(
            x, y,
            MAPA.caminho[i].x, MAPA.caminho[i].y,
            MAPA.caminho[i + 1].x, MAPA.caminho[i + 1].y
        );

        if (distancia < margemPista) return false;
    }

    for (const torre of estado.torres) {
        if (Math.hypot(torre.x - x, torre.y - y) < raioOcupacao * 2) return false;
    }

    if (x < 25 || x > MAPA.largura - 25 || y < 25 || y > MAPA.altura - 25) return false;

    return true;
}


// ==========================================
// 12. GERENCIAMENTO DE ONDAS E CONTROLES
// ==========================================

function atualizarMoedas() {
    if (dom.moedas) dom.moedas.innerText = estado.moedas;
    if (estado.torreSelecionada) {
        atualizarPainelUpgrade();
    }
}

function dispararProximoBalao() {
    if (estado.gameOver) {
        clearInterval(spawnIntervalo);
        spawnIntervalo = null;
        return;
    }

    const hpDoBalao = filaDaOndaAtual.shift();

    if (hpDoBalao === undefined) {
        clearInterval(spawnIntervalo);
        spawnIntervalo = null;
        return;
    }

    const props = obterPropriedadesBalao(hpDoBalao);

    estado.baloes.push({
        x: MAPA.caminho[0].x,
        y: MAPA.caminho[0].y,
        waypointAtual: 1,
        raio: props.raio,
        hp: hpDoBalao
    });

    if (filaDaOndaAtual.length === 0) {
        clearInterval(spawnIntervalo);
        spawnIntervalo = null;
    }
}

function iniciarGeradorBaloes() {
    if (spawnIntervalo) clearInterval(spawnIntervalo);

    if (filaDaOndaAtual.length > 0) {
        spawnIntervalo = setInterval(dispararProximoBalao, 800 / estado.velocidadeJogo);
    }
}

function alternarVelocidade() {
    estado.velocidadeJogo = estado.velocidadeJogo === 1 ? 2 : 1;
    if (dom.btnVelocidade) {
        dom.btnVelocidade.innerText = `⚡ ${estado.velocidadeJogo}x`;
    }
}

function iniciarProximaOnda() {
    if (filaDaOndaAtual.length > 0 || estado.baloes.length > 0) return;

    if (estado.ondaAtual < ONDAS.length) {
        filaDaOndaAtual = [...ONDAS[estado.ondaAtual]];
        estado.ondaAtual++;

        if (dom.onda) dom.onda.innerText = estado.ondaAtual;

        iniciarGeradorBaloes();
    }
}

// Expõe funções para o escopo global (botões no HTML com onclick)
window.iniciarProximaOnda = iniciarProximaOnda;
window.alternarVelocidade = alternarVelocidade;


// ==========================================
// 13. REGISTRO DE EVENTOS E INICIALIZAÇÃO SEGUIRA
// ==========================================

function tentarPosicionarTorre() {
    const specsBase = EVOLUCOES_TORRES[estado.arrastando].niveis[0];
    const posicaoValida = validarPosicao(estado.mouse.x, estado.mouse.y);

    if (posicaoValida && estado.moedas >= specsBase.custo) {
        estado.moedas -= specsBase.custo;
        atualizarMoedas();

        const novaTorre = {
            tipo: estado.arrastando,
            x: estado.mouse.x,
            y: estado.mouse.y,
            nivel: 1,
            ultimoTiro: Date.now()
        };

        estado.torres.push(novaTorre);
        estado.torreSelecionada = novaTorre;
        atualizarPainelUpgrade();
    }
}

function inicializarEventos() {
    if (!canvas) return;

    // Seleção de torres no canvas
    canvas.addEventListener('click', e => {
        inicializarAudio();

        const { x, y } = obterCoordenadasCanvas(e.clientX, e.clientY);

        let selecionou = false;

        for (const torre of estado.torres) {
            if (Math.hypot(torre.x - x, torre.y - y) <= 30) {
                estado.torreSelecionada = torre;
                selecionou = true;
                break;
            }
        }

        if (!selecionou) {
            estado.torreSelecionada = null;
        }

        atualizarPainelUpgrade();
    });

    // --------------------------------------------------------------
    // ARRASTAR TORRES — API nativa de Drag and Drop do HTML5
    // --------------------------------------------------------------
    // Requisito do projeto: usar dragstart/dragover/dragenter/drop/dragend.
    //
    // Ponto-chave para o drop funcionar de forma confiável entre navegadores:
    // é preciso chamar e.preventDefault() TANTO em "dragenter" QUANTO em
    // "dragover" do alvo (canvas). Por padrão, um elemento não é uma zona de
    // drop válida; sem o preventDefault() nesses dois eventos, o navegador
    // rejeita a operação antes mesmo do "drop" ser disparado — essa é a causa
    // clássica de "arrastei mas não soltou em lugar nenhum".
    document.querySelectorAll('.torre-card').forEach(card => {
        card.addEventListener('dragstart', e => {
            inicializarAudio();

            if (estado.gameOver) {
                e.preventDefault();
                return;
            }

            estado.arrastando = card.dataset.tipo;
            e.dataTransfer.effectAllowed = 'copy';
            // Alguns navegadores exigem dados no dataTransfer para permitir
            // o drag; o valor em si não é usado pela nossa lógica (que lê
            // estado.arrastando diretamente).
            e.dataTransfer.setData('text/plain', card.dataset.tipo);
        });

        card.addEventListener('dragend', () => {
            estado.arrastando = null;
            estado.mouseNoCanvas = false;
        });
    });

    canvas.addEventListener('dragenter', e => {
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
    });

    canvas.addEventListener('dragover', e => {
        e.preventDefault(); // obrigatório: permite que o "drop" dispare
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';

        // getBoundingClientRect() dá a posição/tamanho do canvas NA TELA
        // (em CSS px). Como o canvas pode estar em escala diferente da sua
        // resolução interna (atributos width/height = 800x600), convertemos
        // a coordenada do mouse proporcionalmente com obterCoordenadasCanvas.
        const coords = obterCoordenadasCanvas(e.clientX, e.clientY);
        estado.mouse.x = coords.x;
        estado.mouse.y = coords.y;
        estado.mouseNoCanvas = true;
    });

    canvas.addEventListener('dragleave', () => {
        estado.mouseNoCanvas = false;
    });

    canvas.addEventListener('drop', e => {
        e.preventDefault();

        if (!estado.arrastando || estado.gameOver) {
            estado.arrastando = null;
            estado.mouseNoCanvas = false;
            return;
        }

        // Recalcula a posição final no exato momento do drop (mais preciso
        // do que confiar apenas no último "dragover" recebido).
        const coords = obterCoordenadasCanvas(e.clientX, e.clientY);
        estado.mouse.x = coords.x;
        estado.mouse.y = coords.y;

        tentarPosicionarTorre();

        estado.arrastando = null;
        estado.mouseNoCanvas = false;
    });

    // Botão de upgrade
    if (dom.btnUpgrade) {
        dom.btnUpgrade.addEventListener('click', () => {
            if (!estado.torreSelecionada) return;

            const torre = estado.torreSelecionada;
            const config = EVOLUCOES_TORRES[torre.tipo];
            const proximoNivel = config.niveis[torre.nivel];

            if (proximoNivel && estado.moedas >= proximoNivel.custo) {
                estado.moedas -= proximoNivel.custo;
                torre.nivel++;
                torre.ultimoTiro = Date.now();

                atualizarMoedas();
                atualizarPainelUpgrade();
            }
        });
    }

    // Botão "Iniciar Onda"
    if (dom.btnIniciar) {
        dom.btnIniciar.addEventListener('click', () => {
            inicializarAudio();
            iniciarProximaOnda();
        });
    }

    // Botão de velocidade
    if (dom.btnVelocidade) {
        dom.btnVelocidade.addEventListener('click', () => {
            inicializarAudio();
            alternarVelocidade();
        });
    }

    // Botão de som — antes existia no HTML mas não tinha NENHUM listener
    // associado a ele; clicar nele não fazia absolutamente nada.
    if (dom.btnSom) {
        dom.btnSom.addEventListener('click', () => {
            inicializarAudio();
            estado.somAtivo = !estado.somAtivo;
            dom.btnSom.textContent = estado.somAtivo ? '🔊 Som: ON' : '🔇 Som: OFF';
        });
    }

    // Aplica as imagens dos personagens nos cards da barra lateral
    aplicarImagensNosCards();

    // Inicia o Loop Principal
    requestAnimationFrame(gameLoop);
}

// Garante o carregamento dos eventos após a renderização do HTML
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarEventos);
} else {
    inicializarEventos();
}
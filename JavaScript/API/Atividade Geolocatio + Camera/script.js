const dadosUsuario = {
  motorista: 'Motorista 1',
  veiculo: 'A1B2C3',
  fotoSelfie: null,
  latitude: '',
  longitude: '',
  dataHora: ''
};

let currentStep = 1;
let currentStream = null;

// Inicializa a Câmera Frontal no Passo 1 ao carregar a página
window.onload = () => {
  iniciarCamera('videoSelfie', 'user');
};

function nextStep(stepNumber) {
  // Para a câmera do passo anterior para economizar bateria/recursos
  pararStreamAtual();

  document.getElementById(`step-${currentStep}`).classList.remove('active');
  currentStep = stepNumber;
  document.getElementById(`step-${currentStep}`).classList.add('active');

  // Seleciona a câmera traseira para painel e bomba
  if (currentStep === 3 || currentStep === 4) {
    iniciarCamera(`video${currentStep - 2}`, 'environment');
  }

  if (currentStep === 5) {
    atualizarResumoFinal();
  }
}

// Inicia a Câmera (Frontal = 'user', Traseira = 'environment')
async function iniciarCamera(videoId, facingMode = 'environment') {
  const videoElement = document.getElementById(videoId);
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: facingMode }
    });
    currentStream = stream;
    videoElement.srcObject = stream;
  } catch (err) {
    console.log(`Câmera (${facingMode}) indisponível ou permissão negada.`);
  }
}

function pararStreamAtual() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }
}

// Tira a foto da selfie e avança para a validação GPS
function capturarSelfieEIniciarGPS() {
  const videoSelfie = document.getElementById('videoSelfie');
  const canvas = document.getElementById('canvasSelfie');
  
  // Atualiza valores dos inputs
  dadosUsuario.motorista = document.getElementById('input-motorista').value || 'Motorista 1';
  dadosUsuario.veiculo = document.getElementById('input-veiculo').value || 'A1B2C3';

  // Tira "snapshot" do vídeo da selfie no canvas
  if (videoSelfie.srcObject) {
    canvas.width = videoSelfie.videoWidth || 300;
    canvas.height = videoSelfie.videoHeight || 300;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoSelfie, 0, 0, canvas.width, canvas.height);
    dadosUsuario.fotoSelfie = canvas.toDataURL('image/png');
  }

  nextStep(2);
  obterGPS();
}

// Captura do GPS Real
function obterGPS() {
  const statusText = document.getElementById('gps-status');
  const locationText = document.getElementById('location-name');
  const btn = document.getElementById('btn-step-2');

  if ('geolocation' in navigator) {
    statusText.innerText = "Solicitando permissão de GPS...";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        dadosUsuario.latitude = position.coords.latitude.toFixed(5);
        dadosUsuario.longitude = position.coords.longitude.toFixed(5);
        dadosUsuario.dataHora = new Date().toLocaleString('pt-BR');

        statusText.innerText = "📍 GPS Confirmado!";
        statusText.style.color = "#16a34a";
        locationText.innerHTML = `<strong>Lat:</strong> ${dadosUsuario.latitude}<br><strong>Long:</strong> ${dadosUsuario.longitude}`;
        btn.disabled = false;
      },
      (error) => {
        statusText.innerText = "⚠ GPS Simulado (Permissão ausente)";
        statusText.style.color = "#dc2626";
        dadosUsuario.latitude = "-21.4658";
        dadosUsuario.longitude = "-47.0012";
        dadosUsuario.dataHora = new Date().toLocaleString('pt-BR');
        locationText.innerText = "Coordenadas Padrão Utilizadas";
        btn.disabled = false;
      },
      { enableHighAccuracy: true }
    );
  } else {
    statusText.innerText = "Navegador sem suporte a GPS.";
    btn.disabled = false;
  }
}

// Atualiza a tela de resumo final
function atualizarResumoFinal() {
  document.getElementById('resumo-motorista').innerText = dadosUsuario.motorista;
  document.getElementById('resumo-veiculo').innerText = dadosUsuario.veiculo;
  document.getElementById('resumo-datahora').innerText = dadosUsuario.dataHora || new Date().toLocaleString('pt-BR');
  document.getElementById('resumo-lat').innerText = dadosUsuario.latitude;
  document.getElementById('resumo-long').innerText = dadosUsuario.longitude;

  const selfieContainer = document.getElementById('selfie-preview-container');
  if (dadosUsuario.fotoSelfie) {
    selfieContainer.innerHTML = `<img src="${dadosUsuario.fotoSelfie}" class="selfie-img" alt="Selfie Motorista"><br><small style="color:#16a34a; font-weight:bold;">✔ Identidade Confirmada</small>`;
  } else {
    selfieContainer.innerHTML = `<span style="font-size:3rem;">👤</span>`;
  }
}

function finalizar() {
  alert(
    `✅ Cadastro e Abastecimento Concluídos!\n\n` +
    `Motorista: ${dadosUsuario.motorista}\n` +
    `Veículo: ${dadosUsuario.veiculo}\n` +
    `Data/Hora: ${dadosUsuario.dataHora}\n` +
    `Coordenadas GPS: ${dadosUsuario.latitude}, ${dadosUsuario.longitude}`
  );
  nextStep(1);
  iniciarCamera('videoSelfie', 'user');
}
const canvas = document.querySelector('#canvas');
const contexto = canvas.getContext('2d');
contexto.lineWidth = 5;
contexto.lineCap = 'round';
contexto.lineJoint = 'round';

contexto.beginPath();
contexto.moveTo(10, 0);
contexto.beginPath();
contexto.arc(250, 100, 20, 0, Math.PI *2);
contexto.stroke();


//pernas
contexto.beginPath();
contexto.moveTo(250, 120);
contexto.lineTo(250, 200);
contexto.lineTo(230, 230);
contexto.lineTo(230, 270);

contexto.stroke();


contexto.beginPath();
contexto.moveTo(250, 200);
contexto.lineTo(270, 230);
contexto.lineTo(270, 270);
contexto.stroke();

//braços
contexto.beginPath();
contexto.moveTo(250, 120);
contexto.lineTo(230, 150);
contexto.lineTo(260, 170);
contexto.stroke();

contexto.beginPath();
contexto.moveTo(250, 120);
contexto.lineTo(270, 150);
contexto.lineTo(290, 130);
contexto.stroke();
//Codigo por Javier Bagatol, 21/05/2022
const tituloDia = document.querySelector(".titulo-dia")
const numeroDia = new Date().getDay();
const numDia = new Date().getDate();
const dias = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];


function diaTexto(){
    tituloDia.innerHTML = `${dias[numeroDia]} ${numDia}`
}

function colorTexto(){
    if (numeroDia == 6 || numeroDia == 0){
        tituloDia.classList.add("diaNoLaboral")
    }
}

export function setDiaTitulo(){
    diaTexto();
    colorTexto();
}
import {Pagina} from "./Pagina.js"
//Codigo por Javier Bagatoli, fecha de creacion 18/05/2022
const numeroDia = new Date().getDay();
const dias = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

const tituloDia = document.querySelector(".titulo-dia")

tituloDia.innerHTML = `${dias[numeroDia]}`
if (numeroDia == 6 || numeroDia == 7){
    tituloDia.classList.add("diaNoLaboral")
}

let pagina = new Pagina("hola","como","estas?")
//Objetos
let idPersona = 0;
const persona = [{
    nombre : "Javier",
    edad : 22,
    puesto : "Ingeniero",
    entorno : [
        "https://calendar.google.com/calendar/u/0/r",
        "http://localhost:8080/api/v1/Empleados",
        "https://www.youtube.com/watch?v=xOinGb2MZSk&t=24137s"
    ],
    tareas : [
        "Caminar", "Probar cohetes", "Verificar combustible", "Trazar orbita"
    ],
    tareasConcluidas : [
        "Respirar"
    ]

},{
    nombre : "Paki",
    edad : 21,
    puesto : "Asistente",
    entorno : [
        "https://www.google.com"
    ],
    tareas : [
        "Caminar", "Limpieza", "Revision de calculos"
    ],
    tareasConcluidas : [
        "Correr"
    ]

},]

//Nav
const nav = document.querySelector(".estilo-nav")

nav.innerHTML += `
<div class="grid-item-1">
    <a href="./index.html"><h1>Inicio</h1></a>
    <a><h2 id="cambiarUsuario">Cambiar usuario</h2></a>
</div>
<div class="grid-item-usuario">
    <ul >
        <li>
            <h3 id="datosPerfil">${persona[idPersona].puesto} ${persona[idPersona].nombre} </h3>
        </li>
    </ul>
</div>
`;

//container
const container = document.querySelector(".container")
let tareasPendientes = crearListaTareas();
let tareasConcluidas = crearListaTareasConcluidas();

container.innerHTML += `
<article class="articulo">
    <h1>Tareas</h1>
    <div>
        ${tareasPendientes}
    </div>
</article>
<button 
     id="botonAmbito"
      class="boton-ambito-trabajo">
      🚀Ámbito de trabajo🚀
    </button>
<article class="articulo">
    <h1>Tareas concluidas</h1>
    <div>
        ${tareasConcluidas}
    </div>
</article>`

function crearListaTareas(){
    let HTMLResultado = "" 
    for (let tarea in persona[idPersona].tareas){
        HTMLResultado += `
        <div class="item-tarea">
            <p>
                ${persona[idPersona].tareas[tarea]}
            </p>
            <button 
                    class="boton-tarea"
                    value="${tarea}">
                completar
            </button>
        </div>`
    }
    return HTMLResultado
}

function crearListaTareasConcluidas(){
    let HTMLResultado = "";
    for (let tarea in persona[idPersona].tareasConcluidas){
        HTMLResultado += `
        <div class="item-tarea">
            <p>
                ${persona[idPersona].tareasConcluidas[tarea]}
            </p>
            <button 
                    class="boton-tarea-descompletar"
                    value="${tarea}">
                Descompletar
            </button>
        </div>`
    }
    return HTMLResultado
}

function actualizarListas(){
    tareasPendientes = crearListaTareas();
    tareasConcluidas = crearListaTareasConcluidas();

    container.innerHTML = `
    
    <article class="articulo">
    <h1>Tareas</h1>
    <div>
        ${tareasPendientes}
    </div>
    </article>
    <button
     id="botonAmbito"
      class="boton-ambito-trabajo">
      🚀Ámbito de trabajo🚀
    </button>
    <article class="articulo">
        <h1>Tareas concluidas</h1>
        <div>
            ${tareasConcluidas}
        </div>
    </article>`

    botonTarea = document.querySelectorAll(".boton-tarea");
    for(let boton in botonTarea){
        botonTarea[boton].addEventListener("click", () => concluir(botonTarea[boton].value))
    }

    botonTareaDescompletar = document.querySelectorAll(".boton-tarea-descompletar");
    for(let boton in botonTareaDescompletar){
        botonTareaDescompletar[boton].addEventListener("click", alert("gol"))
    }
}

//Cambiar Usuario -> creacion del codigo 19/05/2022
const cambiarUsuario = document.getElementById("cambiarUsuario")
cambiarUsuario.addEventListener("click", () => cambiarAUsuario())

function cambiarAUsuario(){
    if (idPersona == 0){
        idPersona = 1
    }else{
        idPersona = 0;
    }
    actualizarListas()
    actualizarDatosUsuario()
}

function actualizarDatosUsuario(){
    let perfilNav = document.getElementById("datosPerfil")
    perfilNav.innerHTML = `${persona[idPersona].puesto} ${persona[idPersona].nombre}`
}

//Funcionalidades

let botonAmbitoTrabajo = document.getElementById("botonAmbito")


botonAmbitoTrabajo.addEventListener("click", () => abrirEntorno())

function abrirEntorno() { 
    window.open(persona[idPersona].entorno[0])
    window.open(persona[idPersona].entorno[1])
    window.open(persona[idPersona].entorno[2])
}


let botonTarea = document.querySelectorAll(".boton-tarea");
for(let boton in botonTarea){
    botonTarea[boton].addEventListener("click", () => concluir(botonTarea[boton].value))
}

function concluir(valor){
    let tamTareas = persona[idPersona].tareas[valor];
    if (tamTareas === undefined){
        return console.log("Se ha desincronizado el vector")
    }else{
        let tareaCompletada = persona[idPersona].tareas[valor];
        persona[idPersona].tareasConcluidas.push(tareaCompletada)
        persona[idPersona].tareas.splice(valor,1)
        actualizarListas();
    }
}

let botonTareaDescompletar = document.querySelector(".boton-tarea-descompletar");
for(let boton in botonTareaDescompletar){
    botonTareaDescompletar[boton].addEventListener("click", () => descompletarTarea(botonTareaDescompletar[boton].value))
}

function descompletarTarea(valor){
    let tamTareas = persona[idPersona].tareasConcluidas[valor];
    if (tamTareas === undefined){
        return console.log("Se ha desincronizado el vector")
    }else{
        let tareaDescompletada = persona[idPersona].tareasConcluidas[valor];
        persona[idPersona].tareas.push(tareaDescompletada)
        persona[idPersona].tareasConcluidas.splice(valor,1)
        actualizarListas();
    }
}
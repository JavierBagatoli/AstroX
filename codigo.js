import {setDiaTitulo} from "./Dias.js"
import {baseDatos} from "./BaseFalsa.js"
import {Pagina} from "./Pagina.js"
//Codigo por Javier Bagatoli, fecha de creacion 21/05/2022

setDiaTitulo();
const pagina = new Pagina("<div> funciona? </div>")
//Objetos
let idPersona = 0;
const persona = baseDatos;

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
var botonTarea = document.querySelectorAll(".boton-tarea");
var botonTareaDescompletar = document.querySelectorAll(".boton-tarea-descompletar");
actualizarListas();

<<<<<<< HEAD
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
=======


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

function actualizarListas(){
    let tareasPendientes = crearListaTareas();
    let tareasConcluidas = crearListaTareasConcluidas();

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
    🚀Ambito de trabajo🚀
    </button>
    <article class="articulo">
        <h1>Tareas conlcuidas</h1>
        <div>
            ${tareasConcluidas}
        </div>
    </article>`

    botonTarea = document.querySelectorAll(".boton-tarea");
    botonTareaDescompletar = document.querySelectorAll(".boton-tarea-descompletar");

    for(let boton in botonTareaDescompletar){
        if (boton <= botonTareaDescompletar.length-1){
            botonTareaDescompletar[boton].addEventListener("click", () => descompletarTarea(botonTareaDescompletar[boton].value))
        }
    }

    for(let boton in botonTarea){
        if (boton <= botonTarea.length-1){
            botonTarea[boton].addEventListener("click", () => concluir(botonTarea[boton].value))
        }
    }
    
    
}
>>>>>>> d091aa6 (Pagina funcionando en modo stricto)

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

<<<<<<< HEAD
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
=======
>>>>>>> d091aa6 (Pagina funcionando en modo stricto)

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
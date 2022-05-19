const numeroDia = new Date().getDay();
const dias = [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ];

const tituloDia = document.querySelector(".titulo-dia")

tituloDia.innerHTML = `${dias[numeroDia]}`
if (numeroDia == 6 || numeroDia == 7){
    tituloDia.classList.add("diaNoLaboral")
}

//Objetos
const idPersona = 0;
const persona = [{
    nombre : "Javier",
    edad : 22,
    puesto : "ingeniero",
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
        "https://calendar.google.com/calendar/u/0/r",
        "http://localhost:8080/api/v1/Empleados",
        "https://www.youtube.com/watch?v=xOinGb2MZSk&t=24137s"
    ],
    tareas : [
        "Caminar", "Limpieza", "Revision de calculos"
    ],
    tareasConcluidas : [
        "Correr"
    ]

},]

let botonAmbitoTrabajo = document.getElementById("botonAmbito")

function abrirEntorno(){ 
    window.open(persona[idPersona].entorno[0])
    window.open(persona[idPersona].entorno[1])
    window.open(persona[idPersona].entorno[2])
}

//Nav
const nav = document.querySelector(".estilo-nav")

nav.innerHTML += `
<h2>Como estas?</h2>
<div class="grid-item">
    <ul >
        <li>
            <h3>${persona[idPersona].puesto} ${persona[idPersona].nombre} </h3>
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
<button onclick="abrirEntorno()"
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

function crearListaTareas(){
    HTMLResultado = "" 
    for (tarea in persona[idPersona].tareas){
        HTMLResultado += `
        <div class="item-tarea">
            <p>
                ${persona[idPersona].tareas[tarea]}
            </p>
            <button 
                    class="boton-tarea"
                    value="${tarea}"
                    onClick="concluir(${tarea})">
                completar
            </button>
        </div>`
    }
    return HTMLResultado
}

function crearListaTareasConcluidas(){
    HTMLResultado = "" 
    for (tarea in persona[idPersona].tareasConcluidas){
        HTMLResultado += `
        <div class="item-tarea">
            <p>
                ${persona[idPersona].tareasConcluidas[tarea]}
            </p>
            <button 
                    class="boton-tarea"
                    value="${tarea}"
                    onClick="descompletarTarea(${tarea})">
                Descompletar
            </button>
        </div>`
    }
    return HTMLResultado
}

const botonTarea = document.querySelector("boton-tarea");

//botonTarea.addEventListener("click",() => alert("click"))

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

function actualizarListas(){
    tareasPendientes = this.crearListaTareas();
    tareasConcluidas = this.crearListaTareasConcluidas();

    container.innerHTML = `
    
    <article class="articulo">
    <h1>Tareas</h1>
    <div>
        ${tareasPendientes}
    </div>
    </article>
    <button onclick="abrirEntorno()"
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
}
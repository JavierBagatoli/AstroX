import {setDiaTitulo} from "./Dias.js"
import {baseDatos} from "./BaseFalsa.js"
import {Pagina} from "./Pagina.js"
//Codigo por Javier Bagatoli, fecha de creacion 21/05/2022

setDiaTitulo();

//Objetos
const persona = baseDatos;
const pagina = new Pagina("")
//Nav
const nav = document.querySelector(".estilo-nav");
nav.innerHTML = pagina.setnavbar();
//container
const container = document.querySelector(".container")
var ListaBotonTarea = document.querySelectorAll(".boton-tarea");
var ListaBotonTareaDescompletar = document.querySelectorAll(".boton-tarea-descompletar");
var ListaBotonEliminar = document.querySelectorAll(".boton-eliminar-tarea");

let cambiarUsuario
let botonAgregarTarea;
let inputAgregarTarea;
//Cambiar Usuario -> creacion del codigo 19/05/2022
function defCambiarUsuario(){
    if (pagina.getIdPersona() != -1){
        cambiarUsuario = document.getElementById("cambiarUsuario")
        cambiarUsuario.addEventListener("click", () => cambiarAUsuario())
    }
}
defCambiarUsuario();


function cambiarAUsuario(){
    if (pagina.getIdPersona() != -1){
        nav.innerHTML = pagina.setIdPersona(-1)
    }else{
        nav.innerHTML = pagina.setIdPersona(0)
    }
    pagina.setnavbar();
    defCambiarUsuario();
    container.innerHTML = pagina.actualizarListas()
    defBotonesAcciones();
}

//Funcionalidades
container.innerHTML = pagina.actualizarListas();

function defBotonesAcciones(){
    ListaBotonTarea = document.querySelectorAll(".boton-tarea");
    ListaBotonTareaDescompletar = document.querySelectorAll(".boton-tarea-descompletar");
    ListaBotonEliminar = document.querySelectorAll(".boton-eliminar-tarea");

    for(let boton in ListaBotonEliminar){
        if (boton <= ListaBotonTareaDescompletar.length-1){
            ListaBotonEliminar[boton].addEventListener("click", () => {
                container.innerHTML = pagina.eliminarTarea(ListaBotonTareaDescompletar[boton].value);
                defBotonesAcciones();
            })
        }
    }

    for(let boton in ListaBotonTareaDescompletar){
        if (boton <= ListaBotonTareaDescompletar.length-1){
            ListaBotonTareaDescompletar[boton].addEventListener("click", () => {
                container.innerHTML = pagina.descompletarTarea(ListaBotonTareaDescompletar[boton].value)
                defBotonesAcciones();
                })
        }
    }

    for(let boton in ListaBotonTarea){
        if (boton <= ListaBotonTarea.length-1){
            ListaBotonTarea[boton].addEventListener("click", () => {
                container.innerHTML = pagina.concluir(ListaBotonTarea[boton].value);
                defBotonesAcciones();
            })
        }
    }
    defBotonAgregar();
}
defBotonesAcciones();

let botonAmbitoTrabajo = document.getElementById("botonAmbito")
if (botonAmbitoTrabajo !== null){
    botonAmbitoTrabajo.addEventListener("click", () => pagina.abrirEntorno())
}else{
    console.log("no existe el boton actualmente")
}

function defBotonAgregar(){
    if (pagina.getIdPersona() != -1){
        inputAgregarTarea = document.querySelector(".input-agregar-tarea")
        botonAgregarTarea = document.querySelector(".boton-agregar-tarea")
        botonAgregarTarea.addEventListener("click", () => {
            if (entradaValida(inputAgregarTarea.value) ){
                pagina.agregarTarea(inputAgregarTarea.value);
                container.innerHTML = pagina.actualizarListas();
                inputAgregarTarea.value = "";
                defBotonesAcciones();
            }
        })
    }else{
        let botonIniciarSesion = document.getElementById('boton-iniciar-sesion')
        let inputNombre = document.getElementById('nombre')
        let inputContrasenia = document.getElementById('contrasenia')
        botonIniciarSesion.addEventListener("click", () => iniciarSesion(inputNombre.value, inputContrasenia.value))

        let botonRegistrar = document.getElementById('boton-registrar')
        let inputNombreRegistrar = document.getElementById('nombreRegistro')
        let inputPuestoRegistrar = document.getElementById('puestoRegistro')
        let inputEdadRegistrar = document.getElementById('edadeRegistro')
        let inputContraseniaRegistrar = document.getElementById('contraseniaRegistro')
        let inputContraseniaRepetidaRegistrar = document.getElementById('contraseniaRepetidaRegistro')
        botonRegistrar.addEventListener("click", () => registrarEmpleado(
            inputNombreRegistrar.value,
            inputPuestoRegistrar.value,
            inputEdadRegistrar.value,
            inputContraseniaRegistrar.value,
            inputContraseniaRepetidaRegistrar.value))
    }
}

function iniciarSesion(nombre, contrasenia){
    if (entradaValida(nombre)){
        for (let empleado in baseDatos){
            if (baseDatos[empleado].nombre == nombre){
                if (baseDatos[empleado].contrasenia == contrasenia){
                    nav.innerHTML = pagina.setIdPersona(empleado);
                    container.innerHTML = pagina.actualizarListas();
                    defBotonesAcciones();
                    defCambiarUsuario();
                }
            }
        }
    }
}

function registrarEmpleado(nombre,puesto,edad,contrasenia,contraseniaRepetida){
    if (entradaValida(nombre)){
        if (entradaValida(puesto)){
            if(contrasenia == contraseniaRepetida){
                baseDatos.push({
                    nombre : nombre,
                    contrasenia: contrasenia,
                    edad : edad,
                    puesto : puesto,
                    entorno : [],
                    tareas : [],
                    tareasConcluidas : []
                })
                nav.innerHTML = pagina.setIdPersona(baseDatos.length-1);
                container.innerHTML = pagina.actualizarListas();
                defBotonesAcciones();
                defCambiarUsuario();
                console.log(baseDatos)
            }
        }
    }
}

function entradaValida(entrada){
    if (entrada.length < 3){
        return false
    }
    for (let letra in entrada){
        let caracter = entrada[letra].charCodeAt()
        if (noEsLetra(caracter)){
            return false
        }
    }
    return true
}

function noEsLetra(caracter){
    return ((caracter <= 64 || caracter >= 91) && (caracter <= 96 || caracter >= 123) && (caracter != 32))
}
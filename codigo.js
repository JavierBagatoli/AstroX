//Codigo desarrollado por Javier Bagatoli desde el 21/05/2022 al 26/05/2022
import {setDiaTitulo} from "./Dias.js"
import {baseDatos} from "./BaseFalsa.js"
import {Pagina} from "./Pagina.js"

//Objetos
var pagina;
if (pagina == null){
    pagina = new Pagina()
}

//Nav
const nav = document.querySelector(".estilo-nav");
nav.innerHTML = pagina.setnavbar();
//container
const container = document.querySelector(".container")
var ListaBotonTarea = document.querySelectorAll(".boton-tarea");
var ListaBotonTareaDescompletar = document.querySelectorAll(".boton-tarea-descompletar");
var ListaBotonEliminar = document.querySelectorAll(".boton-eliminar-tarea");

let cerrarUsuario
let botonAgregarTarea;
let inputAgregarTarea;
let botonAmbitoTrabajo

//Cambiar Usuario -> creacion del codigo 19/05/2022
function defCambiarUsuario(){
    if (pagina.getIdPersona() != -1){
        cerrarUsuario = document.getElementById("cerrarSesion")
        cerrarUsuario.addEventListener("click", () => cerrarSesion())
        botonAmbitoTrabajo = document.getElementById("botonAmbito")
        botonAmbitoTrabajo.addEventListener("click", () => pagina.abrirEntorno())
    }
}


function cerrarSesion(){
    if (pagina.getIdPersona() != -1){
        nav.innerHTML = pagina.setIdPersona(-1)
    }
    pagina.setnavbar();
    actualizarPagina();
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

function defBotonAgregar(){
    if (pagina.getIdPersona() != -1){
        inputAgregarTarea = document.querySelector(".input-agregar-tarea")
        botonAgregarTarea = document.querySelector(".boton-agregar-tarea")
        botonAgregarTarea.addEventListener("click", () => {
            if (entradaValida(inputAgregarTarea.value) ){
                pagina.agregarTarea(inputAgregarTarea.value);
                actualizarPagina()
                inputAgregarTarea.value = "";
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

function retroalimentacion(texto){
    retroalimentacionInicioSesion.classList.add("rojo")
    retroalimentacionInicioSesion.innerHTML = texto;
}

function iniciarSesion(nombre, contrasenia){
    if (entradaValida(nombre)){
        for (let empleado in baseDatos){
            if (baseDatos[empleado].nombre == nombre){
                if (baseDatos[empleado].contrasenia == contrasenia){
                    nav.innerHTML = pagina.setIdPersona(empleado);
                    actualizarPagina()
                    
                }else{
                    retroalimentacion("Contraseña invalida.");
                }
                break;
            }else{
                retroalimentacion("El empleado no existe.")
            }
        }
    }else{
        retroalimentacion("El nombre no es válido, solo se admiten letras y espacios.")
    }
}

function retroalimentacionRegistro(texto){
    retroalimentacionInicioRegistro.classList.add("rojo")
    retroalimentacionInicioRegistro.innerHTML = texto;
}

function registrarEmpleado(nombre,puesto,edad,contrasenia,contraseniaRepetida){
    if (entradaValida(nombre)){
        if (entradaValida(puesto)){
            if (edad >= 18 && edad <= 80){
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
                    actualizarPagina()
                }else{
                    retroalimentacionRegistro("Las contraseñas no coinciden.");
                }
            }else{
                retroalimentacionRegistro("La edad debe estar entre los límites de 18 a 80 años.");
            }
        }else{
            retroalimentacionRegistro("El puesto no es válido, solo se admiten letras y espacios.")
        }
    }else{
        retroalimentacionRegistro("El nombre no es válido, solo se admiten letras y espacios.")
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

function actualizarPagina(){
    container.innerHTML = pagina.actualizarListas();
    defBotonesAcciones();
    defCambiarUsuario();
}

export function iniciar(){
    setDiaTitulo();
    defCambiarUsuario();
    defBotonesAcciones();
}
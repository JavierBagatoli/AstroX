//Codigo desarrollado por Javier Bagatoli desde el 21/05/2022 al 26/05/2022
import {baseDatos} from "./BaseFalsa.js"
import {dias, meses} from "./Dias.js"

const persona = baseDatos;


export class Pagina{
    constructor(){
        this.idPersona = -1;
    }

    getnavbar(){
        return this.nav;
    }

    getIdPersona(){
        return this.idPersona;
    }

    setIdPersona(id){
        this.idPersona = id;
        return this.setnavbar();
    }
    setnavbar(){
        let forma = ``;
        if (this.idPersona == -1){
            forma = `
            <div class="grid-item-1">
            </div>`
        }else{
            forma = `
                <div class="grid-item-1">
                    <h1>AstroX</h1>
                    <h2 id="datosPerfil">${persona[this.idPersona].puesto} ${persona[this.idPersona].nombre}</h2>
                </div>
                <div class="grid-item-usuario">
                    <a><h2 id="cerrarSesion">Cerrar sesión</h2></a>
                </div>
                `;
        }
        return forma;
    }

    crearListaTareas(){
        let HTMLResultado = "";
        let listaTareaPersona = persona[this.idPersona].tareas;
            for (let tarea in listaTareaPersona){
                let tareaObjeto =listaTareaPersona[tarea];
                let fechaFin = this.fechaFormato(tareaObjeto.fechaFinalizacion);
                HTMLResultado += `
                <div class="item-tarea">
                    <p title="Fecha maxima para finalizar ${fechaFin}">
                        ${tareaObjeto.nombre}
                    </p>
                    <button 
                            class="boton-tarea"
                            value="${tarea}"
                            title="Completará la tarea">
                        Completar
                    </button>
                </div>`;
            }
        return HTMLResultado
    }

    fechaFormato(fechaBruta) {
        if (fechaBruta == null || fechaBruta ===""){
            return "no tiene límite temporal"
        }else{
            let fechaObjeto = new Date(fechaBruta)
            return `${dias[fechaObjeto.getDay()]} ${fechaObjeto.getDate()} de ${meses[fechaObjeto.getMonth()]}`
        }
    }

    crearListaTareasConcluidas(){
        let HTMLResultado = "";
        for (let tarea in persona[this.idPersona].tareasConcluidas){
            HTMLResultado += `
            <div class="item-tarea">
                <p>
                    ${persona[this.idPersona].tareasConcluidas[tarea]}
                </p>
                <button 
                        class="boton-eliminar-tarea"
                        value="${tarea}"
                        title="Elimina la tarea de permanentemente">
                    Eliminar
                </button>
                <button 
                        class="boton-tarea-descompletar"
                        value="${tarea}"
                        title="Mueve la tarea a la lista de tareas incompletas">
                    Descompletar
                </button>
            </div>`
        }
        return HTMLResultado
    }

    actualizarListas(){
        if (this.idPersona != -1){
        let tareasPendientes = this.crearListaTareas();
        let tareasConcluidas = this.crearListaTareasConcluidas();
        return  `    
            <article class="articulo">
                <h1>Tareas</h1>
                <div>
                    ${tareasPendientes}
                </div>
            </article>
            <section style="text-align:center;">
                <button
                id="botonAmbito"
                class="boton-ambito-trabajo">
                Ámbito laboral
                </button>
                <article class="articulo art-tarea columna">
                    <h1 class="c1">Agregar Tarea</h1>
                    <input style="margin-left:25px;" class="input-agregar-tarea c2" type="text" maxlength="30">
                    <label class="c3">Fecha finalizacion</label>
                    <input id="fechaFinalizacionTarea" class="c4 input-agregar-tarea" type="date">
                    <button class="c5 boton-agregar-tarea" title="Agrega una tarea a la lista 'Tareas'">Agregar</button>
                </article>
            </section>
            <article class="articulo">
                <h1>Tareas concluidas</h1>
                <div>
                    ${tareasConcluidas}
                </div>
            </article>`
        }
        return `<article>
                    <div class="articulo login">
                        <h1>Registrarse</h1>
                        <div class="columna">
                            <input id="nombreRegistro" class="input-agregar-tarea c1" type="text" placeholder="Nombre">
                            <input id="puestoRegistro" class="input-agregar-tarea c2" type="text" placeholder="Puesto">
                            <input id="edadeRegistro" class="input-agregar-tarea c3" type="number" placeholder="Edad" min="18" max="80">
                            <input id="contraseniaRegistro" class="input-agregar-tarea c4" type="password" placeholder="Contraseña">
                            <input id="contraseniaRepetidaRegistro" class="input-agregar-tarea c5" type="password" placeholder="Repita la contraseña">
                            <button id="boton-registrar" class="boton c6 boton-centrar">Agregar</button>
                            <p id="retroalimentacionInicioRegistro" class="c7"></p>
                        </div>
                    </div>
                </article>

                <article>
                </article>
                
                <article>
                    <div class="articulo login">
                        <h1>Iniciar Sesión</h1>
                        <div class="columna">
                            <input id="nombre" class="input-agregar-tarea c1" type="text" placeholder="Nombre">
                            <input id="contrasenia" class="input-agregar-tarea c2" type="password" placeholder="Contraseña">
                            <button id="boton-iniciar-sesion" class="boton c3 boton-centrar">Iniciar sesión</button>
                            <p id="retroalimentacionInicioSesion" class="c4"></>
                        </div>
                    </div>
                </article>`
    }

    concluir(valor){
        let tamTareas = persona[this.idPersona].tareas[valor];
        if (tamTareas === undefined){
            return console.log("Se ha desincronizado el vector")
        }else{
            let tareaCompletada = persona[this.idPersona].tareas[valor];
            persona[this.idPersona].tareasConcluidas.push(tareaCompletada)
            persona[this.idPersona].tareas.splice(valor,1)
            return this.actualizarListas();
        }
    }
    
    
    descompletarTarea(valor){
        let tamTareas = persona[this.idPersona].tareasConcluidas[valor];
        if (tamTareas === undefined){
            return console.log("Se ha desincronizado el vector")
        }else{
            let tareaDescompletada = persona[this.idPersona].tareasConcluidas[valor];
            persona[this.idPersona].tareas.push(tareaDescompletada)
            persona[this.idPersona].tareasConcluidas.splice(valor,1)
            return this.actualizarListas();
        }
    }

    abrirEntorno() { 
        let entornos = persona[this.idPersona].entorno
        for (let index in entornos){
        window.open(entornos[index])
        }
    }

    agregarTarea(tarea,fechaFinalizacion){
        let tareaAgregar = {
            nombre: tarea,
            fechaFinalizacion : fechaFinalizacion
        }
        console.log(tareaAgregar)
        persona[this.idPersona].tareas.push(tareaAgregar)
        return this.actualizarListas();
    }

    eliminarTarea(tarea){
        persona[this.idPersona].tareasConcluidas.splice(tarea,1)
        return this.actualizarListas();
    }
}
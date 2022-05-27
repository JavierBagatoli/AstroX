//Codigo desarrollado por Javier Bagatoli desde el 21/05/2022 al 26/05/2022
import {baseDatos} from "./BaseFalsa.js"

const persona = baseDatos;


export class Pagina{
    constructor(){
        this.idPersona = -1;
    }

    getnavbar(){
        return this.nav;
    }

    set nav(nav){
        this.nav = nav
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
                <h1>AstroX</h1>
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
        let HTMLResultado = ""
            for (let tarea in persona[this.idPersona].tareas){
                HTMLResultado += `
                <div class="item-tarea">
                    <p>
                        ${persona[this.idPersona].tareas[tarea]}
                    </p>
                    <button 
                            class="boton-tarea"
                            value="${tarea}">
                        Completar
                    </button>
                </div>`;
            }
        return HTMLResultado
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
                        value="${tarea}">
                    Eliminar
                </button>
                <button 
                        class="boton-tarea-descompletar"
                        value="${tarea}">
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
                🚀Ámbito de trabajo🚀
                </button>
                <article class="articulo art-tarea">
                    <h1>Agregar Tarea</h1>
                    <input style="margin-left:25px;" class="input-agregar-tarea" type="text" maxlength="30">
                    <button class="boton-agregar-tarea">Agregar</button>
                </article>
            </section>
            <article class="articulo">
                <h1>Tareas concluidas</h1>
                <div>
                    ${tareasConcluidas}
                </div>
            </article>`
        }
        return `<article></article>
                <article >
                    <div class="articulo">
                        <h1>Iniciar Sesión</h1>
                        <div class="columna">
                            <input id="nombre" class="input-agregar-tarea c1" type="text" placeholder="Nombre">
                            <input id="contrasenia" class="input-agregar-tarea c2" type="password" placeholder="Contraseña">
                            <button id="boton-iniciar-sesion" class="boton c3 boton-centrar">Iniciar sesión</button>
                            <p id="retroalimentacionInicioSesion" class="c4"></>
                        </div>
                    </div>
                    <br/>
                    <div class="articulo">
                        <h1>Registrarse</h1>
                        <div class="columna">
                            <input id="nombreRegistro" class="input-agregar-tarea c1" type="text" placeholder="Nombre">
                            <input id="puestoRegistro" class="input-agregar-tarea c2" type="text" placeholder="Puesto">
                            <input id="edadeRegistro" class="input-agregar-tarea c3" type="number" placeholder="Edad" min="18" max="80">
                            <input id="contraseniaRegistro" class="input-agregar-tarea c4" type="password" placeholder="Contraseña">
                            <input id="contraseniaRepetidaRegistro" class="input-agregar-tarea c5" type="password" placeholder="Repita la contraseña">
                            <button id="boton-registrar" class="boton c6 boton-centrar">Agregar</button>
                            <p id="retroalimentacionInicioRegistro" class="c7"></>
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

    agregarTarea(tarea){
        persona[this.idPersona].tareas.push(tarea)
        return this.actualizarListas();
    }

    eliminarTarea(tarea){
        persona[this.idPersona].tareasConcluidas.splice(tarea,1)
        return this.actualizarListas();
    }
}
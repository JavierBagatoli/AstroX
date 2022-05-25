import {baseDatos} from "./BaseFalsa.js"

const persona = baseDatos;


export class Pagina{
    constructor(cuerpo){
        this.cuerpo = cuerpo;
        this.idPersona = 0;
        
    }

    getnavbar(){
        return this.nav;
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
                <a href="./index.html"><h1>Inicio</h1></a>
                <a><h2 id="iniciarSesion">Iniciar Sesion</h2></a>
            </div>`
        }else{
            forma = `
                <div class="grid-item-1">
                    <a href="./index.html"><h1>Inicio</h1></a>
                    <a><h2 id="cambiarUsuario">Cambiar usuario</h2></a>
                </div>
                <div class="grid-item-usuario">
                    <ul >
                        <li>
                            <h3 id="datosPerfil">${persona[this.idPersona].puesto} ${persona[this.idPersona].nombre}</h3>
                        </li>
                    </ul>
                </div>
                `;
        }
        return forma;
    }

    getcuerpo(){
        return this.cuerpo;
    }

    setcuerpo(cuerpo){
        this.cuerpo = cuerpo;
    }
}
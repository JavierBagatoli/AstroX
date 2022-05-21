export class Empleado{
    constructor(nombre, puesto, tareas, tareasConcluidas){
        this.nombre = nombre;
        this.puesto = puesto;
        this.tareas = tareas;
        this.tareasConcluidas = tareasConcluidas;
    }

    get nombre(){
        return this.nombre;
    }

    set nombre(nombre){
        this.nombre = nombre;
    }

    get puesto(){
        return this.puesto;
    }

    set puesto(puesto){
        this.puesto = puesto;
    }
}
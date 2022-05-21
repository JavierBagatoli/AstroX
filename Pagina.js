export class Pagina{
    constructor(nav, cuerpo, persona){
        this.nav = nav;
        this.persona = persona;
        this.cuerpo = cuerpo;
    }

    get nav(){
        return this.nav;
    }

    set nav(nav){
        this.nav = nav;
    }
}
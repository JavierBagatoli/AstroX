export class Pagina{
    constructor(nav){
        this.nav = nav;
    }

    get navbar(){
        return this.nav;
    }

    set navbar(_nav){
        this.nav = _nav;
    }
}
//Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado=document.querySelector('#gastos ul');



//Eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);
}



//Classes
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante= Number(presupuesto); //Al iniciar el objeto, el restante es igual al presupuesto ingresado
        this.gastos=[];
    }


}

class UI{
    insetarPrespuesto(cantidad){
        const{presupuesto,restante}= cantidad;

        //Agregar al HTML
        document.querySelector('#total').textContent=presupuesto
        document.querySelector('#restante').textContent=restante
    }
}

//Instanciar
const ui = new UI();

let presupuesto;

//Funciones
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('Cual es tu presupuesto?');
    if (presupuestoUsuario==='' || presupuestoUsuario===null || isNaN(presupuestoUsuario) || presupuestoUsuario<=0){
        window.location.reload();
    }

    //Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);
    ui.insetarPrespuesto(presupuesto)
    
}
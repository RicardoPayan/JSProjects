//Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado=document.querySelector('#gastos ul');



//Eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);
    formulario.addEventListener('submit',agregarGastos);
}



//Classes
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante= Number(presupuesto); //Al iniciar el objeto, el restante es igual al presupuesto ingresado
        this.gastos=[];
    }

    nuevoGasto(gasto){
        this.gastos = [...this.gastos,gasto]; //Creamos una copia del gastos y le agregamos el nuevo gasto
        this.calcularRestante();
    }

    calcularRestante(){
        const gastado = this.gastos.reduce((total,gasto)=> total + gasto.cantidad, 0);
        this.restante = this.presupuesto-gastado;
        
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto=>gasto.id !==id); //Traernos todos, excepto el ID que tratamos de eliminar
        this.calcularRestante();
    }

}

class UI{
    insetarPrespuesto(cantidad){
        const{presupuesto,restante}= cantidad;

        //Agregar al HTML
        document.querySelector('#total').textContent=presupuesto
        document.querySelector('#restante').textContent=restante
    }

    imprimirAlerta(mensaje,tipo){
        //Crear el div
        const divAlerta=document.createElement('div');
        divAlerta.classList.add('alert','text-center');
        
        if(tipo==='error'){
            divAlerta.classList.add('alert-danger');
        }else{
            divAlerta.classList.add('alert-success');
        }

        divAlerta.textContent=mensaje;
        
        //Insertar en el HTML
        document.querySelector('.primario').insertBefore(divAlerta,formulario);

        //Quitar HTML
        setTimeout(() => {
            divAlerta.remove();
        }, 3000);
    }

    agregarGastoListado(gastos){
        limpiarHTML();
        gastos.forEach(gasto => {
            const{nombre,cantidad,id} = gasto;
            
            //Crear LI
            const nuevoGasto= document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id; //Asignando el id del objeto al HTML
            

            //Agregar el HTML del gasto
            nuevoGasto.innerHTML=`
                ${nombre} <span class="badge badge-primary badge-pill"> $${cantidad} </span>
            
            `

            //Boton para borrar
            const btnBorrar=document.createElement('button');
            btnBorrar.classList.add('btn','btn-danger','borrar-gasto');
            btnBorrar.textContent='Borrar x'
            nuevoGasto.appendChild(btnBorrar);
            btnBorrar.onclick=()=>{
                eliminarGasto(id);
            }


            //Agregar al HTML
            gastoListado.appendChild(nuevoGasto);
        });
    }

    actualizarRestante(restante){
        document.querySelector('#restante').textContent=restante;
    }

    comprobarPresupuesto(presupuestoOBJ){
        const{presupuesto,restante}=presupuestoOBJ;
        const restanteDiv=document.querySelector('.restante');

        //Comprobar 25%
        if((presupuesto/4) > restante){
            restanteDiv.classList.remove('alert-success','alert-warning');
            restanteDiv.classList.add('alert-danger'); 
        }else if((presupuesto/2) > restante){
            //comprobar el 50%
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');  
        }else{
            restanteDiv.classList.remove('alert-danger','alert-warning');
            restanteDiv.classList.add('alert-success')
        }

        //Si el total<0
        if(restante<=0){
            ui.imprimirAlerta('El presupuesto se ha agotado','error');
            formulario.querySelector('button[type="submit"]').disabled=true;
        }

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

function agregarGastos(e){
    e.preventDefault();

    //Leer los datos del formulario
    const nombre=document.querySelector('#gasto').value;
    const cantidad=Number(document.querySelector('#cantidad').value);
    
    //Validar
    if(nombre==='' || cantidad===''){
        ui.imprimirAlerta('Ambos campos son obligatorios','error');
        return;
    }else if(cantidad<=0 || isNaN(cantidad)){
        ui.imprimirAlerta('Cantidad no valida','error');
        return;
    }

    //Generar un objeto con el gasto

    //Esto es lo contrario a distruction

    const gasto={nombre,cantidad,id: Date.now()} //Esta sintaxis une nombre y cantidad a gasto
    
    presupuesto.nuevoGasto(gasto);

    //Solamente una vez que hayamos agregado el gasto al arreglo, entonces podemos imprimir la alerta de exito
    ui.imprimirAlerta('Agregado correctamente');

    //Imprimir los gastos
    const {gastos,restante} = presupuesto;
    ui.agregarGastoListado(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto); //Le pasamos todo el objeto porque ocupamos comprobar tanto el gasto como el restante

    //Reiniciando el formulario
    formulario.reset();

}

function limpiarHTML(){
    while(gastoListado.firstChild){
        gastoListado.removeChild(gastoListado.firstChild);
    }
}

function eliminarGasto(id){

    //Elimando del array
    presupuesto.eliminarGasto(id);

    //Eliminando del HTML
    const {gastos,restante}=presupuesto;
    ui.agregarGastoListado(gastos);

    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}

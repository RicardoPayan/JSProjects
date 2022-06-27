const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
//Campos del formulario

const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');


//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;

//CLASES

class Citas{
    constructor(){
        this.citas=[];
    }

    agregarCita(cita){
        this.citas=[...this.citas,cita];
    }

    eliminarCita(id){
        this.citas=this.citas.filter(cita=> cita.id!==id);
    }

    editarCita(citaActualizada){
        //Iterar en cada una de las citas, verifica que la cita y la cita actualizada tengan el mismo ID y se reescribe todo el objeto
        this.citas = this.citas.map(cita => cita.id=== citaActualizada.id ? citaActualizada : cita);
    }
}

class UI{
    imprimirAlerta(mensaje,tipo){
        //crear el div
        const divMensaje=document.createElement('div');
        divMensaje.classList.add('text-center','alert','d-block','col-12');

        //agregar clase en base al tipo de error
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Agregar al dom
        document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'));

        //Quitar alerta despues de 3s
        setTimeout(() => {
            divMensaje.remove()
        }, 3000);
    }

    //destructoring desde el parentesis
    imprimirCitas({citas}){

        this.limpiarHTML();

        citas.forEach(cita => {
            const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;

            const divCita=document.createElement('div');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id=id;

            //Scripting de los elementos de la cita
            const mascotaParrafo=document.createElement('h2');
            mascotaParrafo.classList.add('card-title','font-weight-bolder');
            mascotaParrafo.textContent=mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `

            //Boton para eliminar cita
            const btnEliminar=document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-2');
            btnEliminar.innerHTML='Eliminar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'

            btnEliminar.onclick = ()=> eliminarCita(id);

            //Agregar boton para editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn','btn-info','mr-2'); 
            btnEditar.innerHTML= 'Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>'
            btnEditar.onclick= ()=>cargarEdicion(cita);    

            //Agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);
            
            //agregar las citas al html
            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }

}

const ui = new UI();
const administrarCitas= new Citas();



//REGISTRAR EVENTOS
eventListener();
function eventListener(){
    mascotaInput.addEventListener('input',datosCita);
    propietarioInput.addEventListener('input',datosCita);
    telefonoInput.addEventListener('input',datosCita);
    fechaInput.addEventListener('input',datosCita);
    horaInput.addEventListener('input',datosCita);
    sintomasInput.addEventListener('input',datosCita);

    formulario.addEventListener('submit',nuevaCita);
}

//OBJETO CON INFO DE LA CITA
const citaOBJ= {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',   
    sintomas: ''   
}


//FUNCIONES

//agrega datos al objeto citaOBJ
function datosCita(e){
    //'name' accede a la propiedad del HTML
    citaOBJ[e.target.name] = e.target.value;
    
}

//Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e){
    e.preventDefault();

    //Extraer la informacion del objeto de cita
    const {mascota,propietario,telefono,fecha,hora,sintomas} = citaOBJ;

    //Validar
    if(mascota==='' || propietario==='' || telefono==='' || fecha==='' || hora==='' || sintomas===''){
        ui.imprimirAlerta('Todos los campos son obligatorios','error');
        return;
    }

    if(editando){
        ui.imprimirAlerta('Editado correctamente');

        administrarCitas.editarCita({...citaOBJ})

        //Regresar el texto del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent='Crear cita';

        //Quitar modo edicion
        editando=false;
    }else{
        //generar un id unico
        citaOBJ.id=Date.now();

        //Crear la cita
         administrarCitas.agregarCita({...citaOBJ}); //Pasando una copia del objeto

         //Mensaje de agregado correctamente
         ui.imprimirAlerta('Se agrego correctamente');
    }

  

    //Reiniciar objeto para la validacion
    reiniciarObjeto();

    //reiniciar el formulario
    formulario.reset();

    //Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);
}

function reiniciarObjeto(){
    citaOBJ.mascota='';
    citaOBJ.propietario='';
    citaOBJ.telefono='';
    citaOBJ.fecha='';
    citaOBJ.hora='';
    citaOBJ.sintomas='';
}

function eliminarCita(id){
    //eliminar cita
    administrarCitas.eliminarCita(id);


    //Mostrar mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');

    //Refrescar citas
    ui.imprimirCitas(administrarCitas);
}

//Carga los datos y el modo edicion
function cargarEdicion(cita){
    const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;

    //Llenar los inputs
    mascotaInput.value=mascota;
    propietarioInput.value=propietario;
    telefonoInput.value=telefono;
    fechaInput.value=fechaInput;
    horaInput.value=hora;
    sintomasInput.value=sintomas;

    //Llenar el objeto
    citaOBJ.mascota = mascota;
    citaOBJ.propietario = propietario;
    citaOBJ.telefono =telefono;
    citaOBJ.fecha = fecha;
    citaOBJ.hora = hora;
    citaOBJ.sintomas = sintomas;
    citaOBJ.id = id;



    //Cambiar el texto del btn
    formulario.querySelector('button[type="submit"]').textContent='Guardar Cambios';

    editando=true;

}

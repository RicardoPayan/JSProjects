import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import {mascotaInput, 
    propietarioInput,
    telefonoInput,
    horaInput,
    fechaInput,
    sintomasInput,
    formulario,
    contenedorCitas
} from './selectores.js'; 

//CLASES
const ui = new UI();
const administrarCitas= new Citas();

//Variable para saber si se esta editando un cita.
let editando;

//OBJETO CON INFO DE LA CITA
const citaOBJ= {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',   
    sintomas: ''   
}

//agrega datos al objeto citaOBJ
export function datosCita(e){
    //'name' accede a la propiedad del HTML
    citaOBJ[e.target.name] = e.target.value;
    
}

//Valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e){
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

export function reiniciarObjeto(){
    citaOBJ.mascota='';
    citaOBJ.propietario='';
    citaOBJ.telefono='';
    citaOBJ.fecha='';
    citaOBJ.hora='';
    citaOBJ.sintomas='';
}

export function eliminarCita(id){
    //eliminar cita
    administrarCitas.eliminarCita(id);


    //Mostrar mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');

    //Refrescar citas
    ui.imprimirCitas(administrarCitas);
}

//Carga los datos y el modo edicion
export function cargarEdicion(cita){
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

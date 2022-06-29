import {datosCita,nuevaCita} from '../funciones.js';
import {mascotaInput, 
    propietarioInput,
    telefonoInput,
    horaInput,
    fechaInput,
    sintomasInput,
    formulario,
    contenedorCitas
} from '../selectores.js'; 


class App{
    constructor(){
        this.initApp();
    }

    initApp(){
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
    }
}

export default App;
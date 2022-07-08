    import {imprimirAlerta,conectarDB,DB} from './funciones.js'

    
    let idCliente;
    const formulario = document.querySelector('#formulario');
   
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const empresaInput = document.querySelector('#empresa');
    const telefonoInput = document.querySelector('#telefono');

    document.addEventListener('DOMContentLoaded', ()=>{
        conectarDB();

        formulario.addEventListener('submit',actualizarCliente);

        //Verificar si el cliente existe
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id');
        if(idCliente){
            setTimeout(() => {
                obtenrCliente(idCliente);
            },100);
        }
    });

    

    function obtenrCliente(id){
        const transaction = DB.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');

        console.log(objectStore);

        var request = objectStore.openCursor();
        request.onsuccess = function (event){
            var cursor = event.target.result;
            if(cursor){
                if(cursor.value.id == id){
                    //Pasar el que estamos editando...
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }
    }

    function llenarFormulario(datosCliente){
        const {nombre,email,empresa,telefono} = datosCliente;

        //Asignar valores a los selectores
        nombreInput.value = nombre;
         emailInput.value = email;
         empresaInput.value = empresa;
         telefonoInput.value = telefono;
    }

    function actualizarCliente(e){
        e.preventDefault();

        //Validando que todo este lleno.
        if( nombreInput.value === '' || emailInput.value === '' || empresaInput.value === '' || telefonoInput.value === '' ) {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        //Actualizar...
        const clienteActualizado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            empresa: empresaInput.value,
            telefono: telefonoInput.value,
            id: Number(idCliente)
        };

        //Actualizar en la db
        const transaction = DB.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.put(clienteActualizado);

        transaction.oncomplete = ()=>{
            imprimirAlerta('Actualizado correctamente');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }

        transaction.onerror = ()=>{
            imprimirAlerta('Hubo un error','error');
            
        }

    }

   


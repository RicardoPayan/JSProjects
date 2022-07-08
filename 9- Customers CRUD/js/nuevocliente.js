    import {imprimirAlerta,conectarDB,DB} from './funciones.js'
    

    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded',()=>{
        conectarDB();
        formulario.addEventListener('submit',validarCliente);
    })

   

    function validarCliente(e){
        e.preventDefault();
        //Leer todos los inputs

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre==='' || email==='' || telefono==='' || empresa===''){
            imprimirAlerta('Todos los campos son obligatorios','error');            

            return;
        }

        //Crear un objeto con la informacion
        //Sintaxis de object literal
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        } 
        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente){
        
        const transaction = DB.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.oncomplete = () =>{
            imprimirAlerta('Cita agregada correctamente');

            //Devuelta a la pagina inicial cuando se terminede agregar
            setTimeout(() => {
                window.location.href='index.html';
            },3000);
        }

        transaction.onerror = () =>{
            imprimirAlerta('Hubo un error','error');
        }

    }


    

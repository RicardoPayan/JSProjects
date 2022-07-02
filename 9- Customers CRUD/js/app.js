

(function (){
    let DB;
    const listadoClientes = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded',()=>{
        crearDB();

        
        
        //Si hay una base de datos, entonces obtenemos los clientes
        if(window.indexedDB.open('crm',1)){
            obtenerClientes();
        }

        listadoClientes.addEventListener('click',eliminarCliente);
    })

    function eliminarCliente(e){
        if(e.target.classList.contains('eliminar')){
            const idDelete=Number(e.target.dataset.cliente) //Obteniendo el id del dataset del HTML
            
            //confirm muestra una ventana nativa que pide confirmar la accion antes de realizarla
            const confirmar = confirm('¿Deses eliminar este cliente?');
            if(confirmar){
                const transaction = DB.transaction(['crm'],'readwrite');
                const objectStore = transaction.objectStore('crm');

                objectStore.delete(idDelete);

                transaction.oncomplete = () =>{
                    console.log('Eliminado');
                    e.target.parentElement.parentElement.remove()
                }

                transaction.onerror = ()=>{
                    console.log('Hubo un error');
                }
            }
        }
    }

    function crearDB(){
        const crearDB = window.indexedDB.open('crm',1);
    
        crearDB.onerror = function(){
            console.log('Hubo un error');
        }
    
        crearDB.onsuccess = function(){
            DB = crearDB.result; //Si la base de datos se crear correctamente se asignara a esta base.
        }
    
        crearDB.onupgradeneeded = function(e){
            const db = e.target.result;
            const objectStore = db.createObjectStore('crm',{keyPath:'id',autoIncrement: true});
    
            objectStore.createIndex('nombre','nombre',{unique:false});
            objectStore.createIndex('email','email',{unique:true});
            objectStore.createIndex('telefono','telefono',{unique:false});
            objectStore.createIndex('empresa','empresa',{unique:false});
            objectStore.createIndex('id','id',{unique:true});
    
            console.log('db lista y creada');
            
        }
        
    }

    function obtenerClientes(){
        //Abrimos la conexion
        let abrirConexion = window.indexedDB.open('crm',1);

        //Si hay un error
        abrirConexion.onerror = () =>{ console.log('Hubo un error')}

        //Si todo esta bien, asignamos a database el resultado
        abrirConexion.onsuccess = function(){
            //Guardamos el resultado
            DB = abrirConexion.result;
            
            
            //Esto me trae las tablas
            const objectStore = DB.transaction('crm').objectStore('crm');
            
            //Retorna un objeto request o peticion
            objectStore.openCursor().onsuccess = function(e){
                const cursor = e.target.result;
                
               if(cursor){
                    const{nombre,empresa,email,telefono,id} = cursor.value;
                    
                    listadoClientes.innerHTML += `

                        <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                                
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700">${email}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700">${telefono}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                <p class="text-gray-600">${empresa}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                            </td>
                        </tr>
                    `;
                    
                    cursor.continue(); //Para que vaya a la siguiente iteracion
                }
            }
        }
    }

    
})();

//Crea la base de datos de IndexDB

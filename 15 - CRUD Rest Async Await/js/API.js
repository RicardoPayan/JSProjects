const url = 'http://localhost:4000/clientes';


//Cuando se crea nuevo cliente
export const nuevoCliente = async cliente =>{
    
    try {
        //Pasamos la url, y el objeto de configuracion
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(cliente), //Pasando un objeto para que lo transforme a string en forma de JSON
            headers: {
                //Que tipo de datos estamos enviando?
                'Content-Type' : 'application/json'
            }
        });
        window.location = 'index.html';
    } catch (error) {
        console.log(error)
    }
}

//Obtiene todos los clientes
export const obtenerClientes = async () =>{
    try {
        const resultado = await fetch(url);
        const clientes = await resultado.json();
        return clientes;
    } catch (error) {
        console.log(error)
    }
}

//Elimina un cliente
export const eliminarCliente = async id =>{
    try {
        await fetch(`${url}/${id}`,{
            method: 'DELETE'
        })
    } catch (error) {
        console.log(error)
    }
}

//Obtiene un cliente por su id
export const obtenerCliente = async id =>{
    try {
        const resultado = await fetch(`${url}/${id}`);
        const cliente =  await resultado.json();

        return cliente;
    } catch (error) {
        console.log(error)
    }
}


//Actualizar cliente
export const actualizaRegristro = async cliente =>{
    try {
        await fetch(`${url}/${cliente.id}`,{
            method : 'PUT',
            body : JSON.stringify(cliente),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error)
    }
}
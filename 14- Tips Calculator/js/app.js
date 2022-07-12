let cliente = {
    mesa:'',
    hora:'',
    pedido:[]
}

const categorias = {
    1:'Comida',
    2: 'Bebidas',
    3: 'Postres'

}

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click',guardarCliente);

function guardarCliente(){
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;
    
    //Revisar si un campo esta vacio
    if(mesa === '' || hora === ''){
        
        const existeAlerta = document.querySelector('.invalid-feedback');

        if(!existeAlerta){
            const alerta = document.createElement('div');
            alerta.classList.add('invalid-feedback','d-block','text-center');
            alerta.textContent = 'Todos los campos son obligatorios';
            document.querySelector('.modal-body form').appendChild(alerta);

            //Eliminar alerta
            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }
        return;
    }

    //Asignar datos del formulario a cliente
    cliente = {...cliente,mesa,hora}
    
    //ocultar modal
    const modalFormulario = document.querySelector('#formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBootstrap.hide();

    //Mostrar las secciones
    mostrarSecciones();

    //Obtener platillos de la API de JSON-Server
    obtenerPlatillos();
}    

function mostrarSecciones(){
    const seccionesOcultas = document.querySelectorAll('.d-none');
    
    seccionesOcultas.forEach(seccion => {
        seccion.classList.remove('d-none')
    });
}

function obtenerPlatillos(){
    const url='http://localhost:4000/platillos';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarPlatillos(resultado))
        .catch(error => console.log(error));    
}

function mostrarPlatillos(platillos){

    const contenido = document.querySelector('#platillos .contenido');

    
    platillos.forEach(platillo => {
        const {id,nombre,precio,categoria} = platillo;

        const row = document.createElement('DIV');
        row.classList.add('row','py-3','border-top');
        
        const nombrePlatillo = document.createElement('DIV');
        nombrePlatillo.classList.add('col-md-4');
        nombrePlatillo.textContent = nombre;

        const precioPlatillo = document.createElement('div');
        precioPlatillo.classList.add('col-md-3','fw-bold');
        precioPlatillo.innerHTML = `$${precio}`;

        const categoriaPlatillo = document.createElement('div');
        categoriaPlatillo.classList.add('col-md-3');
        categoriaPlatillo.textContent = categorias[categoria]
        
        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id = `producto-${id}`;
        inputCantidad.classList.add('form-control');

        //Funcion que detecta la cantidad y el platillo que se esta agregando
        inputCantidad.onchange = function(){
            const cantidad = parseInt(inputCantidad.value);
            agregarPlatillo({...platillo,cantidad}); //Creando un objeto que tiene todo lo de platillo y que agrega la cantidad
        }

        const agregar = document.createElement('div');
        agregar.classList.add('col-md-2');
        agregar.appendChild(inputCantidad);

        row.appendChild(nombrePlatillo);
        row.appendChild(precioPlatillo);
        row.appendChild(categoriaPlatillo);
        row.appendChild(agregar);
        
        contenido.appendChild(row);
    });
}

function agregarPlatillo(producto){
    //Extraer el pedido actual
    let {pedido} = cliente;

    //Revisar que la cantidad sea mayor a 0
    if(producto.cantidad > 0){

        //Comprueba si el elemento ya existe en el array
        if(pedido.some(articulo => articulo.id === producto.id)){
            //El articulo ya existe, hay que actualizar la cantidad
            const pedidoActualizado = pedido.map(articulo => {
                if(articulo.id === producto.id){
                    articulo.cantidad = producto.cantidad;
                }
                return articulo;
            });
            //Se asigna el nuevo array a cliente.pedido
            cliente.pedido =[...pedidoActualizado];
        }else{
            //El articulo no existe, lo agregamos al array de pedido
            cliente.pedido = [...pedido,producto];
        }
        
    }else{
        //Eliminar elementos cuando la cantidad es cero
        const resultado = pedido.filter(articulo => articulo.id !== producto.id);
        cliente.pedido = [...resultado];
    }

    //Limpiar el codigo HTML previo
    limpiarHTML();

    if(cliente.pedido.length){
        //Mostrar Resumen
        actualizarResumen();
    }else{
        mensajePedidoVacio();
    }

}

function actualizarResumen(){
    const contenido = document.querySelector('#resumen .contenido');

    const resumen = document.createElement('div');
    resumen.classList.add('col-md-6','card','py-5','px-3','shadow');

    //----Informacion de la mes--------
    const mesa = document.createElement('p');
    mesa.textContent = 'Mesa: ';
    mesa.classList.add('fw-bold');

    const mesaSpan = document.createElement('span');
    mesaSpan.textContent = cliente.mesa;
    mesaSpan.classList.add('fw-normal');

    //----Informacion de la hora--------
    const hora = document.createElement('p');
    hora.textContent = 'Hora: ';
    hora.classList.add('fw-bold');

    const horaSpan = document.createElement('span');
    horaSpan.textContent = cliente.hora;
    horaSpan.classList.add('fw-normal');


    //--Agregar a los elementos padre---
    mesa.appendChild(mesaSpan);
    hora.appendChild(horaSpan);

    //---Titulo de la seccion---
    const heading = document.createElement('h3');
    heading.textContent = 'Platillos Consumidos';
    heading.classList.add('my-4','text-center');

    //--Iterar sobre el array de pedidos--
    const grupo = document.createElement('UL');
    grupo.classList.add('list-group');

    const {pedido}=cliente;
    pedido.forEach(articulo => {
        const {nombre,cantidad,precio,id} = articulo;

        const lista = document.createElement('li');
        lista.classList.add('list-group-item');

        //Nombre del articulo
        const nombreEl = document.createElement('h4');
        nombreEl.classList.add('my-4');
        nombreEl.textContent = nombre;

        //Cantidad del articulo
        const cantidadEL = document.createElement('p');
        cantidadEL.classList.add('fw-bold');
        cantidadEL.textContent = 'Cantidad: ';

        const cantidadValor = document.createElement('span');
        cantidadValor.classList.add('fw-normal');
        cantidadValor.textContent = cantidad;

        cantidadEL.appendChild(cantidadValor);

        //Precio del articulo
        const precioEl = document.createElement('p');
        precioEl.classList.add('fw-bold');
        precioEl.textContent = '$';

        const precioValor = document.createElement('span');
        precioValor.classList.add('fw-normal');
        precioValor.textContent = precio;

        precioEl.appendChild(precioValor);

        //Subtotal
        const subtotalEl = document.createElement('p');
        subtotalEl.classList.add('fw-bold');
        subtotalEl.textContent = 'Subtotal: ';

        const subtotalValor = document.createElement('span');
        subtotalValor.classList.add('fw-normal');
        subtotalValor.textContent = calcularSubtotal(precio,cantidad);

        subtotalEl.appendChild(subtotalValor);

        //Boton para eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn','btn-danger');
        btnEliminar.textContent = 'Eliminar del Pedido';

        //Funcion para eliminar del pedido
        btnEliminar.onclick = function(){
            eliminarProducto(id);
        }

        //Agregar elementos al LI
        lista.appendChild(nombreEl);
        lista.appendChild(cantidadEL);
        lista.appendChild(precioEl);
        lista.appendChild(subtotalEl);
        lista.appendChild(btnEliminar);
    
        //Agregar lista al grupo principal
        grupo.appendChild(lista);
    });


    //--Agregar al contenido---
    resumen.appendChild(mesa);
    resumen.appendChild(hora); 
    resumen.appendChild(heading);
    resumen.appendChild(grupo);

    contenido.appendChild(resumen);

}

function limpiarHTML(){
    const contenido = document.querySelector('#resumen .contenido');

    while(contenido.firstChild){
        contenido.removeChild(contenido.firstChild);
    }
}

const calcularSubtotal = (precio,cantidad) => `$${precio*cantidad}`;

function eliminarProducto(id){
    const {pedido} = cliente;

    //Eliminar elementos cuando la cantidad es cero
    const resultado = pedido.filter(articulo => articulo.id !== id);
    cliente.pedido = [...resultado];

    limpiarHTML();
    if(cliente.pedido.length){
        //Mostrar Resumen
        actualizarResumen();
    }else{
        mensajePedidoVacio();
    }

    //El producto se elimino por lo tanto regresamos la cantidad a 0 en el formulario
    const productoEliminado = `#producto-${id}`;
    const inputEliminado = document.querySelector(productoEliminado);
    inputEliminado.value = 0;
    
    
}

function mensajePedidoVacio(){
    const contenido = document.querySelector('#resumen .contenido');

    const texto = document.createElement('p');
    texto.classList.add('text-center');
    texto.textContent = 'Añade los elementos del pedido';

    contenido.appendChild(texto);
}
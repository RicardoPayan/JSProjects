let cliente = {
    mesa:'',
    hora:'',
    pedido:[]
}

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click',guardarCliente);

function guardarCliente(){
    console.log('desde la funcion')
}
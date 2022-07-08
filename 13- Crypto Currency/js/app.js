const criptoSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

//Crear un Promises
const obtenerCriptomonedas = criptomonedas => new Promise(resolve =>{
    resolve(criptomonedas);
});

document.addEventListener('DOMContentLoaded',()=>{
    consultarCriptomonedas();
    formulario.addEventListener('submit',submitFormulario);
    criptoSelect.addEventListener('change',leerValor);
    monedaSelect.addEventListener('change',leerValor);
});

function consultarCriptomonedas(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=MXN';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerCriptomonedas(resultado.Data))
        .then(criptomonedas => selectCriptomonedas(criptomonedas));
}

function selectCriptomonedas(criptomonedas){
    criptomonedas.forEach(cripto => {
        const {FullName,Name} = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptoSelect.appendChild(option);
    });
}

function leerValor(e){
    objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e){
    e.preventDefault();

    //Validar
    const {moneda,criptomoneda} = objBusqueda;

    if(moneda === '' || criptomoneda === ''){
        mostrarAlerta('Ambos campos son obligatorios')
        return;
    }

    //Consultar API
    consultarAPI();
}

function mostrarAlerta(mensaje){
    const existeAlerta = document.querySelector('.error');

    if(!existeAlerta){
        const alerta = document.createElement('p');
        alerta.classList.add('error');
        alerta.textContent = mensaje;

        resultado.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function consultarAPI(){
    const {moneda,criptomoneda} = objBusqueda;

    const url =`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    
    mostrarSpinner();
    
    
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(cotizacion => {
            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda])
        })
}

function mostrarCotizacionHTML(cotizacion){

    limpiarHTML();
    const {PRICE,HIGHDAY,LOWDAY,CHANGEPCT24HOUR,LASTUPDATE} = cotizacion;
    const precio = document.createElement('p');
    precio.classList.add('precio');

    precio.innerHTML = `Price: <span>${PRICE}</span>`;

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = `High Day: <span>${HIGHDAY}</span>`

    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `Low Day: <span>${LOWDAY}</span>`

    const change = document.createElement('p');
    change.innerHTML = `Last 24 hours percentage change : <span>${CHANGEPCT24HOUR}%</span>`

    const ultimaActualizacion = document.createElement('p');
    ultimaActualizacion.innerHTML = `Last Update : <span>${LASTUPDATE}</span>`

    resultado.appendChild(precio)
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(change);
    resultado.appendChild(ultimaActualizacion);

}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function mostrarSpinner(){
    limpiarHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('sk-folding-cube');
    spinner.innerHTML = `
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>    
    `;

    resultado.appendChild(spinner)
}
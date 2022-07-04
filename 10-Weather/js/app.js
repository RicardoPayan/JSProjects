const container =  document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load',()=>{
    formulario.addEventListener('submit',buscarClima);
})

function buscarClima(e){
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais===''){
        //Hubo un error
        mostrarError('Ambos campos son obligatorios');
        return;
    }

    //Consultar la API
    consultarAPI(ciudad,pais);
}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
         //Crear alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3',
        'max-w-md','mx-auto','mt-6','text-center');

        alerta.innerHTML = `
            <strong class = "font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
        
    }
}

function consultarAPI(ciudad,pais){

    const appId= '1be21a5f139487f1616d8bff444b1e5c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner(); //Muestra un spinner de carga

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            
            limpiarHTML();

            if(datos.cod === '404'){
                mostrarError('Ciudad no encontrada');
                return;
            }

            //Imprime la respuesta en el HTML
            limpiarHTML
            mostrarClima(datos);
        })

}

function mostrarClima(datos){
    const {name,main:{temp, temp_max,temp_min}} = datos;

    const tempCentigrados = KelvinACentigrados(temp);
    const max = KelvinACentigrados(temp_max);
    const min = KelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent= `Temperatura en: ${name}`;
    nombreCiudad.classList.add('font-bold','text-2xl')


    const actual = document.createElement('p');
    actual.innerHTML = `${tempCentigrados} &#8451;`;
    actual.classList.add('font-bold','text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML=`Max: ${max} &#8451`;
    tempMaxima.classList.add('text-xl');

    const tempMimina = document.createElement('p');
    tempMimina.innerHTML=`Min: ${min} &#8451`;
    tempMimina.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMimina);

    resultado.appendChild(resultadoDiv);
}

const KelvinACentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner(){

    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');
    divSpinner.innerHTML= `
    
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
    
    `;

    resultado.appendChild(divSpinner);
}
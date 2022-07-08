const resultado = document.querySelector('#resultado');
const formulario =  document.querySelector('#formulario');
const paginacionDiv =  document.querySelector('#paginacion');

const registrosPorPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;

window.onload = () =>{
    formulario.addEventListener('submit',validarFormulario);
}

function validarFormulario(e){
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if(terminoBusqueda === ''){
        mostrarAlerta('Agrea un término de busqueda');
        return;
    }

    buscarImagenes();
}

function buscarImagenes(){
    
    const termino = document.querySelector('#termino').value;
    const terminoSinEspacios =  termino.replace(/ /g,"+");

    key = '28481579-da8d7f2e6e313b16df4f3f8da';
    const url = `https://pixabay.com/api/?key=${key}&q=${terminoSinEspacios}&image_type=photo&per_page=${registrosPorPagina}
                    &page=${paginaActual}`;


    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado=>{
            totalPaginas = calcularPaginas(resultado.totalHits);
            mostrarImagenes(resultado.hits);
        })
    
}

//Generador que va registrar la cantidad de elementos de acuerdo a las paginas
function *crearPaginador(total){
    for(let i=1; i<=total; i++){
        yield i;
    }
}

function mostrarAlerta(mensaje){

    const existeAlerta = document.querySelector('.bg-red-100');

    //Para evitar que una alerta se imprima varias veces
    if(!existeAlerta){
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3'
        , 'rounded','max-w-lg','mx-auto','text-center','mt-6');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;

        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }   

}

const calcularPaginas = total => parseInt(Math.ceil(total / registrosPorPagina));

function mostrarImagenes(imagenes){
    
    limpiarHTML();

    //Iterar sobre el arreglo de imagenes
    imagenes.forEach(imagen => {
        const {previewURL,likes,views,largeImageURL} = imagen
        

        resultado.innerHTML+= `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}">
                    
                    <div class="p-4">
                        <p class="font-bold">${likes} <span class="font-light"> Me Gusta </span> </p>
                        <p class="font-bold">${views} <span class="font-light">  Vistas </span> </p>

                        <a 
                        class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase 
                        font-bold text-center rounded mt-5 p-1"
                        href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                            Ver Imagen
                        </a>

                        
                    </div>
                </div>
            </div>
        `
    });

    //Limpiar el paginador previo
    while(paginacionDiv.firstChild){
        paginacionDiv.removeChild(paginacionDiv.firstChild);
    }

    //Generar el nuevo HTML
    imprimirPaginador();
    
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function imprimirPaginador(){
    const iterador = crearPaginador(totalPaginas);
    
    while(true){
        const {value,done}=iterador.next();
        
        if(done) return;

        //Caso contrario, genera un boton por cada elemento en el generador
        const boton = document.createElement('a');
        boton.href='#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente','bg-yellow-400','px-4','py-1','mr-2','mb-5','rounded');

        boton.onclick = ()=>{
            paginaActual = value;
            buscarImagenes();
        }

        paginacionDiv.appendChild(boton);
    }

}
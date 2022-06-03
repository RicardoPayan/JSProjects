//variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contenedor para los resultados
const resultado=document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max-10;

//Generar un objeto con la busqueda.
const datosBusqueda = {
    marca:'',
    year: '',
    minimo:'',
    maximo:'',
    puertas:'',
    transmision:'',
    color:''
}


//eventos
document.addEventListener('DOMContentLoaded',()=>{
    mostrarAutos(); //muestra los autos al cargar

    //llena las opciones de anios
    llenarSelect();
});

//Event listener para los formularios de busqueda
marca.addEventListener('change',e=>{
    datosBusqueda.marca=e.target.value;
    filtrarAuto();
});

year.addEventListener('change',e=>{
    datosBusqueda.year=parseInt(e.target.value);
    filtrarAuto();
});

minimo.addEventListener('change',e=>{
    datosBusqueda.minimo=e.target.value;
});

maximo.addEventListener('change',e=>{
    datosBusqueda.maximo=e.target.value;
});

puertas.addEventListener('change',e=>{
    datosBusqueda.puertas=e.target.value;
});

transmision.addEventListener('change',e=>{
    datosBusqueda.transmision=e.target.value;
});

color.addEventListener('change',e=>{
    datosBusqueda.color=e.target.value;
    console.log(datosBusqueda)
});




//funciones
function mostrarAutos(){
    autos.forEach(auto => {

        const{marca,modelo,year,puertas,precio,color,transmision}=auto;
        const autoHTML=document.createElement('p');
        autoHTML.textContent=`
            ${marca} ${modelo} - ${year} - ${puertas} puertas - color: ${color} - ${transmision} - $${precio}
 
        `;

        //Insertar resultado en el html
        resultado.appendChild(autoHTML);
    });
}

//genera años del select
function llenarSelect(){
    for(let i = max; i>min;i--){
        const opcion = document.createElement('option');
        opcion.value=i;
        opcion.textContent=i;
        year.appendChild(opcion); //agrega las opciones de anio al select
    }
}

//funcion que filtra en base a la busqueda
function filtrarAuto(){
    const resultado=autos.filter(filtrarMarcar).filter(filtrarYear)

    console.log(resultado)
}

function filtrarMarcar(auto){
    const {marca}=datosBusqueda;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const {year}=datosBusqueda;
    
    if(year){
        return auto.year ===year;
    }
    return auto;
}
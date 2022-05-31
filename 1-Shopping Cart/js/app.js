//Variables
const carrito = document.querySelector('#carrito');
const vaciarCarritoBtn= document.querySelector('#vaciar-carrito');
const contenedorCarrito=document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito=[]; //arreglo para los articulos


//FUNCIONES

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando agregar
    listaCursos.addEventListener('click',agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar Carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito=[] //reeseteamos el arreglo
        limpiarHTML(); //Eliminamos todo el HTML
    });
}

function agregarCurso(e){
    e.preventDefault();

    //Seleccionando solo la clase especifica
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCursos(cursoSeleccionado);
    }
    
}

//Elimina un curso del carrito
function eliminarCurso(e){
    
    if(e.target.classList.contains('borrar-curso')){
        cursoId=e.target.getAttribute('data-id');
        
        //Elimina del arreglo por el data-id
        articulosCarrito=articulosCarrito.filter(curso => curso.id !== cursoId);
        console.log(articulosCarrito);

        carritoHTML(); //Iterar sobre el carrito y mostrar su HTM

    }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCursos(curso){
    
    
    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

    const existe = articulosCarrito.some(curso => curso.id===infoCurso.id);
    
    //Revisa si un elemento ya existe en el carrito
    if(existe){
        const cursos=articulosCarrito.map(curso=> {
            if(curso.id===infoCurso.id){
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado
            }else{
                return curso; //Retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //agrega elementos al arreglo de carrito
        //Copiamos el arreglo anterior para guardar la referencia de los cursos que vamos agregando
        articulosCarrito = [...articulosCarrito,infoCurso];
    }

    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso=>{
        const {imagen,titulo,precio,cantidad,id}=curso; //Destructuring

        const row = document.createElement('tr');
        row.innerHTML = `

            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>

        `;

        //Agrega el HTML del carrito en tbody
        contenedorCarrito.appendChild(row);
    });
}

//Elimina los cursos del tbody
function limpiarHTML(){

    //Forma lenta
    // contenedorCarrito.innerHTML = '';

    //Si el contenedor tiene algun elemento dentro seguira limpiando hasta terminar
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


//Variables
const formulario = document.querySelector('#formulario');
const listaTweets=document.querySelector('#lista-tweets');
let tweets = [];


//Eventos
eventListeners();
function eventListeners(){

    //Cuando el usuario agrega un nuevo tweet
   formulario.addEventListener('submit',agregarTweet);

   //Cuando el documento esta listo.
   document.addEventListener('DOMContentLoaded',()=>{
       tweets=JSON.parse(localStorage.getItem('tweets')) || [];
       crearHTML();
   })
}


//Funciones
function agregarTweet(e){
    e.preventDefault();
    
    //TextArea donde el usuario escribe.
    const tweet=document.querySelector('#tweet').value;
    

    //Validacion...
    if(tweet===''){
        mostrarError('Un mensaje no puede ir vacio');
        return; //Evita que se ejecuta lo que sigue de codigo
    }

    const tweetObj={
        id:Date.now(),
        texto:tweet
    }

    tweets=[...tweets,tweetObj];
    
    //Una vez agregado, vamos a crear el HTML.
    crearHTML();

    //Reiniciar formulario
    formulario.reset();
}

//Mostrar error
function mostrarError(error){
    const mensajeError=document.createElement('p');
    mensajeError.textContent=error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();    
    }, 3000);

}

//Muestra un listado de los tweets
function crearHTML(){

    limpiarHTML();

    if(tweets.length>0){
        tweets.forEach(tweet =>{

            //Agregar un boton de eliminar
            const btnEliminar=document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent= 'X';

            //Anadir la funcion de eliminar
            btnEliminar.onclick= ()=>{
                borrarTweet(tweet.id);
            }

           //Crear el HTML
           const li=document.createElement('li');
           
           //Anadir texto.
           li.textContent=tweet.texto;

           //Asignar botn
           li.appendChild(btnEliminar);
          
           //Insertar en el HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//Agrega los tweets actuales a localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

//Limpiar HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

//Elimina un tweet
function borrarTweet(id){
    //Me interesa que el nuevo arreglo se cree que con los tweets que no seleccione, osea que sean diferentes al id que estoy pasando a la funcion
    tweets = tweets.filter(tweet=>tweet.id !==id);
    crearHTML();
}
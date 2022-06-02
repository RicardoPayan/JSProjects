//variables
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const enviarBtn=document.querySelector('#enviar');
const resetBtn= document.querySelector('#resetBtn')
const formulario=document.querySelector('#enviar-mail');

//Variables para campos
const email=document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');




eventListeners();
function eventListeners(){
    //Cuando arranca la app
    document.addEventListener('DOMContentLoaded',iniciarApp);

    //Campos del formulario
    email.addEventListener('blur',validarFormulario);
    asunto.addEventListener('blur',validarFormulario);
    mensaje.addEventListener('blur',validarFormulario);

     //Reiniciar el formulario
     resetBtn.addEventListener('click',resetearFormulario);
     
    //Cuando se pasa el formulario
    formulario.addEventListener('submit',enviarEmail);

   
}


//funciones

//Funcion que arranca todo
function iniciarApp(){
    enviarBtn.disabled=true;
    enviarBtn.classList.add('cursor-not-allowed','opacity-50');
}

//Validar el formulario
function validarFormulario(e){

    if(e.target.value.length > 0){
        //Elimina los errores si existen.
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }

        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500');
            
    }else{
        e.target.classList.remove('border','border-green-500');
        e.target.classList.add('border','border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email'){


        if (er.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500');
        }else{
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');
            mostrarError('Email no valido');
        }
    }

    if(er.test(email.value) && asunto.value!== '' && mensaje.value!==''){
        enviarBtn.disabled=false;
        enviarBtn.classList.remove('cursor-not-allowed','opacity-50');
    }

}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent=mensaje;
    mensajeError.classList.add('border','border-red-500','background-color-100','text-red-500','p-3','mt-5','text-center',
    'error');
    
    //Seleccionamos todos porque hay diferentes partes donde puede estar esta clase 'error'
    const errores=document.querySelectorAll('.error');
    
    if(errores.length === 0){
        formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
    }
}

//Envia el email
function enviarEmail(e){
    e.preventDefault();
    
    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Despues de 3s ocultar el spinner y mostrar el mensaje
    setTimeout(()=>{
        spinner.style.display='none';

        //mensaje de exito
        const parrafo=document.createElement('p');
        parrafo.textContent='El mensaje se envio exitosamente';

        //Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo,spinner);
        parrafo.classList.add('my-10','border-green-500','bg-green-500','text-white','p-3','text-center','uppercase','font-bold');

        setTimeout(()=>{
            parrafo.remove(); //Eliminar el mensaje
            resetearFormulario();    
        }, 5000)
    }, 3000);
} 

//resetea el formulario
function resetearFormulario(){
    formulario.reset();
    iniciarApp();
}


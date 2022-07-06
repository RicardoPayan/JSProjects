import * as UI from './interfaz.js';

class API{
    constructor(artista,cancion){
        this.artista=artista;
        this.cancion=cancion;
    }

    consultarAPI(){
        

        const url = `https://api.lyrics.ovh/v1/${this.artista.replace(/\s+/g, '')}/${this.cancion.replace(/\s+/g, '')}`
        Spinner();

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado =>{
                if(resultado.lyrics){
                    const {lyrics}=resultado;
                    UI.divResultado.textContent = lyrics;
                    UI.headingResultado.textContent = `Letra de la cancion: ${this.cancion} de
                    ${this.artista}`
                }else{
                    UI.divMensajes.textContent='No se encontro la cancion';
                    UI.divMensajes.classList.add('error');

                    setTimeout(() => {
                        UI.divMensajes.textContent='';
                        UI.divMensajes.classList.remove('error');
                    }, 3000);
                }

                
            })
    }
}

function limpiarHTML(){
    while(UI.divResultado.firstChild){
        UI.divResultado.removeChild(UI.divResultado.firstChild);
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

    UI.divResultado.appendChild(divSpinner);
}



export default API;
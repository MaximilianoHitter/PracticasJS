//Variables
const formulario = document.querySelector('#formulario')
const lista = document.querySelector('#lista-tweets');
let arrayTweets = [];


//Event listeners
eventListener();
function eventListener(){
    //Cuando el usuario agrega un tweet
    formulario.addEventListener('submit', agregarTweet);

    //cuando el documento este listo
    document.addEventListener('DOMContentLoaded', ()=>{
        arrayTweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });
}


//Funciones
function agregarTweet(e){
    e.preventDefault();
    
    //textarea
    const tweet = document.querySelector('#tweet').value;

    //Validar
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio')
        return;
    };

    const tweetObj = {
        id: Date.now(),
        tweet //es lo msmo que poner tweet:tweet
    };
    //Añadir los tweets
    arrayTweets = [...arrayTweets, tweetObj];

    //console.log(arrayTweets);

    //Crear html
    crearHTML();

    formulario.reset();
}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Eliminar despues de 3 seg
    setTimeout(()=>{
        mensajeError.remove();
    }, 3000);
}

function crearHTML(){

    limpiarHTML();
    if(arrayTweets.length>0){
        arrayTweets.forEach(tweet => {
            //agregar boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';
            //Añadir funcion de eliminar
            let id = tweet.id;
            btnEliminar.onclick = () => {
                borraTweet(id);
            }

            const li = document.createElement('li');
            li.innerText = tweet.tweet;
            
            let contenido = tweet.tweet;
            li.setAttribute('id', id);
            li.appendChild(btnEliminar);
            lista.appendChild(li);
            //localStorage.setItem(`${id}`, contenido);
        });
        
    }
    //sincroniza aca el storage
    sincronizarStorage();
}

function limpiarHTML(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    };
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(arrayTweets));
}

function borraTweet(idTweet){
    arrayTweets = arrayTweets.filter( tweet => tweet.id != idTweet );
    crearHTML();
}
//Variables
const resultadoC = document.querySelector('#resultado');
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');


const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;
//generar objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//Eventos
document.addEventListener('DOMContentLoaded', ()=> {
    //Muestro autos
    mostrarAutos(autos);

    //Llena las opciones de años
    mostrarAnios();

    //cargarAnios();
})

//Events listener
marca.addEventListener('change', (e)=>{
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
})

year.addEventListener('change', (e)=> {
    datosBusqueda.year = e.target.value;
    filtrarAuto();
})

minimo.addEventListener('change', (e)=> {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
})

maximo.addEventListener('change', (e)=> {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
})

puertas.addEventListener('change', (e)=> {
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
})

transmision.addEventListener('change', (e)=> {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

color.addEventListener('change', (e)=> {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
})

//Funciones
function mostrarAutos(autos){
    limpiarHTML();
    autos.forEach(auto => {
        const { marca, modelo, year, precio, puertas, color, transmision } = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - Precio: ${precio} - ${puertas} Puertas - Color: ${color} - Transmision: ${transmision}
        `;

        //insertar en el HTML
        resultadoC.appendChild(autoHTML);
    })
}

//genera años del select
function mostrarAnios(){
    const arrayAnios = cargarAnios();
    for (let i = 0; i < arrayAnios.length; i++) {
        const anio = arrayAnios[i];
        const option = document.createElement('option');
        option.value = anio;
        option.textContent = anio;
        year.appendChild(option);
    }

}

//generar años
function cargarAnios(){
    const anios = [];
    autos.forEach(auto => {
        if(!(anios.includes(auto.year))){
            anios.push(auto.year)
        }
    });
    return anios;
}

function asd(){
    anios.forEach
}

//filtra en base a la busqueda
function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );
    if(resultado.length == 0){
        limpiarHTML();
        const vacio = document.createElement('p');
        vacio.textContent = 'No se han encontrado automoviles con esas características.';
        vacio.classList.add('alerta', 'error');
        resultadoC.appendChild(vacio);
    }else{
        mostrarAutos(resultado);
    }
    
}

function filtrarMarca(auto){
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    };
    return auto;
}

function filtrarYear(auto){
    if(datosBusqueda.year){
        return auto.year === parseInt(datosBusqueda.year);
    };
    return auto;
}

function filtrarMinimo(auto){
    if(datosBusqueda.minimo){
        return auto.precio >= parseInt(datosBusqueda.minimo);
    };
    return auto;
}

function filtrarMaximo(auto){
    if(datosBusqueda.maximo){
        return auto.precio <= parseInt(datosBusqueda.maximo);
    };
    return auto;
}

function filtrarPuertas(auto){
    if(datosBusqueda.puertas){
        return auto.puertas === parseInt(datosBusqueda.puertas);
    };
    return auto;
}

function filtrarTransmision(auto){
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    };
    return auto;
}

function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    };
    return auto;
}

//pa limpiar html
function limpiarHTML(){
    while(resultadoC.firstChild){
        resultadoC.removeChild(resultadoC.firstChild);
    };
}
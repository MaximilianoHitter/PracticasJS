//Variables!
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso mediante "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    //Eliminar un curso del carrito
    carrito.addEventListener('click', eliminarCurso);
}

//Funciones!
function agregarCurso(e){
    e.preventDefault();//Pa que no se vaya parriba

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Eliminar curso del carrito
function eliminarCurso(e){
    //console.log(e.target.classList);
    if(e.target.classList.contains("borrar-curso")){
        //console.log(e.target.getAttribute('data-id'))
        const cursoId = e.target.getAttribute('data-id');

        //eliminar
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        //console.log(articulosCarrito);

        carritoHTML();
    }
}

//Lee el contenidod el html al que le dimos click y extrae info del curso
function leerDatosCurso(curso){
    //Crear objeto con contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    //Comprobar si ya fue agregado
    const existe = articulosCarrito.some( curso => 
        curso.id === infoCurso.id
    );
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            };
        });
        articulosCarrito = [...cursos];
    }else{
        //Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    //console.log(existe);

    

    //console.log(articulosCarrito);
    carritoHTML();
};


//Muestra el carrito de compras en html
function carritoHTML(){

    //Limpiar el html
    limpiarHTML();

    //recorre el carrito y crea el html
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src=${imagen} width=120px>
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> x </a>
        </td>
        `;

        //Agrega el html del carrito al tbody
        contenedorCarrito.appendChild(row);
    })
};

//Elimina el contenido html del carrito
function limpiarHTML(){
    //Forma lenta
    //contenedorCarrito.innerHTML = '';

    //forma mejor
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    };
};

function vaciarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    };
    articulosCarrito = [];
};



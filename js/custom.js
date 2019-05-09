//Variables
let elem;
let carrito =  document.querySelector('#carrito');
let vista_carrito =  document.querySelector('#vista-carrito');
let lista_productos = document.getElementById('lista-productos');
let lista_carrito =  document.querySelector('#vista-carrito table tbody');

//Event Listener
document.addEventListener('DOMContentLoaded', function() {

    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});

    elem = document.querySelector('.carousel');
    var instances = M.Carousel.init(elem, {
                                        fullWidth:true,
                                        indicators:false,
                                        autoplay: true,
                                        onCycleTo: function(data){

                                                let elemento = data.childNodes[3].childNodes[1];
                                                if (!elemento.classList.contains('fadeInLeft')){
                                                    elemento.classList.remove('hide');
                                                    elemento.classList.add('fadeInLeft');
                                                }
                                        }
                                    });
    autoplay(); //Inicia carousel

    carrito.addEventListener('click', mostrarOcultarCarrito);

    lista_productos.addEventListener('click', agregarCarrito);
});


//Funciones
function autoplay() {
    carousel = M.Carousel.getInstance(elem);
    carousel.next();
    setTimeout(autoplay, 6500);
}

function mostrarOcultarCarrito(e){
    vista_carrito.classList.toggle('hide');
}

function agregarCarrito(e){
    e.preventDefault();

    if (e.target.parentElement.classList.contains('add-carrito')) {
        const producto = e.target.parentElement.parentElement.parentElement;
        leerDatosProducto(producto);

        M.toast({
            html: 'Agregado al carrito!',
            inDuration: 400
        });
    }
}


function leerDatosProducto(producto){
    
    const infoProducto = {
        imagen: producto.querySelector('.card-image img').src,
        titulo: producto.querySelector('.card-content .card-title a').textContent,
        precio: producto.querySelector('.card-content .precios .precio-actual').textContent,
        id: producto.getAttribute('data-id')
    }
    insertarcarrito(infoProducto);
    console.log(infoProducto);
}

function insertarcarrito(infoProducto){
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
            <img src="${infoProducto.imagen}" class="responsive-img">
        </td>
        <td>${infoProducto.titulo}</td>
        <td><em>${infoProducto.precio}</em></td>
        <td>
            <a href="#" class="borrar-curso" data-id="${infoProducto.id}"><strong>X</strong></a>
        </td>
    `;
    lista_carrito.appendChild(row);
    // guardarCursoLocalStorage(curso);
}
                                          
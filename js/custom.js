/**********************Variables********************/
let elem;
let carrito =  document.querySelector('#carrito');
let vista_carrito =  document.querySelector('#vista-carrito');
let lista_productos = document.getElementById('lista-productos');
let lista_carrito =  document.querySelector('#vista-carrito table tbody');
let montos =  document.querySelector('#montos');
let vacio =  document.querySelector('.vacio');
let total =  document.querySelector('#total');
let sumaSubtotal = 0.00;
let subtotal =  document.querySelector('#subtotal');



/**********************Event Listener********************/
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

    vista_carrito.addEventListener('click', eliminarProductoCarrito);

    leerLocalStorage();

});


/**********************Funciones********************/
function autoplay() {
/**
**Inicia slider
**/
    carousel = M.Carousel.getInstance(elem);
    carousel.next();
    setTimeout(autoplay, 6500);
}

function mostrarOcultarCarrito(e){
    vista_carrito.classList.toggle('hide');
}

function agregarCarrito(e){
/**
**Agrega artículo al carrito de compras
**/
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
/**
**Contruye json con los datos del producto agregado al carrito
* @param  {prodcuto->html con los datos del producto seleccionado}
* @return  {}
**/
    const infoProducto = {
        imagen: producto.querySelector('.card-image img').src,
        titulo: producto.querySelector('.card-content .card-title a').textContent,
        precio: producto.querySelector('.card-content .precios .precio-actual span').textContent,
        id: producto.getAttribute('data-id')
    }
    insertarcarrito(infoProducto);
}

function insertarcarrito(producto){
/**
**Contruye html para agregar seccion al carrito de compras
* @param  {prodcuto->json con los datos del producto seleccionado}
* @return  {}
**/
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
            <img src="${producto.imagen}" class="responsive-img">
        </td>
        <td>${producto.titulo}</td>
        <td><em>${producto.precio}</em></td>
        <td>
            <a href="#" class="borrar-producto" data-id="${producto.id}"><strong>X</strong></a>
        </td>
    `;
    lista_carrito.appendChild(row);
    sumaSubtotal += parseFloat(producto.precio);
    subtotal.querySelector('span').innerHTML = sumaSubtotal;
    guardarProductoLocalStorage(producto);
}

function eliminarProductoCarrito(e){
/**
**Elimimar producto del carrito de compras
* @return  {}
**/
    let producto, productoId;

    if (e.target.classList.contains("borrar-producto")) {
        producto = e.target;
        productoId = producto.getAttribute('data-id');
        e.target.parentElement.parentElement.remove();
        eliminarProductoLocalStorage(productoId);
    }

}

function guardarProductoLocalStorage(producto){
/**
**Contruye html para agregar seccion al carrito de compras
* @param  {prodcuto->json con los datos del producto seleccionado}
* @return  {}
**/
    let productos;

    productos = obtenerProductosLocalStorage();

    productos.push(producto);
    localStorage.setItem('ecommFirst', JSON.stringify(productos));
}

function obtenerProductosLocalStorage(){
/**
**Recupera los productos del carrito de compras del localstorage
* @return  {Json con los productos del carrito}
**/
    let productosLS;

    //Si hay algo en local
    if (localStorage.getItem('ecommFirst') === null){
        productosLS = [];
    }else{
        productosLS =  JSON.parse(localStorage.getItem('ecommFirst'));
    }

    return productosLS;
}

function leerLocalStorage(){
/**
**Agregar los productos recuperados del local storage a la seccion del carrito de compras
* @return  {}
**/
    let productosLS;
    productosLS = obtenerProductosLocalStorage();
    if (productosLS.length > 0){
        montos.classList.remove('hide');
        vacio.classList.add('hide');
    }
    productosLS.forEach(function(e, index){
        const row = document.createElement('tr');
        sumaSubtotal += parseFloat(productosLS[index].precio);
        row.innerHTML = `
            <td>
                <img src="${productosLS[index].imagen}" width="100">
            </td>
            <td>${productosLS[index].titulo}</td>
            <td>${productosLS[index].precio}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${productosLS[index].id}">X</a>
            </td>
        `;
        lista_carrito.appendChild(row);
    });
    subtotal.querySelector('span').innerHTML = sumaSubtotal;
}

function eliminarProductoLocalStorage(productoId){
/**
**Elimina un producto del local storage
* @param  {id del producto a eliminar}
* @return  {}
**/
    let productosLS;
    productosLS = obtenerProductosLocalStorage();

    productosLS.forEach(function(productoLS, index){
        if (productoLS.id === productoId) {
            productosLS.splice(index, 1);
        }
    });
    localStorage.setItem('ecommFirst', JSON.stringify(productosLS));
}

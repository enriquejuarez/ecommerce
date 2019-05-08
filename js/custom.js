//Variables
let elem;
let productos;
let carrito =  document.querySelector('#carrito');
let vista_carrito =  document.querySelector('#vista-carrito');

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
                                                    console.log("Entrad")
                                                    elemento.classList.remove('hide');
                                                    elemento.classList.add('fadeInLeft');
                                                }
                                        }
                                    });
    autoplay(); //Inicia carousel

    productos = document.querySelectorAll('.add-carrito'); //Agregar al carrito de compra
    productos.forEach(function(producto) {
        producto.addEventListener('click', agregarCarrito);
    });

    carrito.addEventListener('click', mostrarCarrito);
});


//Funciones
function autoplay() {
    carousel = M.Carousel.getInstance(elem);
    carousel.next();
    setTimeout(autoplay, 6500);
}

function agregarCarrito(){
    M.toast({
        html: 'Agregado al carrito!',
        inDuration: 400
    });
}

function mostrarCarrito(e){
    console.log(vista_carrito);
    vista_carrito.classList.toggle('hide');
}

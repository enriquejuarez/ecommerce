//Variables
let elem;

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
                                                    elemento.classList.add('fadeInLeft', 'add');
                                                }
                                        }
                                    });
    autoplay(); //Inicia carousel
});


//Funciones
function autoplay() {
    carousel = M.Carousel.getInstance(elem);
    carousel.next();
    setTimeout(autoplay, 5500);
}

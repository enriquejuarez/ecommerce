//Variables


//Event Listener
document.addEventListener('DOMContentLoaded', function() {

    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});

    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, { numVisible:1, dist:0, fullWidth:true});

    var instance = M.Carousel.init({
    fullWidth: true,
    indicators: true,
    autoplay: true
  });


});


//Funciones

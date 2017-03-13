console.log('main.js works');

// Delete ajax call
$('.delete-account').on('click', function(e) {
  e.preventDefault();
  console.log('clicked delete!');  
  var profile = $(this).attr('href');
  $.ajax({
    method:'get',
    url: profile
  }).success(function(data) {
  	console.log('deleted');
    // or, you can redirect to another page
    window.location = '/';
  }).fail(function(err){
    console.log("err", err)
  });
});

// Website JS animations

$(window).load(function(){
    
    $('.main-nav li a, .servicelink').bind('click',function(event){
      var $anchor = $(this);
      
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 102
      }, 1500,'easeInOutExpo');
      /*
      if you don't want to use the easing effects:
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 1000);
      */
      event.preventDefault();
    });
  })
$(document).ready(function(e) {
    $('#test').scrollToFixed();
    $('.res-nav_click').click(function(){
        $('.main-nav').slideToggle();
        return false    
        
    });
    
});


// wow = new WOW(
//   {
//     animateClass: 'animated',
//     offset:       100
//   }
// );
// wow.init();

$(window).load(function(){
  
  
  var $container = $('.portfolioContainer'),
      $body = $('body'),
      colW = 375,
      columns = null;

  
  $container.isotope({
    // disable window resizing
    resizable: true,
    masonry: {
      columnWidth: colW
    }
  });
  
  $(window).smartresize(function(){
    // check if columns has changed
    var currentColumns = Math.floor( ( $body.width() -30 ) / colW );
    if ( currentColumns !== columns ) {
      // set new column count
      columns = currentColumns;
      // apply width to container manually, then trigger relayout
      $container.width( columns * colW )
        .isotope('reLayout');
    }
    
  }).smartresize(); // trigger resize to set container width
  $('.portfolioFilter a').click(function(){
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');
 
        var selector = $(this).attr('data-filter');
        $container.isotope({
      
            filter: selector,
         });
         return false;
    });
  
});
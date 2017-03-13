$('.delete-account').on('click', function(e) {
  e.preventDefault();
  console.log('clicked!')
  var profileElement = $(this);
  var profile = profileElement.attr('href');
  $.ajax({
    method:'DELETE',
    url: '/profile/1',
  }).done(function(data) {
  	console.log('deleted');
    // or, you can redirect to another page
    window.location = '/';
  });
});
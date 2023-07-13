
$(document).ready(function(){

    
  $("#ham1").click(function() {
    $("body").toggleClass("active");
    $("#ham2").toggle();
  });

   $("#ham2").click(function() {
    $("body").toggleClass("active");
    $("#ham2").toggle();
  });

  $("#more").click(function() {
    $(".logoutclass").toggle();
  });

  $.ajax({
    url: '/api/index/',  
    type: 'GET',
    dataType: 'json',
    success: function(data) {

      $('#username').text((data[0].username).toUpperCase())

      var ul = $('.databases');

      for (var i = 1; i < data.length; i++) {
        var db = data[i];

        var newRow = $('<li>').addClass('item');
        var anchor = $('<a>').addClass('sub-btn').append($('<i>').addClass('fas fa-table'));
        anchor.text(db.title);
        var dropdownIcon = $('<i>').addClass('fas fa-angle-right dropdown');
        anchor.append(dropdownIcon);

        var submenu = $('<div>').addClass('sub-menu');
        submenu.append($('<a>').addClass('sub-item').attr('href', "../"+db.id+'/contact').text('Contact'));
        submenu.append($('<a>').addClass('sub-item').attr('href', "../"+db.id+'/company').text('Company'));
        submenu.append($('<a>').addClass('sub-item').attr('href', "../"+db.id+'/property').text('Property'));
        submenu.append($('<a>').addClass('sub-item').attr('href', "../"+db.id+'/project').text('Project'));

        newRow.append(anchor);
        newRow.append(submenu);

        ul.append(newRow);
        }
       
      },
    error: function(xhr, status, error) {

      console.log('Error:', error);
      }
    });

    $(document).on('click', '.sub-btn', function() {
      $(this).next('.sub-menu').slideToggle();
      $(this).find('.dropdown').toggleClass('rotate');
    });

    $('#logout').click(function(event) {
      event.preventDefault();  // Prevent the default link behavior

      $.ajax({
        url: '../api/signout',  // Replace with the actual URL for the logout endpoint
        type: 'GET',
        dataType: 'json',
        success: function(response) {
          window.location.href = '../signin'; 
        },
        error: function(xhr, status, error) {
          
          console.log('Error:', error);
        }
      });
    });


 });
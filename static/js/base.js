
$(document).ready(function () {

  $("#h1").click(function () {
    $("body").toggleClass("active");
    // $("#h1").toggle();
  });


  $("#h2").click(function () {
    $("body").toggleClass("active");
    // $("#h2").toggle();
  });


  $.ajax({
    url: '/api/index/',
    type: 'GET',
    dataType: 'json',
    success: function (data) {

      $('#username').text((data[0].username).toUpperCase())

      var ul = $('.databases');

      for (var i = 1; i < data.length; i++) {
        var db = data[i];

        var newRow = $('<li>').addClass('item');
        var anchor = $('<a>').addClass('sub-btn')
        anchor.text(db.title);


        newRow.append(anchor);

        ul.append(newRow);
      }

    },
    error: function (xhr, status, error) {

      console.log('Error:', error);
    }
  });

  $(document).on('click', '.sub-btn', function () {
    $(this).next('.sub-menu').slideToggle();
    $(this).find('.dropdown').toggleClass('rotate');
  });

  $('#logout').click(function (event) {
    event.preventDefault();  // Prevent the default link behavior

    $.ajax({
      url: '../api/signout/',  // Replace with the actual URL for the logout endpoint
      type: 'GET',
      dataType: 'json',
      success: function (response) {
        window.location.href = '../signin';
      },
      error: function (xhr, status, error) {

        console.log('Error:', error);
      }
    });
  });



});



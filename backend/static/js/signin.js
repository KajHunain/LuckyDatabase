$(document).ready(function() {
  
  $('#signin-form').submit(function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var username = $('#username').val();
    var password = $('#password').val();
    var csrfToken = $('input[name="csrfmiddlewaretoken"]').val();

    $.ajax({
      url: 'http://127.0.0.1:8000/api/signin/', // Replace with your API endpoint URL
      type: 'POST',
      data: {
        'username': username,
        'password': password
      },
      dataType: 'json',
      headers: {
        'X-CSRFToken': csrfToken
      },
      success: function(response) {

        window.location.href = 'http://127.0.0.1:8000/'; 
      },
      error: function(error) {
        // Handle login error
        console.log(error);
        console.log('Login failed:', error.responseText);
      }
    });
  });

});


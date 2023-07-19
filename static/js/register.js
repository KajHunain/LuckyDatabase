$(document).ready(function() {
  
  $('#register-form').submit(function(event) {
    event.preventDefault();

    var username = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();


    $.ajax({
      url: '../api/createuser/',
      type: 'POST',
      data: {
        'username': username,
        'email': email,
        'password': password
      },
      dataType: 'json',

      success: function(response) {

        window.location.href = '../'; 
      },
      error: function(error) {
        
        console.log(error);
        console.log('Registration failed:', error.responseText);
      }
    });
  });

});


$(document).ready(function() {

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }

    return cookieValue;
  }

  $('#createdb').click(function(event) {
    event.preventDefault();

    var database_title = $('#dbname').val();
    var editors = $('#editors').val();

    $.ajax({
      url: '../api/createdb/',
      type: 'POST',
      data: {
        'database_title': database_title,
        'editors': editors,
      },
      dataType: 'json',
      headers: {
        'X-CSRFToken': getCookie('csrftoken')
      },

      success: function(response) {
        console.log("success");
        window.location.href = '../'; 

      },
      error: function(error) {

        console.log('Registration failed:', error.responseText);
      }
    });
  });

});
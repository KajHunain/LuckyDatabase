$(document).ready(function(){

  
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

  $.ajax({
    url: '/api/index/',  
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      var username = (data[0].username);
      $('#username').text(username.toUpperCase())
      console.log(data);

      var creator = $('#creatordb');
      var otherdb = $('#otherdb');

      for (var i = 1; i < data.length; i++) {

        var db = data[i];

        if (db.role === "Creator") {
          console.log(db);

          var newRow = $("<div>").addClass("row");
          newRow.attr("id",db.id);

          var col1 = $('<div>').addClass('col-sm-7');
          col1.append($('<h6>').addClass('mb-0').text(db.title));

          var col2 = $('<div>').addClass('col-sm-2 text-secondary');
          col2.append($('<button>').addClass('btn btn-outline-info edit_btn').text('Edit'));

          var col3 = $('<div>').addClass('col-sm-3 text-secondary');
          col3.append($('<button>').addClass('btn btn-outline-info delete_btn').text('Delete'));


          newRow.append(col1, col2, col3);

          creator.append(newRow);
          creator.append($('<hr>'));
        }
        else{

          var newRow = $("<div>").addClass("row");
          newRow.attr("id",db.id);

          var col1 = $('<div>').addClass('col-sm-7');
          col1.append($('<h6>').addClass('mb-0').text(db.title));

          var col2 = $('<div>').addClass('col-sm-2 text-secondary');
          col2.append($('<button>').addClass('btn btn-outline-info edit_btn').text('Edit'));

          var col3 = $('<div>').addClass('col-sm-3 text-secondary');
          col3.append($('<button>').addClass('btn btn-outline-info delete_btn').text('Delete')); // Create the "Delete" button


          newRow.append(col1, col2, col3);

          otherdb.append(newRow);
          otherdb.append($('<hr>'));

        }

      }
       
    },
    error: function(xhr, status, error) {

      console.log('Error:', error);
      }
    });

  $(document).on('click', ".edit_btn", function(){
    var id = $(this).closest('.row').attr('id');
    console.log(id);
    window.open(id+"/contact");
  });

  $(document).on('click', ".delete_btn", function(){
    var id = $(this).closest('.row').attr('id');
    console.log(id);

    $.ajax({
      url: '../api/'+ id +'/databasedelete/',
      type: 'DELETE',
      headers: {
          'X-CSRFToken': getCookie('csrftoken')
        },
      success: function(response) {
        location.reload(true);
        console.log(response);
      },
      error: function(xhr, status, error) {
        console.log('Error:', error);
      }
    });

  });

 });
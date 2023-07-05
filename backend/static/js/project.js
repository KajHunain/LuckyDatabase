$(document).ready(function() {


  $('#pagename').text('Project');
  var currentUrl = window.location.href;
  var regex = /http:\/\/127\.0\.0\.1:8000\/(\d+)\/([^/]+)\/?/;
  var db_id = currentUrl.match(regex)[1];

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
    url: '../api/'+ db_id +'/project/',
    type: 'GET',
    dataType: 'json',
    success: function(data) {

      var tbody = $('table tbody');

      var tbody = $('table tbody');

      for (var i = 0; i < data.length; i++) {
        var project = data[i];

        var newRow = $('<tr>').attr('id', project.id);

        var theadings = $('#Table thead');
        
        theadings.find('th').each(function (index) {

          var columnName = $(this).text().trim().toLowerCase().replace(/ /g, "_");
          var cellValue = project[columnName];
          var newCell = $('<td>').text(cellValue);

          newRow.append(newCell);
        });
        
        tbody.append(newRow);

        }  
      },
    error: function(xhr, status, error) {
      
      console.log('Error:', error);
    }
  });

  var original_value = '';

  $(document).on('click', '#Table td', function() {
    if (!$(this).hasClass('editing')) {
      $(this).addClass('editing');
      var currentValue = $(this).text().trim();
      original_value = currentValue;
      $(this).html('<input type="text" class="edit-input" value="' + currentValue + '">');
      $(this).find('input').focus();
    }
  });


  $(document).on('focusout', '.edit-input', function() {
    var cell = $(this).closest('td');
    cell.removeClass('editing');
    var currentValue = cell.find('input').val().trim();
    cell.text(currentValue);


    if (original_value !== currentValue) {
      console.log("original_value:"+ original_value + " currentValue:"+ currentValue);
      $('#update').show();
    
    }
  });


  $(document).on('click', '#update', function() {

    var updatedData = [];

    $('#Table tbody tr').each(function() {
      var row = $(this);
      var rowData = {};

      rowData.id = Number(row.attr('id'));
      rowData.database = Number(db_id);

      row.find('td').each(function(index) {
        var cellValue = $(this).text().trim();
        var columnName = $('#Table thead th:eq(' + index + ')').text().trim();
        columnName = columnName.toLowerCase().replaceAll(" ", "_");

        rowData[columnName] = cellValue;
      });

      updatedData.push(rowData);
    });


    for (var i=0; i < updatedData.length; i++){
      
      $.ajax({
        url: '../api/'+ db_id +'/projectupdate/'+ updatedData[i].id+'/',
        type: 'PUT',
        data: JSON.stringify(updatedData[i]),
        contentType: 'application/json',
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        },

        success: function(response) {

          console.log('Data updated successfully');
          $('#update').hide();
        },
        error: function(xhr, status, error) {

          console.log('Error:', error);
        }
      });
    }
  });

  $(document).on('click', '#create', function() {

    var table = $('#Table');
    var lastRow = table.find('tbody tr:last');

    var isEmpty = lastRow.find('td').filter(function() {
      return $(this).text().trim() !== '';
    }).length === 0;
    
    if (!isEmpty) {

      var newRow = $('<tr>');
      console.log("new row added")

      table.find('thead th').each(function() {
        newRow.append($('<td>'));
      });

      table.find('tbody').append(newRow);
    }

  });

});
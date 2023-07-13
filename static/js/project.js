$(document).ready(function() {

  $("#addbtn").click(function() {
    $(".table").toggle();
    $(".form").toggle();
  });

   $(".cross").click(function() {
    $(".form").hide();
    $(".table").show();
  });

  $(".button").show();
  
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

        var deleteButton = $('<i>').addClass("fa-solid fa-circle-xmark fa-l dlt_btn");
        newRow.append(deleteButton);

        var theadings = $('#Table thead');
        
        theadings.find('th:not(:first-child)').each(function (index) {

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

    var row = cell.closest('tr');

    if (currentValue !== original_value) {

      var rowData = {};

      rowData.id = Number(row.attr('id'));
      rowData.database = Number(db_id);

      row.find('td').each(function(index) {
        var cellValue = $(this).text().trim();
        var columnName = $('#Table thead th:eq(' + (index+1) + ')').text().trim();
        columnName = columnName.toLowerCase().replaceAll(" ", "_");

        rowData[columnName] = cellValue;
      });

      $.ajax({
        url: '../api/'+ db_id +'/projectupdate/'+ rowData.id+'/',
        type: 'PUT',
        data: JSON.stringify(rowData),
        contentType: 'application/json',
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        },

        success: function(response) {

          console.log('Data updated successfully');

        },
        error: function(xhr, status, error) {

          console.log('Error:', error);
        }
      });
    
    }
  });

 $('#submit').click(function(event) {
    event.preventDefault();

    var formData = {
      project_name: $('#project_name').val(),
      project_type: $('#project_type').val(),
      company: $('#company').val(),
      contract_start_date: $('#contract_start_date').val(),
      contract_end_date: $('#contract_end_date').val(),
      contract_notice_date: $('#contract_notice_date').val()
    };
    
    $.ajax({
      url: '../api/'+ db_id +'/projectcreate/',
      type: 'POST',
      data: formData,
      dataType: 'json',
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

  $(document).on('click', '.dlt_btn', function() {

    var id =$(this).closest('tr').attr('id');

    $.ajax({
      url: '../api/'+ db_id +'/projectdelete/'+id+'/',
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
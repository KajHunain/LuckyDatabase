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
  
  $('#pagename').text('Property');
  var currentUrl = window.location.href;
  var regex = /\/(\d+)\/([^/]+)\/?/;
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
    url: '../api/'+ db_id +'/property/',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
 
      var tbody = $('table tbody');

      for (var i = 0; i < data.length; i++) {
        var property = data[i];

        var newRow = $('<tr>').attr('id', property.id).addClass("row");
        var theadings = $('#Table thead');

        var icon_td = $("<td>").addClass("dlt");
        var deleteButton = $('<i>').addClass("fa-solid fa-circle-xmark fa-l dlt_btn");
        icon_td.append(deleteButton);
        newRow.append(icon_td);
        
        theadings.find('th:not(:first-child)').each(function (index) {

          var columnName = $(this).text().trim().toLowerCase().replace(/ /g, "_");
          var cellValue = property[columnName];
          var newCell = $('<td>').text(cellValue).addClass("col");

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

      var columnIndex = $(this).index();
      var inputType = 'text';

      if (columnIndex === 0) {
        return 0;
      } else if (columnIndex >= 9 && columnIndex <= 17) {
        inputType = 'date'; 
      } else if (columnIndex === 3 || columnIndex === 7  || columnIndex === 8 ) {
        inputType = 'number'; 
      }


      $(this).html('<input type="' + inputType + '" class="edit-input" value="' + currentValue + '">');
      $(this).find('input').focus();
    }
  });

  $(document).on('focusout', '.edit-input', function() {
    var cell = $(this).closest('td');
    cell.removeClass('editing');
    var currentValue = cell.find('input').val().trim();
    cell.text(currentValue);

    checkTableCells();

    var row = cell.closest('tr');

    if (currentValue !== original_value) {

      var rowData = {};

      rowData.id = Number(row.attr('id'));
      rowData.database = Number(db_id);

      row.find('td').each(function(index) {
        var cellValue = $(this).text().trim();
        var columnName = $('#Table thead th:eq(' + index + ')').text().trim();
        columnName = columnName.toLowerCase().replaceAll(" ", "_");

        rowData[columnName] = cellValue;
      });

      $.ajax({
        url: '../api/'+ db_id +'/propertyupdate/'+ rowData.id+'/',
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

      property_name: $('#property_name').val(),
      tenant: $('#tenant').val(),
      property_type: $('#property_type').val(),
      insurance: $('#Insurance').val(),
      cma: $('#cma').val(),
      operating: $('#operating').val(),
      investing: $('#investing').val(),
      annual_rent_increase: $('#annual_rent_increase').val(),
      lease_start_date: $('#lease_start_date').val(),
      lease_end_date: $('#lease_end_date').val(),
      lease_notice_date: $('#lease_notice_date').val(),
      coam_agreement_start_date: $('#coam_start_date').val(),
      coam_agreement_end_date: $('#coam_end_date').val(),
      coam_agreement_notice_date: $('#coam_notice_date').val(),
      insurance_start_date: $('#insurance_start_date').val(),
      insurance_end_date: $('#insurance_end_date').val(),
      insurance_notice_date: $('#insurance_notice_date').val()
    };
    
    $.ajax({
      url: '../api/'+ db_id +'/propertycreate/',
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
      url: '../api/'+ db_id +'/propertydelete/'+id+'/',
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


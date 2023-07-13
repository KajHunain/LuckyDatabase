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

  function checkTableCells() {
    // $('#Table th').each(function() {
    //   var columnHeader = $(this).text().trim().toUpperCase();
      
    //   if (columnHeader === "OPERATING" || columnHeader === "LEASE START DATE" ) {
    //     var columnIndex = $(this).index();
    //     var hasEmptyCell = false;

    //     $('#Table tbody tr').each(function() {
    //       var cellValue = $(this).find('td').eq(columnIndex).text().trim();
          
    //       if (cellValue === "") {
    //         hasEmptyCell = true;
    //         return false;  
    //       }
    //     });

    //     if (hasEmptyCell) {
    //       $(this).text(columnHeader + ' (Required)').css('color', 'maroon');
    //     } else {
    //       $(this).removeClass('error');
    //     }
    //   }
    // });
  }

  $.ajax({
    url: '../api/'+ db_id +'/property',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
 
      var tbody = $('table tbody');

      for (var i = 0; i < data.length; i++) {
        var property = data[i];

        var newRow = $('<tr>').attr('id', property.id);
        var theadings = $('#Table thead');

        var deleteButton = $('<i>').addClass("fa-solid fa-circle-xmark fa-l dlt_btn");
        newRow.append(deleteButton);
        
        theadings.find('th:not(:first-child)').each(function (index) {

          var columnName = $(this).text().trim().toLowerCase().replace(/ /g, "_");
          var cellValue = property[columnName];
          var newCell = $('<td>').text(cellValue);

          newRow.append(newCell);
        });

        tbody.append(newRow);

        }
      checkTableCells();

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

    checkTableCells();

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

  
  // $(document).on('click', '#submit', function() {

  //   var updatedData = [];

  //   $('#Table tbody tr').each(function() {
  //     var row = $(this);
  //     var rowData = {};

  //     rowData.id = Number(row.attr('id'));
  //     rowData.database = Number(db_id);

  //     row.find('td').each(function(index) {
  //       var cellValue = $(this).text().trim();
  //       var columnName = $('#Table thead th:eq(' + index + ')').text().trim();
  //       columnName = columnName.toLowerCase().replaceAll(" ", "_");

  //       rowData[columnName] = cellValue;
  //     });

  //     updatedData.push(rowData);
  //   });

  //   console.log(updatedData);

  //   for (var i=0; i < updatedData.length; i++){

  //     if (updatedData[i].id === null ){

  //     }
      
  //     $.ajax({
  //       url: '../api/'+ db_id +'/propertyupdate/'+ updatedData[i].id+'/',
  //       type: 'PUT',
  //       data: JSON.stringify(updatedData[i]),
  //       contentType: 'application/json',
  //       headers: {
  //         'X-CSRFToken': getCookie('csrftoken')
  //       },

  //       success: function(response) {

  //         console.log('Data updated successfully');
  //         $('#update').hide();
  //       },
  //       error: function(xhr, status, error) {

  //         console.log('Error:', error);
  //       }
  //     });
  //   }
  // });

  // $(document).on('click', '#create', function() {

  //   var table = $('#Table');
  //   var lastRow = table.find('tbody tr:last');

  //   var isEmpty = lastRow.find('td').filter(function() {
  //     return $(this).text().trim() !== '';
  //   }).length === 0;
    
  //   if (!isEmpty) {

  //     // createData.push();
  //     console.log(table.find('tbody tr').length);
  //     var newRow = $('<tr>');
  //     console.log("new row added")

  //     table.find('thead th').each(function() {
  //       newRow.append($('<td>'));
  //     });

  //     table.find('tbody').append(newRow);
  //   }

  // });

});


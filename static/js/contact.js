$(document).ready(function() {
  
  
  
  var sharedList = $(".nav-share ol");
  var sharedwithlist = $("nav-share ol");
  
  var sharedListArray = ["Hunain@mail.com","Qasim@mail.com","Hakim@mai.com","sheryar@mail.com","Hunain@mail.com","Qasim@mail.com"]
  
  sharedListArray.push(sharedList.textContent);
  
  for (let i = 0; i < sharedListArray.length; i++) {
    var li = $("<li>").addClass("nav-share-li");
    li.text(sharedListArray[i]);
    sharedwithlist.append(li)
    sharedList.append(li.clone());
  }
  
  
  var shared = $("#shared_with li");
  var sum_count = shared.length - 4;
  shared.eq(shared.length - 1).hide()
  
  if (shared.length >= 5){

      shared.slice(3, -1).hide();
      shared.eq(shared.length - 1).show()
      shared.eq(shared.length - 1).text('+' + sum_count);
      console.log(shared[shared.length-1]);
  }
  
  $("#cal-icon").click(function() {
    $("#cal-icon").hide()
    $("#mydiv").show()
  });

  $("#close-calculator").click(function(){
    $("#cal-icon").show()
    $("#mydiv").hide()

  })


  dragElement($("#mydiv"));
  function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

      if (elmnt.find("#mydivheader").length > 0) {
          /* If present, the header is where you move the DIV from: */
          elmnt.find("#mydivheader").on("mousedown", dragMouseDown);
      } else {
          /* Otherwise, move the DIV from anywhere inside the DIV: */
          elmnt.on("mousedown", dragMouseDown);
      }

      function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // Get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          $(document).on("mouseup", closeDragElement);
          // Call a function whenever the cursor moves:
          $(document).on("mousemove", elementDrag);
      }

      function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          console.log("pose3"+ pos3);
          console.log("e-x: "+e.clientX)
          // Calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // Set the element's new position:
          // elmnt.css("top", (elmnt.position().top + pos2) + "px");
          // elmnt.css("left", (elmnt.position().left + pos1) + "px");
          elmnt.css("bottom", (parseInt(elmnt.css("bottom")) + pos2) + "px");
          elmnt.css("right", (parseInt(elmnt.css("right")) + pos1) + "px");
      }

      function closeDragElement() {
          /* Stop moving when the mouse button is released: */
          $(document).off("mouseup");
          $(document).off("mousemove");
      }
  }







  var  currentInput = "";
  var  currentResult = 0;
  var  currentOperator = null;
  var  display = $('#calc-display input');

  function updateDisplay() {
      display.val(currentInput);
  }

  function appendToDisplay(character) {
      currentInput += character;
      updateDisplay();
  }

  function clearDisplay() {
      currentInput = "";
      updateDisplay();
  }

  function toggleSign() {
      if (currentInput !== "") {
          currentInput = String(-parseFloat(currentInput));
          updateDisplay();
      }
  }

  function calculateResult() {
      if (currentOperator && currentInput !== "") {
          const num = parseFloat(currentInput);
          switch (currentOperator) {
              case '+':
                  currentResult += num;
                  break;
              case '-':
                  currentResult -= num;
                  break;
              case '*':
                  currentResult *= num;
                  break;
              case '/':
                  currentResult /= num;
                  break;
              case '%':
                  currentResult = currentResult % num;
                  break;
              default:
                  currentResult = num;
          }
          currentInput = currentResult.toString();
          currentOperator = null;
          updateDisplay();
      }
  }

  $('.calc-button button').on('click', function () {
      const buttonText = $(this).data('value');
      if (!isNaN(parseFloat(buttonText)) || buttonText === '.') {
          appendToDisplay(buttonText);
      } else if (buttonText === '=') {
          calculateResult();
      } else {
          currentOperator = buttonText;
          if (currentInput !== "") {
              currentResult = parseFloat(currentInput);
              currentInput = "";
              updateDisplay();
          }
      }
  });

  $('#close-calculator').on('click', function () {
      $('#mydiv').css('display', 'none');
  });

  $('#mydiv').on('click', function (event) {
      if (event.target === this) {
          clearDisplay();
          currentResult = 0;
          currentOperator = null;
      }
  });






  $(window).on('scroll', function() {
    var scrollPosition = $(this).scrollTop();
    var sidebar = $('.sidebar-container');

    if (scrollPosition > 0) {
        sidebar.css('top', '0');
    } else {
        sidebar.css('top', '0'); // Adjust this value if you want some space from the top
    }
});





  $("#closing_box i").click(function(){
    $("#slide_box").css(
        'right' , '-85%'
    )
  })

  $(".job").click(function(){
    $("#slide_box").css(
        'right' , '0'
    )
  })



  // var element = document.querySelector('.shared_with a[href="#"]'); // Select the <a> element within the '.shared_with' element with the href attribute set to "#"

  // if (element) {
  //   console.log(element.textContent); // Log the text content to the console
  // }


  
  // $(document).ready(function() {
  //   $('.dropdown-trigger').click(function() {
  //     $(this).toggleClass('active');
  //   });
  // });

  // $("#addbtn").click(function() {
  //   $(".table").toggle();
  //   $(".form").toggle();
  // });

  //  $(".cross").click(function() {
  //   $(".form").hide();
  //   $(".table").show();
  // });

  // $(".button").show();

  // $('#pagename').text('Contact');
  // var currentUrl = window.location.href;
  // var regex = /\/(\d+)\/([^/]+)\/?/;
  // var db_id = currentUrl.match(regex)[1];

  // function getCookie(name) {
  //   let cookieValue = null;
  //   if (document.cookie && document.cookie !== '') {
  //     const cookies = document.cookie.split(';');
  //     for (let i = 0; i < cookies.length; i++) {
  //       const cookie = cookies[i].trim();
  //       if (cookie.substring(0, name.length + 1) === name + '=') {
  //         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
  //         break;
  //       }
  //     }
  //   }
  //   return cookieValue;
  // }

  // function create_row(tablename,fields){
  //   $.ajax({
  //     url: '../api/'+ db_id +'/'+tablename+'create/',
  //     type: 'POST',
  //     data: fields,
  //     dataType: 'json',
  //     headers: {
  //         'X-CSRFToken': getCookie('csrftoken')
  //       },
  //     success: function(response) { 
  //       console.log(response);
  //     },
  //     error: function(xhr, status, error) {
  //       console.log('Error:', error);
  //     }

  //   });
  // }  

  // function update_row(tablename,fields){

  //   if( fields.date_of_birth == null || fields.date_of_birth == "" || fields.date_of_birth == "null"){
  //     fields.date_of_birth = null;
  //   }
  //   console.log(fields);
  //   $.ajax({
  //     url: '../api/'+ db_id +'/'+tablename+'update/'+ fields.id+'/',
  //     type: 'PUT',
  //     data: JSON.stringify(fields),
  //     contentType: 'application/json',
  //     headers: {
  //       'X-CSRFToken': getCookie('csrftoken')
  //     },

  //     success: function(response) {

  //       console.log('Data updated successfully');

  //     },
  //     error: function(xhr, status, error) {

  //       console.log('Error:', error);
  //     }
  //   });

  // }

  // function if_company_exist(company_title, callback) {
  //   $.ajax({
  //     url: '../api/' + db_id + '/company/',
  //     type: 'GET',
  //     dataType: 'json',
  //     success: function(data) {
  //       var result = false;

  //       for (var i = 0; i < data.length; i++) {

  //         if (data[i].company_name === company_title.trim()) {
  //           result = true;
  //           break;
  //         }
  //       }

  //       callback(result);
  //     },
  //     error: function(xhr, status, error) {
  //       console.log('Error:', error);
  //       callback(false); 
  //     }
  //   });
  // }


  // var server_data = {}

  // function dataupload_table(){

  //   $.ajax({
  //     url: '../api/'+db_id+'/contact/', 
  //     type: 'GET',
  //     dataType: 'json',
  //     success: function(data) {

  //       var tbody = $('table tbody');

  //       for (var i = 0; i < data.length; i++) {
  //         var contact = data[i];

  //         var newRow = $('<tr>').attr('id', contact.id).addClass("row");
  //         var icon_td = $("<td>").addClass("dlt");
  //         var deleteButton = $('<i>').addClass("fa-solid fa-circle-xmark fa-l dlt_btn");
  //         icon_td.append(deleteButton);
  //         newRow.append(icon_td);

  //         var theadings = $('#Table thead');
          
  //         theadings.find('th:not(:first-child)').each(function (index) {

  //           var columnName = $(this).text().trim().toLowerCase().replace(/ /g, "_");
  //           var cellValue = contact[columnName];
  //           var newCell = $('<td>').text(cellValue).addClass("col");

  //           newRow.append(newCell);
  //         });
          
  //         tbody.append(newRow);

  //         }  
  //       },
  //     error: function(xhr, status, error) {
        
  //       console.log('Error:', error);
  //     }
  //   });
  // }
  // dataupload_table();

  // var original_value = '';

  // $(document).on('click', '#Table td', function() {
  //   if (!$(this).hasClass('editing')) {
  //     $(this).addClass('editing');

  //     var currentValue = $(this).text().trim();
  //     original_value = currentValue;

  //     var columnIndex = $(this).index();
  //     var inputType = 'text';

  //     if (columnIndex === 0) {
  //       return 0;
  //     } else if (columnIndex === 3 || columnIndex ===4  || columnIndex === 5 || columnIndex === 12 || columnIndex === 16) {
  //       inputType = 'number'; 
  //     } else if (columnIndex === 18){
  //       inputType = 'date'; 
  //     }

  //     $(this).html('<input type="' + inputType + '" class="edit-input" value="' + currentValue + '">');
  //     $(this).find('input').focus();
  //   }
  // });

  // $(document).on('focusout', '.edit-input', function() {
  //   var cell = $(this).closest('td');
  //   cell.removeClass('editing');
  //   var currentValue = cell.find('input').val().trim();
  //   cell.text(currentValue);

  //   var row = cell.closest('tr');

  //   if (original_value !== currentValue) {
      
  //     var rowData = {};

  //     rowData.id = Number(row.attr('id'));
  //     rowData.database = Number(db_id);

  //     row.find('td').each(function(index) {
  //       var cellValue = $(this).text().trim();
  //       var columnName = $('#Table thead th:eq(' + (index) + ')').text().trim();
  //       columnName = columnName.toLowerCase().replaceAll(" ", "_");

  //       rowData[columnName] = cellValue;
  //     });
  //     console.log(rowData);

  //     update_row("contact",rowData);
    
  //   }
  // });



  // $('#submit').click(function(event) {
  //   event.preventDefault();

  //   var formData = {
  //     firstname: $('#firstname').val(),
  //     lastname: $('#lastname').val(),
  //     mobile: $('#mobile').val(),
  //     mobile2: $('#mobile2').val(),
  //     fax: $('#fax').val(),
  //     email: $('#email').val(),
  //     personal_address: $('#personal_address').val(),
  //     rating: $('#rating').val(),
  //     city: $('#city').val(),
  //     state: $('#state').val(),
  //     country: $('#country').val(),
  //     postal_code: $('#postal_code').val(),
  //     company_address: $('#company_address').val(),
  //     company: $('#company').val(),
  //     designation: $('#designation').val(),
  //     work_phone: $('#work_phone').val(),
  //     category: $('#category').val(),
  //     date_of_birth: $('#date_of_birth').val(),
  //     group: $('#group').val(),
  //     notes: $('#notes').val()
  //   };



  //   var company = $('#company').val().trim();

  //   if_company_exist(company, function(result) {
    
  //     if (result) {

  //       create_row("contact",formData);
  //       location.reload(true);
  //       } 
  //     else {

  //       create_row("company",{"company_name":company});
  //       create_row("contact",formData);
  //       location.reload(true);
        
  //       } 
  //   });


    
  // });

  // $(document).on('click', '.dlt_btn', function() {

  //   var id = $(this).closest('tr').attr('id');

  //   $.ajax({
  //     url: '../api/'+ db_id +'/contactdelete/'+id+'/',
  //     type: 'DELETE',
  //     headers: {
  //         'X-CSRFToken': getCookie('csrftoken')
  //       },
  //     success: function(response) {
  //       location.reload(true);
  //       console.log(response);
  //     },
  //     error: function(xhr, status, error) {
  //       console.log('Error:', error);
  //     }
  //   });



  // });




  

});



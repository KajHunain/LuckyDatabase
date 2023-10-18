
(function($) {


	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  	});

	$("#sidebarCollapse-md").click(function(){
		$("#sidebar").toggleClass('hide');
	});

})(jQuery);


document.getElementById('search-button').addEventListener('click', function() {
	const selectedJob = document.getElementById('job-search-input').value; 
});
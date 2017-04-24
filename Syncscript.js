

// This is the client-side script.

// Initialize the HTTP request.
var xhr = new XMLHttpRequest();
xhr.open('get', 'Sync2.html');

// Track the state changes of the request.
xhr.onreadystatechange = function(){
	
	var DONE = 4; // readyState 4 means the request is done.
	var OK = 200; // status 200 is a successful return.
	
	if (xhr.readyState == DONE) {
		if (xhr.status == OK) {
			console.log(xhr.responseText); // 'This is the returned text.'

			$('#content').html(xhr.responseText)
		}else{
			console.log('Error: ' + xhr.status); // An error occurred during the request.
		}
	}
};
$("#load").click(function(){
	// Send the request to send-ajax-data.php
	xhr.send(null);	
})


































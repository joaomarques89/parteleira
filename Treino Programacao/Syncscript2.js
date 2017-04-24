$("#load").click(function(){
	$.get("Sync2.html")
	.done(function(data){
		$('#content').html(data)
	})
	.fail(function(){
		console.log('Error: ' + data);
	})
})

var url = "https://www.googleapis.com/books/v1/volumes?q=Game+of+thrones"

$.get(url)
.done(function(data){
	$('#content').html(data);
	console.log(data);
})
.fail(function(){
	console.log('Error: ' + data);
})
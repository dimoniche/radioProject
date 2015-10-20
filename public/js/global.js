var count_dev;

$(document).ready(function() {
	
	var tableContent = '';
	
	tableContent += '<tr>';
	tableContent += '<td><a href="#" class="linkshowdevice" rel="' + "username" + '">' + "username" + '</a></td>';
	tableContent += '<td><a href="#" class="linkdeletedevice" rel="' + "_id" + '">delete</a></td>';
	tableContent += '<td><a href="#" class="linkdeletedevice" rel="' + "_id" + '">delete</a></td>';
	tableContent += '</tr>';
	
	$('#deviceList table tbody').html(tableContent);	
	
});

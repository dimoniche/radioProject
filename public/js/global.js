    
$(document).ready(function() {
     
	populateTable();
    
    // Delete device link click
    $('#deviceList table tbody').on('click', 'td a.linkdeletedevice', deleteDevice);
});

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/device', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
    
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowdevice" rel="' + this.device + '">' + this.device + '</a></td>';
            tableContent += '<td>' + this.description + '</td>';
            tableContent += '<td><a href="#" class="linkdeletedevice" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
   
        // Inject the whole content string into our existing HTML table
        $('#deviceList table tbody').html(tableContent);
    });

};

function deleteDevice() {
    
    //event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/delete-device/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

}
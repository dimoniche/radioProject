 
$(document).ready(function() {
     
	populateTable();
    
    setInterval('populateTable()',3000);
    
    // удаление устройства при редактировании
    $('#deviceListEdit table tbody').on('click', 'td a.linkdeletedevice', deleteDevice);
    $('#deviceListEdit table tbody').on('click', 'td a.linksavedesc', savedesc);

    // отображение подключенных устройств при редактировании
    $('#deviceListEdit table tbody').on('click', 'td a.linkshowdevice', showdevice);
    $('#deviceListView table tbody').on('click', 'td a.linkshowdevice', showdevice);
    
    // добавление маленького устройства
    $('#addsmalldevice').on('click', addsmalldevice);
    // удаление устройства при редактировании
    $('#smalldeviceListEdit table tbody').on('click', 'td a.linkdeletesmalldevice', deletesmallDevice);
    
    // кнопка сохранения названия девайса
    $('#saveDeviceName').on('click', renameDesc);
});
    
function renameDesc() {
    
    var namedesc = $('#renameDesc fieldset input#inputDeviceName').val();

        $.ajax({
            type: 'POST',
            data: namedesc,
            url: '/renameDesc/' + namedesc,//$(this).attr('rel'),
            dataType: 'text'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                //$('#addUser fieldset input').val('');

                // Update the table
                //populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
}

// функция добавления маленького устройства
function addsmalldevice() {
    
    var id = window.location.pathname;
    
    id = id.replace("/show-device/","");

    $.ajax({
        type: 'GET',
        url: '/add-small-device/' + id
    }).done(function( response ) {
        // Update the table
        populateTable();
    });
}

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    var id = window.location.pathname;
    
    id = id.replace("/show-device/","");

    // выводим список маленьких устройств
    $.getJSON( '/smalldevice/' + id, function( data ) {
        $.each(data, function(){
    
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowsmalldevice" rel="' + this._id + '">' + this.name + '</a></td>';
            tableContent += '<td>' + this.state + '</td>';
            tableContent += '<td><a href="#" class="linkdeletesmalldevice" rel="' + id + '>' + this.id +'">delete</a></td>';
            tableContent += '</tr>';
        });
        
        // 
        $('#smalldeviceListEdit table tbody').html(tableContent);
        
        tableContent = '';
        
        $.each(data, function(){
    
            tableContent += '<tr>';
            tableContent += '<td><class="linkshowsmalldevice" rel="' + this._id + '">' + this.name + '</a></td>';
            tableContent += '<td>' + this.state + '</td>';
            tableContent += '</tr>';
        });
   
        // 
        $('#smalldeviceListView table tbody').html(tableContent);
    });

    tableContent = '';

    // выводим список больших устройств
    $.getJSON( '/device', function( data ) {

        // Редактирование списка устройств
        $.each(data, function(){
    
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowdevice" rel="' + this._id + '">' + this.device + '</a></td>';
            tableContent += '<td><a href="#" class="linksavedesc" rel="' + this._id + '">'+ this.description +'</a></td>';
            tableContent += '<td><a href="#" class="linkdeletedevice" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
   
        // 
        $('#deviceListEdit table tbody').html(tableContent);
        
        tableContent = '';

        // Просто отображение устройств
        $.each(data, function(){
    
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowdevice" rel="' + this._id + '">' + this.device + '</a></td>';
            tableContent += '<td>' + this.description + '</td>';
            tableContent += '</tr>';
        });
   
        // 
        $('#deviceListView table tbody').html(tableContent);
    });
};

function savedesc()
{
    window.location = "/gosaveDesc/" +  $(this).attr('rel');
}

function showdevice() {
  
    window.location = "/show-device/" +  $(this).attr('rel');

    //var url = "/show-device";
    //var hash = $(this).attr('rel');

    //$(location).attr({'href': url, 'hash': hash});  
};

function deletesmallDevice() {
    
    //event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/delete-smalldevice/' + $(this).attr('rel')
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



// Front end JS for transmitting requests to backend on button presses in browser.
jQuery(function () {
    var deleteFeeder = function () {
        console.log('Send request to backend to delete a feeder.');

        $.post('/admin',   // url
            { feederToDelete: $("#feedersDropdown option:selected").text() }, // data to be submit
            function (data, status, jqXHR) {// success callback
                $('#status').append('status: ' + status + ', data: ' + data.message);
            });
    }

    $('#delete').on('click', deleteFeeder)
});


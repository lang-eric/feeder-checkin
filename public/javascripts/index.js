// Front end JS for transmitting requests to backend on button presses in browser.
jQuery(function() {
    var checkIn = function() {
        let msg = `Feeder ${$("#feedersDropdown option:selected").text()} checked in.`;

        // Print message to browser console.
        console.log(msg);

        // Send msg to backend end, which should trigger the backend to post in discord.

        // We could do the request to send the message in the browser (here), but..
        // this would let users of this application grab our private token for communicating to 
        // Discord's API.

        $.post('/', // url
            { message: msg }, // data to be submit
            function(data, status, jqXHR) { // success callback
                $('#status').append(status + 'data: ' + data.message);
            });
    };

    $('#checkIn').on('click', checkIn);
});
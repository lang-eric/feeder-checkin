const button = document.querySelector("#factButton");

const url = "https://catfact.ninja/fact";


// Front end JS for transmitting requests to backend on button presses in browser.
jQuery(function() {
    var deleteFeeder = function() {
        console.log('Send request to backend to delete a feeder.');

        $.post('/admin', // url
            { feederToDelete: $("#feedersDropdown option:selected").text() }, // data to be submit
            function(data, status, jqXHR) { // success callback
                // $('#status').append('status: ' + status + ', data: ' + data.message);
            });
    };

    var setQuote = async function() {
        // We can do a request to an API from the front end if its not a security concerned API (for example cat facts).
        console.log('here');
        const response = await fetch(url);
        const data = await response.json();
        let randomNumber = Math.floor(Math.random() * 6);
        console.log(data);
        $('#fact').text(data.fact);
    };
    setQuote();
    $('#factButton').on('click', setQuote);
    $('#delete').on('click', deleteFeeder);
});
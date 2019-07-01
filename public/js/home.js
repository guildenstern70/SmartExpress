/*

    SmartExpress N2
    Client code: home.js

 */

const WS_REST_URL_AZURE = 'http://a2arest.azurewebsites.net/api/System/live';
const WS_REST_URL_LOCAL = 'http://localhost:3000/api/v1/version';

const callWS = $.ajax({
    type: 'GET',
    url: WS_REST_URL_LOCAL,
    async: true,
    cache: false,
    crossDomain: true,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(responseData, textStatus, jqXHR) {
        console.log('Ok, response is ' + JSON.stringify(responseData));
        $('#n2version').text(responseData.version);
    },
    error: function(responseData, textStatus, errorThrown) {
        console.log('KO, I got an error: ' + JSON.stringify(responseData));
        $('#n2version').text(textStatus);
    },
});

$(function() {
    console.log('Calling ' + WS_REST_URL_LOCAL);
    return callWS;
});

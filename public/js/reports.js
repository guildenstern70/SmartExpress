/*

    SmartExpress N2
    Client code: home.js

 */

const WS_REST_URL_AZURE = 'http://a2arest.azurewebsites.net/api/System/live';
const WS_REST_URL_LOCAL = 'http://localhost:3000/api/v1/reportsdata';

const askfordelete = function(id, name) {
    confirm(
        'Really delete item #' + id + '?',
        "Select 'Yes' if you want to delete " + name,
        id
    );
};

const showadd = function() {
    $('#addnewbutton').hide();
    return $('#addone').show();
};

const hideadd = function() {
    $('#addone').hide();
    return $('#addnewbutton').show();
};

const savenew = function() {
    var data;
    data = {
        name: $('#newname').val(),
        date: $('#newdate').val(),
        complete: $('#newcomplete').is(':checked'),
    };
    if (data.name && data.date) {
        console.log('Sending POST ' + JSON.stringify(data));
        $.ajax({
            url: WS_REST_URL_LOCAL,
            type: 'POST',
            data: data,
            success: function() {
                console.log('Ok, item posted.');
                window.location.href = '/reports';
            },
            error: function(req, status, err) {
                console.log('ERROR: ' + err);
                console.log('STATUS = ' + status);
            },
        });
    }
};

const deleteitem = function(id) {
    var confirmation;
    confirmation = new Foundation.Reveal($('#confirmation'));
    confirmation.close();
    $('#confirmation').remove();
    console.log('Ok to delete ' + id);
    $.ajax({
        url: WS_REST_URL_LOCAL + '?id=' + id,
        type: 'DELETE',
        success: function() {
            console.log('Ok, deleted.');
            window.location.href = '/reports';
        },
        error: function(req, status, err) {
            console.log('ERROR: ' + err);
            console.log('STATUS = ' + status);
        },
    });
};

const confirm = function(title, message, id) {
    var confirmation, modal;
    modal =
        '<div class="reveal small" id="confirmation" data-reveal>' +
        '<h2>' +
        title +
        '</h2>' +
        '<p class="lead">' +
        message +
        '</p>' +
        '<div class="row columns">' +
        '<button class="button success yes" onclick="deleteitem(' +
        id +
        ')">Yes</button>' +
        '<button style="margin-left:40px" class="button alert" data-close>No</button></div>' +
        '<button class="close-button" data-close aria-label="Close modal" type="button">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' +
        '</div>';
    $('body').append(modal);
    confirmation = new Foundation.Reveal($('#confirmation'));
    confirmation.open();
};

$(function() {
    console.log('Document ready');
    $(document).on('closed.zf.reveal', '#confirmation', function() {
        $('#confirmation').remove();
    });
});

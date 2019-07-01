WS_REST_URL_AZURE = "http://a2arest.azurewebsites.net/api/System/live"
WS_REST_URL_LOCAL = "http://localhost:3000/api/v1/reportsdata"

exports = this

exports.askfordelete = (id, name) ->
    confirm 'Really delete item #' + id + '?', 'Select \'Yes\' if you want to delete ' + name, id
    return

exports.showadd = () ->
    $('#addnewbutton').hide()
    $('#addone').show()

exports.hideadd = () ->
    $('#addone').hide()
    $('#addnewbutton').show()

exports.savenew = () ->

    data =
        name: $('#newname').val()
        date: $('#newdate').val()
        complete: $('#newcomplete').is(':checked')

    if (data.name) && (data.date)
        console.log('Sending POST ' + JSON.stringify(data))
        $.ajax
            url: WS_REST_URL_LOCAL
            type: 'POST'
            data: data
            success: ->
                console.log 'Ok, item posted.'
                window.location.href = '/reports'
                return
            error: (req, status, err) ->
                console.log 'ERROR: ' + err
                console.log 'STATUS = ' + status
                return
        return

exports.deleteitem = (id) ->
    confirmation = new (Foundation.Reveal)($('#confirmation'))
    confirmation.close()
    $('#confirmation').remove()
    console.log 'Ok to delete ' + id
    $.ajax
        url: WS_REST_URL_LOCAL+'?id=' + id
        type: 'DELETE'
        success: ->
            console.log 'Ok, deleted.'
            window.location.href = '/reports'
            return
        error: (req, status, err) ->
            console.log 'ERROR: ' + err
            console.log 'STATUS = ' + status
            return
    return

$ ->
    console.log 'Document ready'
    $(document).on 'closed.zf.reveal', '#confirmation', ->
        $('#confirmation').remove()
        return
    return

confirm = (title, message, id) ->
    modal = '<div class="reveal small" id="confirmation" data-reveal>' + '<h2>' + title + '</h2>' + '<p class="lead">' + message + '</p>' + '<div class="row columns">' + '<button class="button success yes" onclick="deleteitem(' + id + ')">Yes</button>' + '<button style="margin-left:40px" class="button alert" data-close>No</button></div>' + '<button class="close-button" data-close aria-label="Close modal" type="button">' + '<span aria-hidden="true">&times;</span>' + '</button>' + '</div>'
    $('body').append modal
    confirmation = new (Foundation.Reveal)($('#confirmation'))
    confirmation.open()
    return


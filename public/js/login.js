/*

    SmartExpress N2
    Client code: login.js

 */

$(function() {
    $('#show-password').change(function() {
        console.log('Toggle password');
        $('#password').togglePassword();
    });
});

$(document).ready(function() {
  $('#show-password').change(function() {
    console.log('Toggle password');
    $('#password').togglePassword();
  });
});

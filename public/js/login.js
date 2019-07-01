$(document).ready(function() {
  $('#show-password').change(function() {
    logger.info('Toggle password');
    $('#password').togglePassword();
  });
});

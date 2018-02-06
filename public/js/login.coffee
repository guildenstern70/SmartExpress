$(document).ready ->
  $('#show-password').change ->
    console.log('Toggle password')
    $('#password').togglePassword()
    return
  return


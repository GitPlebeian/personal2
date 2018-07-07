$(document).ready(function() {
	$('.loginLogo p, .inputs').addClass('active')
})
$(window).load(function() {
	$("body").removeClass("preload");
});
$('button').mousedown(function() {
	$(this).css('background-color', '#1c1d24')
})
$('button').mouseup(function() {
	$(this).css('background-color', '#202128')
})


var password1 = false
var password2 = false
$('input#password').blur(function() {
	password1 = true
})
$('input#password2').blur(function() {
	password2 = true
})
$("form").submit(function(event) {
	event.preventDefault();
	if ($('#username').val().length < 5) {
		$('button').html('Username < 5')
		$('button').css('color', '#ff3535')
	} else if ($('#username').val().includes(' ')) {
		$('button').html('Username Has Space')
		$('button').css('color', '#ff3535')
	} else if ($('#password').val() != $('#password2').val()) {
		$('button').html('Passwords Must Match')
		$('button').css('color', '#ff3535')
	} else if ($('#password').val().length < 6) {
		$('button').html('Password < 6')
		$('button').css('color', '#ff3535')
	} else {
		this.submit()
	}
});
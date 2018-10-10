import $ from 'jquery';

function _initialize() {
	// set the pixel value (from the top of the page) of where the arrow should begin to appear
	var offset = 600;
	// set the duration of the fade in effect of the back to top arrow and text
	var duration = 500;
	$(window).scroll(function () {
		if ($(this).scrollTop() > offset) {
			$('.back-to-top').fadeIn(duration, function () {
				$(this).trigger("reveal");
			});
		} else {
			$('.back-to-top').fadeOut(duration);
		}
	});

	$('.back-to-top').click(function (e) {
		e.preventDefault();
		// freeze Headroom
		$('.headroom-area').addClass('frozen');
		// animate to top
		$('html, body').animate({
			scrollTop: 0
		}, 400, function () {
			// animation complete; unfreeze Headroom
			$('.headroom-area').removeClass('frozen');
		});
	});
}

let initialized = false;
export default function(){
	if(initialized) {
		return;
	}

	initialized = true;
	_initialize();
}

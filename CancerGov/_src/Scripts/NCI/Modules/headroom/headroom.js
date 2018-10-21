import './headroom-patch';
// we still need the jQuery wrapper
import 'headroom.js/dist/jQuery.headroom.min';
import scrollMonitor from "scrollmonitor";
import { debounce } from 'throttle-debounce';

function _initialize() {
	/*** BEGIN Headroom initializer
	 * (use this if we do the scroll off/on for the blue bar)
	 ***/

	const banner = document.getElementById("nvcgSlSiteBanner");
	const header = banner.parentElement;

	// set up scroll monitor listener on the header - this will trigger the fixed and unfixed positioning of the main navigation as the header enters and exits the viewport
	const headerMonitor = scrollMonitor.create(header);
	const menu = document.querySelector(".fixedtotop");

	const handleScrollIn = () => {
		requestAnimationFrame(function() {
			menu.setAttribute("style", `position:relative`);
			header.classList.add('noMargin');
		});
	}
	const handleScrollOut = () => {
		requestAnimationFrame(function() {
			menu.setAttribute("style", `position:fixed`);
			header.classList.remove('noMargin');
		});
	}

	const debouncedResize = debounce(100,function(){
		if(menu.style.position === 'fixed'){
			handleScrollOut();
		}
	});

	headerMonitor.exitViewport(() => {
		handleScrollOut();
		window.removeEventListener('scroll',handleScrollIn);
	});

	headerMonitor.enterViewport(() => {
		handleScrollIn();
		window.addEventListener('scroll',handleScrollIn);
	});

	window.addEventListener('resize', debouncedResize, {
		capture: true,
		passive: true
	});

	$('.headroom-area').headroom({
		offset: 205,
		classes: {
			initial: "slide",
			pinned: "slide--reset",
			unpinned: "slide--up"
		}
	});
}

/**
 * Exposed functions of this module.
 */
let _initialized = false;
export default function() {
	if (_initialized) {
		return;
	}

	_initialized = true;
	_initialize();
}
/*** END Headroom initializer ***/

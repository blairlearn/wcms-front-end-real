define(function(require) {
    var $ = require('jquery');
    var AdobeAnalytics = require('Patches/AdobeAnalytics');

	/***
	* Main function
	*/
	function _initialize() {
		/* Track right rail links */
        var pageName = 'www.cancer.gov/';
		var s = AdobeAnalytics.getSObject();
        if(typeof(s) !== 'undefined') {
            pageName = s.pageName;
        }

		var identifier = '';
		$('a .delighter.cts-livehelp').on('click.analytics', function (e) {
			var $this = $(this);
			identifier = 'rrail_have a question';
			NCIAnalytics.SimpleCTSLink($this, identifier, pageName);
		});
		$('a .delighter.cts-which').on('click.analytics', function (e) {
			var $this = $(this);
			identifier = 'rrail_which trials are right for you';
			NCIAnalytics.SimpleCTSLink($this, identifier, pageName);
		});
		$('a .delighter.cts-what').on('click.analytics', function (e) {
			var $this = $(this);
			identifier = 'rrail_what are cancer clinical trials';
			NCIAnalytics.SimpleCTSLink($this, identifier, pageName);
		});
		$('a .delighter.cts-next-step').on('click.analytics', function (e) {
			var $this = $(this);
			identifier = 'rrail_how to find a cancer treatment trial';
			NCIAnalytics.SimpleCTSLink($this, identifier, pageName);
		});
		
		/* Track clicks of print selected buttons */
		$('.cts-start-over a').on('click', function(event) {
			var $this = $(this);
			NCIAnalytics.CTStartOverClick($this);
		});
	}

	/**
	 * Identifies if this enhancement has been initialized or not.
	 * @type {Boolean}
	 */
	var initialized = false;

	/**
	 * Exposed functions available to this module.
	 */
	return {
		init: function() {
			if (initialized) {
				return;
			}

			_initialize();

			initialized = true;
		}
	};
});

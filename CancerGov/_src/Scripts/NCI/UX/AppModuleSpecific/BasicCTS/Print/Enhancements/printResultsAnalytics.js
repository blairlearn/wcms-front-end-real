define(function(require) {
	var $ = require('jquery');

	/***
	* Main function
	*/
	function _initialize() {
		$('#printPage').click(function(e){
			var $this = $(this);
			NCIAnalytics.ClinicalTrialsPrintResults_TopLinkClick($this, 'printPage');
		});

		$('#ctl10_EmailResults').click(function(e){
			var $this = $(this);
			NCIAnalytics.ClinicalTrialsPrintResults_TopLinkClick($this, 'email');
		});

		$('#newSearch').click(function(e){
			var $this = $(this);
			NCIAnalytics.ClinicalTrialsPrintResults_TopLinkClick($this, 'newSearch');
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

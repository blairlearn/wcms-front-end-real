define(function(require) {
    var $ = require('jquery');

    /***
    * Snippet to track clicks on "On This Page" links
    */
    function _initialize() {
        var pageName = 'www.cancer.gov/';
        if(s) {
            if(s.pageName) {
                pageName = s.pageName;
            }
        }
        
        $('.on-this-page').each(function(i, el) {
            $(el).on('click', 'a', function(event) {
                var $this = $(this);
                var linkText = $this.text();
                NCIAnalytics.OnThisPageClick($this, linkText, pageName);
            });
        });
        
        // Hotfix for PDQ email tracking issue https://tracker.nci.nih.gov/browse/WCMSFEQ-403
        // Track email share link clicks only - temporary fix until the link behavior is fixed
        if(location.pathname.indexOf('/types/') > -1 && location.pathname.indexOf('-pdq') > -1){
            jQuery('.po-email').on('click.analytics', function() {
                var $this = $(this);
                NCIAnalytics.eMailLink($this);
            });
        }
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

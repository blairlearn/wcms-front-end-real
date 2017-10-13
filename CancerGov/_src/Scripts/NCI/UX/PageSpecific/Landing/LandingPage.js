define(function(require) {
	require('Modules/carousel/carousel');
	require('Plugins/jquery.nci.equal_heights');

	$(function() {
		require('Common/Enhancements/clinicalTrialsDelighter').init();
		$('[data-match-height]').NCI_equal_heights();
	});
});
